const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API do Roblox Update funcionando sem OpenAI!"
    });
});

app.post("/", (req, res) => {
    try {
        const prompt = req.body?.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt não enviado."
            });
        }

        console.log("Pedido recebido:", prompt);

        const update = {
            version: "1.0.1",
            date: new Date().toLocaleDateString("pt-BR"),
            description: "Nova atualização do jogo. Sistema de atualizações conectado ao servidor."
        };

        console.log("Atualização gerada:", update);

        res.json({
            success: true,
            update: update
        });

    } catch (error) {
        console.error("Erro:", error);

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
