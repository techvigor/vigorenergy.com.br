import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        // Se quisermos GARANTIR que ninguém envie para outra pasta senão docs/faturas
        // validamos o pathname aqui no backend
        if (!pathname.startsWith('docs/faturas/')) {
          throw new Error('Apenas uploads para docs/faturas/ são permitidos');
        }

        return {
          allowedContentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'],
          tokenPayload: JSON.stringify({
            context: 'upload_fatura'
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload finalizado:', blob.url);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Erro no Vercel Blob Client Upload Handler:", error);
    // Vercel Blob Client throw erros específicos que precisam ser repassados
    return res.status(400).json({ error: error.message });
  }
}