import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const negociacaoId = req.headers['x-negociacao-id'];
    let clienteNome = req.headers['x-cliente-nome'];
    const fileName = req.headers['x-file-name'];

    if (!negociacaoId || !fileName) {
      return res.status(400).json({ error: 'Faltam headers obrigatórios (x-negociacao-id ou x-file-name)' });
    }
    
    // Fallback if clienteNome is somehow missing (prevent crashes)
    if (!clienteNome) {
      clienteNome = "Doc_Generico";
    }

    // Criar pasta segura e sem acentos/espacos 
    const nomePastaLimpo = clienteNome.replace(/[^a-zA-Z0-9]/g, '_');
    const folderName = `${negociacaoId}_${nomePastaLimpo}`;

    // Gera sufixo de data/hora seguro (ex: 23-03-2026_17-59-30) para evitar colisão e ficar legível
    const fileParts = fileName.split('.');
    const extension = fileParts.pop();
    const baseName = fileParts.join('.');
    const now = new Date();
    const opts = { timeZone: 'America/Sao_Paulo', hour12: false };
    const dateStr = now.toLocaleDateString('pt-BR', opts).replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('pt-BR', opts).replace(/:/g, '-');
    const finalFileName = `${baseName}_${dateStr}_${timeStr}.${extension}`;

    // Caminho destino no Blob (ex: docs/negociacoes/328_Luciana_Pereira_Da_Silva/arquivo_23-03-2026_17-59-30.pdf)
    const blobPath = `docs/negociacoes/${folderName}/${finalFileName}`;

    // A Vercel lê o body binário do request diretamente e salva no Blob
    // addRandomSuffix: false desliga o final "-K2s8dL.pdf" feio que a Vercel gera por padrão
    const blob = await put(blobPath, req, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const siteUrl = `${protocol}://${host}`;

    // A URL pública fica limpa através do Rewrite configurado no seu vercel.json
    const urlPublica = `${siteUrl}/${blob.pathname}`;

    return res.status(200).json({ 
      sucesso: true, 
      url: urlPublica,
      fileNameOriginal: fileName // Devolvemos para o n8n conseguir associar depois
    });
  } catch (error) {
    console.error("Erro no upload n8n documento:", error);
    return res.status(500).json({ error: error.message });
  }
}
