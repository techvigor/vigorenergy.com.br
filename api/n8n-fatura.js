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
    const ucCodigo = req.headers['x-uc-codigo'];
    const contaMes = req.headers['x-conta-mes']; 
    const fileName = req.headers['x-file-name'];

    if (!ucCodigo || !contaMes || !fileName) {
      return res.status(400).json({ error: 'Faltam headers obrigatórios (x-uc-codigo, x-conta-mes ou x-file-name)' });
    }
    
    // Tratamento de segurança para não criar pastas com barras
    // Exemplo: "DEZ/2025" vira "DEZ_2025"
    const contaMesLimpo = contaMes.replace(/\//g, '_');

    // Lê extensão e base
    const fileParts = fileName.split('.');
    const extension = fileParts.pop();
    const baseName = fileParts.join('.');

    // Timestamp
    const now = new Date();
    const opts = { timeZone: 'America/Sao_Paulo', hour12: false };
    const dateStr = now.toLocaleDateString('pt-BR', opts).replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('pt-BR', opts).replace(/:/g, '-');
    const finalFileName = `${contaMesLimpo}-${baseName}_${dateStr}_${timeStr}.${extension}`;

    // pasta: /docs/faturas/{ucCodigo}
    // nome do arquivo: {contaMesLimpo}-{fileName}_{data}_{hora}.{ext}
    const blobPath = `docs/faturas/${ucCodigo}/${finalFileName}`;

    const blob = await put(blobPath, req, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const siteUrl = `${protocol}://${host}`;

    // Caminho amigável através do rewrite configurado
    const urlPublica = `${siteUrl}/${blob.pathname}`;

    return res.status(200).json({ 
      sucesso: true, 
      url: urlPublica
    });
  } catch (error) {
    console.error("Erro no upload n8n fatura:", error);
    return res.status(500).json({ error: error.message });
  }
}
