const express = require("express"); // Importa o Express

const app = express(); // Cria o servidor
const PORT = process.env.PORT || 3000; // Usa a porta do Render

app.use(express.json()); // Permite receber JSON

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API do Roblox Update funcionando!"
    });
});

// Inicia o servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});