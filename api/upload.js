import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs/promises';

// Fundamental: desativa o parser padrão da Vercel para conseguirmos ler os arquivos físicos
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ sucesso: false, mensagem: 'Método inválido.' });
    }

    try {
        // Inicializa o formidable para processar o formulário
        const form = formidable({ keepExtensions: true });
        const [fields, files] = await form.parse(req);

        const campos = ['fatura_concessionaria', 'boleto_vigor'];
        const extensoesPermitidas = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
        const resposta = { sucesso: true, arquivos: {} };
        const erros = [];

        const promessasUpload = campos.map(async (campo) => {
            // O formidable retorna um array de arquivos por campo, pegamos o primeiro
            const arquivoLista = files[campo];
            const arquivo = arquivoLista ? arquivoLista[0] : null;

            if (arquivo && arquivo.originalFilename) {
                const nomePartes = arquivo.originalFilename.split('.');
                const extensao = nomePartes[nomePartes.length - 1].toLowerCase();

                if (!extensoesPermitidas.includes(extensao)) {
                    erros.push(`Erro em ${campo}: Extensão .${extensao} não permitida.`);
                    return;
                }

                const nomeOriginal = nomePartes.slice(0, -1).join('.');
                const nomeLimpo = nomeOriginal.replace(/[^a-zA-Z0-9_-]/g, '').replace(/\s+/g, '-');
                const novoNome = `${nomeLimpo}.${extensao}`;

                // Lê o arquivo que o formidable salvou temporariamente no disco do servidor
                const fileBuffer = await fs.readFile(arquivo.filepath);

                // Envia para o Blob
                const blob = await put(`docs/faturas/${novoNome}`, fileBuffer, {
                    access: 'public',
                });

                // Extrai e salva apenas o nome final
                const nomeFinal = blob.url.split('/').pop();
                resposta.arquivos[campo] = nomeFinal;
            } else {
                erros.push(`O arquivo para '${campo}' é obrigatório.`);
            }
        });

        await Promise.all(promessasUpload);

        if (erros.length > 0) {
            return res.status(400).json({ sucesso: false, mensagens: erros });
        }

        return res.status(200).json(resposta);

    } catch (error) {
        console.error("Erro no upload:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor.' });
    }
}