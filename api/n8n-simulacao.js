import { put } from '@vercel/blob';

// Fundamental para n8n: Desativa o parser de body da Vercel para lermos o binário (PDF) que chega via stream HTTP puro
export const config = {
  api: {
    bodyParser: false,
  },
};

// Remove acentos/diacríticos sem depender de ranges unicode em regex (NFD + filtra fora do ASCII)
function stripDiacritics(str) {
  return str.normalize('NFD').split('').filter((ch) => ch.charCodeAt(0) < 128).join('');
}

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

    // O n8n manda fileName como "{numero_simulacao} - {cliente_nome}.pdf".
    // Usamos só o número da simulação (já único por segundo: VGR-{ano}-{mesdiahoraminseg})
    // como nome do arquivo, e só o negociacaoId como pasta — assim a URL final fica curta
    // e não corre risco de ser truncada/quebrada ao ser inserida como hyperlink no termo.
    const fileParts = fileName.split('.');
    const extension = fileParts.pop();
    const baseName = fileParts.join('.');
    const numeroSimulacao = (baseName.split(' - ')[0] || baseName).trim();
    const numeroSimulacaoLimpo = stripDiacritics(numeroSimulacao)
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_.-]/g, '');

    const negociacaoIdLimpo = String(negociacaoId).replace(/[^a-zA-Z0-9_-]/g, '');
    const finalFileName = `${numeroSimulacaoLimpo}.${extension}`;

    // Caminho destino no Blob (ex: docs/negociacoes/3495/VGR-2026-0726180027.pdf)
    const blobPath = `docs/negociacoes/${negociacaoIdLimpo}/${finalFileName}`;

    // A Vercel lê o body binário do request diretamente e salva no Blob
    // addRandomSuffix: false desliga o final "-K2s8dL.pdf" feio que a Vercel gera por padrão
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
    console.error("Erro no upload n8n simulacao:", error);
    return res.status(500).json({ error: error.message });
  }
}
