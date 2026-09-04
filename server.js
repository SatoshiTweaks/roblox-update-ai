const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API do Roblox Update funcionando!"
    });
});

// Rota da IA
app.post("/", async (req, res) => {
    try {
        const prompt = req.body?.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt não enviado."
            });
        }

        console.log("Pedido recebido do Roblox:", prompt);

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: prompt
        });

        const resposta = response.output_text;

        console.log("Resposta da IA:", resposta);

        res.json({
            success: true,
            response: resposta
        });

    } catch (error) {
        console.error("Erro na OpenAI:", error);

        res.status(500).json({
            success: false,
            message: "Erro ao consultar a IA."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
