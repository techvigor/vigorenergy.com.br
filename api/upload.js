import { put } from '@vercel/blob';

export const config = {
    runtime: 'edge', // Usa o ambiente Edge da Vercel, super rápido e lê FormData nativamente
};

export default async function handler(request) {
    // Garante que só aceita POST, como no seu PHP original
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ sucesso: false, mensagem: 'Método inválido.' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Lê os arquivos enviados pelo formulário
        const formData = await request.formData();

        // Mantemos os mesmos campos e extensões do seu PHP original
        const campos = ['fatura_concessionaria', 'boleto_vigor'];
        const extensoesPermitidas = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

        const resposta = { sucesso: true, arquivos: {} };
        const erros = [];

        // Prepara as promessas de upload para enviar tudo simultaneamente (mais rápido)
        const promessasUpload = campos.map(async (campo) => {
            const arquivo = formData.get(campo);

            if (arquivo && arquivo.name) {
                const nomePartes = arquivo.name.split('.');
                const extensao = nomePartes[nomePartes.length - 1].toLowerCase();

                // Valida a extensão
                if (!extensoesPermitidas.includes(extensao)) {
                    erros.push(`Erro em ${campo}: Extensão .${extensao} não permitida.`);
                    return;
                }

                // Sanitiza o nome (Remove caracteres especiais e espaços)
                const nomeOriginal = nomePartes.slice(0, -1).join('.');
                const nomeLimpo = nomeOriginal.replace(/[^a-zA-Z0-9_-]/g, '').replace(/\s+/g, '-');
                const novoNome = `${nomeLimpo}.${extensao}`;

                /* 
                  Faz o upload para o Blob na pasta docs/faturas/
                  O Vercel Blob automaticamente adiciona um sufixo aleatório (ex: nome-do-arquivo-1A2B3C.pdf)
                  Isso substitui a sua lógica antiga de verificar se o arquivo já existe!
                */
                const blob = await put(`docs/faturas/${novoNome}`, arquivo, {
                    access: 'public',
                });

                // Pega a URL completa, divide nas barras '/' e extrai apenas o último item (o nome do arquivo)
                const nomeFinal = blob.url.split('/').pop();

                // Salva apenas o nome do arquivo, mantendo o exato comportamento do seu PHP antigo
                resposta.arquivos[campo] = nomeFinal;
            } else {
                erros.push(`O arquivo para '${campo}' é obrigatório.`);
            }
        });

        // Aguarda todos os uploads terminarem
        await Promise.all(promessasUpload);

        // Se houver erros, retorna a estrutura de erro esperada pelo seu frontend
        if (erros.length > 0) {
            return new Response(JSON.stringify({ sucesso: false, mensagens: erros }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Retorna sucesso com as URLs dos arquivos
        return new Response(JSON.stringify(resposta), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Erro no upload:", error);
        return new Response(JSON.stringify({ sucesso: false, mensagem: 'Erro interno no servidor.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}