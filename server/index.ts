import express from 'express';
import cors from 'cors';
import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/upload', async (req, res) => {
    try {
        const form = formidable({ keepExtensions: true });
        const [fields, files] = await form.parse(req);

        const campos = ['fatura_concessionaria', 'boleto_vigor'];
        const extensoesPermitidas = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
        const resposta = { sucesso: true, arquivos: {} as Record<string, string> };
        const erros: string[] = [];

        const promessasUpload = campos.map(async (campo) => {
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

                const fileBuffer = await fs.readFile(arquivo.filepath);

                const blob = await put(`docs/faturas/${novoNome}`, fileBuffer, {
                    access: 'public',
                    token: process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_8aIu9iCXgorBs3K4_krjK8jK1YzsrtI17ouco4k5OAQbvw9",
                });

                const nomeFinal = blob.url.split('/').pop();
                if (nomeFinal) {
                    resposta.arquivos[campo] = nomeFinal;
                }
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
        console.error("Erro no upload (local dev):", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor local.' });
    }
});

app.post('/api/simulate', (req, res) => {
    const { name, email, phone, billAmount } = req.body;

    // Validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.name = 'Nome é obrigatório';
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'E-mail inválido';
    }

    if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Telefone inválido';
    }

    if (!billAmount || typeof billAmount !== 'number' || billAmount <= 0) {
        errors.billAmount = 'Valor da conta inválido';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Simulate savings calculation
    const discountPercent = Math.min(28, Math.max(10, Math.round(15 + Math.random() * 13)));
    const monthlySavings = Math.round(billAmount * (discountPercent / 100));
    const yearlySavings = monthlySavings * 12;

    return res.json({
        success: true,
        data: {
            name: name.trim(),
            email: email.trim(),
            discountPercent,
            monthlySavings,
            yearlySavings,
            message: `Olá ${name.trim()}, você pode economizar até R$ ${monthlySavings}/mês com energia solar!`,
        },
    });
});

app.listen(PORT, () => {
    console.log(`✅ API server running at http://localhost:${PORT}`);
});
