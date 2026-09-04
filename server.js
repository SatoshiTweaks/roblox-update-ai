const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API do Roblox Update funcionando!"
    });
});

// Rota usada pelo Roblox
app.post("/", (req, res) => {
    console.log("Pedido recebido do Roblox:", req.body);

    const prompt = req.body?.prompt;

    if (!prompt) {
        return res.status(400).json({
            success: false,
            message: "Prompt não enviado."
        });
    }

    res.json({
        success: true,
        message: "Pedido recebido com sucesso!",
        prompt: prompt
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
