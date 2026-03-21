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

    // Caminho destino no Blob (por exemplo: docs/boletos/10005400900/boleto_123.pdf)
    const blobPath = `docs/boletos/${ucCodigo}/${fileName}`;

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
    console.error("Erro no upload n8n boleto:", error);
    return res.status(500).json({ error: error.message });
  }
}
