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

function formatarAtualizacao(texto) {
    texto = texto.trim();

    if (!texto) {
        return "Uma nova atualização foi adicionada ao jogo.";
    }

    const textoMinusculo = texto.toLowerCase();

    if (
        textoMinusculo.includes("npc") ||
        textoMinusculo.includes("personagem")
    ) {
        return `👤 Novo NPC

Um novo personagem foi adicionado ao jogo.

Explore o mapa e descubra todas as novidades relacionadas a este novo NPC.`;
    }

    if (
        textoMinusculo.includes("espada") ||
        textoMinusculo.includes("arma")
    ) {
        return `⚔️ Novas Armas

Novos equipamentos foram adicionados ao jogo.

Prepare-se para testar as novas armas e melhorar ainda mais seu desempenho nas batalhas.`;
    }

    if (
        textoMinusculo.includes("boss") ||
        textoMinusculo.includes("chefe")
    ) {
        return `👹 Novo Boss

Um novo inimigo poderoso foi adicionado ao jogo.

Prepare-se para enfrentar um novo desafio e provar suas habilidades.`;
    }

    if (
        textoMinusculo.includes("mapa") ||
        textoMinusculo.includes("area") ||
        textoMinusculo.includes("área")
    ) {
        return `🌎 Nova Área

Uma nova área foi adicionada ao mundo.

Explore o novo local e descubra tudo o que foi preparado nesta atualização.`;
    }

    if (
        textoMinusculo.includes("bug") ||
        textoMinusculo.includes("correção") ||
        textoMinusculo.includes("correcao")
    ) {
        return `🔧 Correções e Melhorias

Foram realizadas correções importantes no jogo.

Também foram aplicadas melhorias para deixar a experiência mais estável e agradável.`;
    }

    if (
        textoMinusculo.includes("desempenho") ||
        textoMinusculo.includes("performance") ||
        textoMinusculo.includes("otimização") ||
        textoMinusculo.includes("otimizacao")
    ) {
        return `⚡ Melhorias de Desempenho

O sistema recebeu melhorias de desempenho e estabilidade.

A atualização busca deixar a experiência mais fluida e consistente.`;
    }

    return `✨ Nova Atualização

${texto}

Esta atualização traz novidades e melhorias para deixar a experiência do jogo ainda melhor.`;
}

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

        const versionMatch = prompt.match(
            /Versão:\s*([0-9]+(?:\.[0-9]+)*)/i
        );

        if (versionMatch) {
            version = versionMatch[1];
        }

        const changesMatch = prompt.match(
            /Alterações informadas pelo administrador:\s*([\s\S]+)/i
        );

        if (changesMatch) {
            description = changesMatch[1].trim();
        }

        const descricaoFormatada = formatarAtualizacao(description);

        const update = {
            version: version,
            date: new Date().toLocaleDateString("pt-BR"),
            description: descricaoFormatada
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
