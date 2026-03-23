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
    const ucCodigo = req.headers['x-uc-codigo'];
    const fileName = req.headers['x-file-name'];

    if (!ucCodigo || !fileName) {
      return res.status(400).json({ error: 'Faltam os headers x-uc-codigo ou x-file-name' });
    }

    // Lê extensão e base
    const fileParts = fileName.split('.');
    const extension = fileParts.pop();
    const baseName = fileParts.join('.');

    // Timestamp
    const now = new Date();
    const opts = { timeZone: 'America/Sao_Paulo', hour12: false };
    const dateStr = now.toLocaleDateString('pt-BR', opts).replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('pt-BR', opts).replace(/:/g, '-');
    const finalFileName = `${baseName}_${dateStr}_${timeStr}.${extension}`;

    // Caminho destino no Blob (por exemplo: docs/boletos/10005400900/boleto_123_23-03-2026_18-05-30.pdf)
    const blobPath = `docs/boletos/${ucCodigo}/${finalFileName}`;

    // A Vercel lê o body binário do request diretamente e salva no Blob
    const blob = await put(blobPath, req, {
      access: 'public',
      addRandomSuffix: false,
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
    console.error("Erro no upload n8n boleto:", error);
    return res.status(500).json({ error: error.message });
  }
}
