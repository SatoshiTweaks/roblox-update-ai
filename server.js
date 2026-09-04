const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API do Roblox Update funcionando!"
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

        let version = "1.0.0";
        let description = prompt;

        const versionMatch = prompt.match(/Versão:\s*([0-9.]+)/i);

        if (versionMatch) {
            version = versionMatch[1];
        }

        const changesMatch = prompt.match(
            /Alterações informadas pelo administrador:\s*(.+)/i
        );

        if (changesMatch) {
            description = changesMatch[1].trim();
        }

        const update = {
            version: version,
            date: new Date().toLocaleDateString("pt-BR"),
            description: description
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
