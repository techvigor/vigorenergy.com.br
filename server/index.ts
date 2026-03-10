import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

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
