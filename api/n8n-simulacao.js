import { put } from '@vercel/blob';

// Fundamental para n8n: Desativa o parser de body da Vercel para lermos o binário (PDF) que chega via stream HTTP puro
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
    // n8n vai enviar os dados via Headers 
    const negociacaoId = req.headers['x-negociacao-id'];
    const clienteNome = req.headers['x-cliente-nome'];
    const fileName = req.headers['x-file-name'];

    if (!negociacaoId || !clienteNome || !fileName) {
      return res.status(400).json({ error: 'Faltam headers obrigatórios (x-negociacao-id, x-cliente-nome ou x-file-name)' });
    }

    // Criar uma pasta segura baseada no nome do cliente, removendo caracteres que possam quebrar a URL
    // (Por exemplo, "A&B Cia" vira "A_B_Cia")
    const nomePastaLimpo = clienteNome.replace(/[^a-zA-Z0-9]/g, '_');
    const folderName = `${negociacaoId}_${nomePastaLimpo}`;

    // Caminho destino no Blob (ex: docs/negociacoes/328_Luciana_Pereira_Da_Silva/Simulacao_Vigor_Luciana...pdf)
    const blobPath = `docs/negociacoes/${folderName}/${fileName}`;

    // A Vercel lê o body binário do request diretamente e salva no Blob
    const blob = await put(blobPath, req, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // O hostname em produção ou local
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const siteUrl = `${protocol}://${host}`;

    const urlPublica = `${siteUrl}/${blobPath}`;

    return res.status(200).json({ 
      sucesso: true, 
      url: urlPublica,
      blobUrl: blob.url // Retornamos caso queiramos comparar
    });
  } catch (error) {
    console.error("Erro no upload n8n simulacao:", error);
    return res.status(500).json({ error: error.message });
  }
}
