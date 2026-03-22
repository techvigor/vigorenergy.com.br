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

    // Mapeamento idêntico ao que o SharePoint fazia:
    // pasta: /docs/faturas/{ucCodigo}
    // nome do arquivo: {contaMesLimpo}-{fileName}
    const blobPath = `docs/faturas/${ucCodigo}/${contaMesLimpo}-${fileName}`;

    const blob = await put(blobPath, req, {
      access: 'public',
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
