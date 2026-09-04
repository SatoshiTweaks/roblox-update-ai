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

// ==========================================
// FORMATADOR DE ATUALIZAÇÕES
// ==========================================

function formatarAtualizacao(texto) {

    texto = texto.trim();

    const textoMinusculo = texto.toLowerCase();

    const secoes = [];

    // ⚔️ ESPADA
    if (
        textoMinusculo.includes("espada") ||
        textoMinusculo.includes("arma")
    ) {
        secoes.push(
            "⚔️ NOVA ESPADA\n\n" +
            "Uma nova espada foi adicionada ao jogo.\n" +
            "Teste o novo equipamento e descubra seu poder."
        );
    }

    // 👹 BOSS
    if (
        textoMinusculo.includes("boss") ||
        textoMinusculo.includes("chefe")
    ) {
        secoes.push(
            "👹 NOVO BOSS\n\n" +
            "Um novo boss foi adicionado ao jogo.\n" +
            "Prepare-se para enfrentar esse novo desafio."
        );
    }

    // 🌎 ÁREA
    if (
        textoMinusculo.includes("área") ||
        textoMinusculo.includes("area") ||
        textoMinusculo.includes("mapa") ||
        textoMinusculo.includes("ilha")
    ) {
        secoes.push(
            "🌎 NOVA ÁREA\n\n" +
            "Uma nova área foi adicionada ao mundo.\n" +
            "Explore o novo local e descubra suas novidades."
        );
    }

    // 👤 NPC
    if (
        textoMinusculo.includes("npc") ||
        textoMinusculo.includes("personagem")
    ) {
        secoes.push(
            "👤 NOVO NPC\n\n" +
            "Um novo NPC foi adicionado ao jogo.\n" +
            "Interaja com ele e descubra o que foi preparado."
        );
    }

    // 🔧 BUGS
    if (
        textoMinusculo.includes("bug") ||
        textoMinusculo.includes("bugs") ||
        textoMinusculo.includes("correção") ||
        textoMinusculo.includes("correcao")
    ) {
        secoes.push(
            "🔧 CORREÇÕES DE BUGS\n\n" +
            "Diversos problemas foram corrigidos.\n" +
            "Também foram realizados ajustes para melhorar a estabilidade."
        );
    }

    // ⚡ DESEMPENHO
    if (
        textoMinusculo.includes("desempenho") ||
        textoMinusculo.includes("performance") ||
        textoMinusculo.includes("otimização") ||
        textoMinusculo.includes("otimizacao") ||
        textoMinusculo.includes("lag")
    ) {
        secoes.push(
            "⚡ MELHORIAS DE DESEMPENHO\n\n" +
            "O desempenho do jogo recebeu melhorias.\n" +
            "A experiência foi otimizada para ficar mais fluida."
        );
    }

    // ✨ SKILLS
    if (
        textoMinusculo.includes("skill") ||
        textoMinusculo.includes("skills") ||
        textoMinusculo.includes("habilidade")
    ) {
        secoes.push(
            "✨ NOVAS HABILIDADES\n\n" +
            "Novas habilidades foram adicionadas ao jogo.\n" +
            "Teste as novas possibilidades durante sua jornada."
        );
    }

    // 💰 GOLD / XP
    if (
        textoMinusculo.includes("gold") ||
        textoMinusculo.includes("ouro") ||
        textoMinusculo.includes("xp")
    ) {
        secoes.push(
            "💰 PROGRESSÃO\n\n" +
            "O sistema de progressão recebeu melhorias.\n" +
            "Novas possibilidades de evolução foram adicionadas."
        );
    }

    // ⚙️ SISTEMA
    if (
        textoMinusculo.includes("sistema") ||
        textoMinusculo.includes("sistemas")
    ) {
        secoes.push(
            "⚙️ NOVO SISTEMA\n\n" +
            "Um novo sistema foi adicionado ao jogo.\n" +
            "Confira as novidades e aproveite o novo recurso."
        );
    }

    // ==========================================
    // INFORMAÇÃO ORIGINAL DO ADMINISTRADOR
    // ==========================================

    secoes.push(
        "📋 DETALHES DA ATUALIZAÇÃO\n\n" +
        texto
    );

    // ==========================================
    // JUNTA TUDO
    // ==========================================

    return secoes.join(
        "\n\n━━━━━━━━━━━━━━━━━━━━\n\n"
    );
}

// ==========================================
// RECEBER ATUALIZAÇÃO
// ==========================================

app.post("/", (req, res) => {

    try {

        const prompt = req.body?.prompt;

        if (!prompt) {

            return res.status(400).json({
                success: false,
                message: "Prompt não enviado."
            });

        }

        console.log("====================================");
        console.log("📢 NOVA ATUALIZAÇÃO");
        console.log("====================================");
        console.log(prompt);

        // ==========================================
        // PEGAR VERSÃO
        // ==========================================

        let version = "1.0.0";

        const versionMatch = prompt.match(
            /Versão:\s*([0-9]+(?:\.[0-9]+)*)/i
        );

        if (versionMatch) {
            version = versionMatch[1];
        }

        // ==========================================
        // PEGAR TODAS AS ALTERAÇÕES
        // ==========================================

        let description = prompt;

        const changesMatch = prompt.match(
            /Alterações informadas pelo administrador:\s*([\s\S]+)/i
        );

        if (changesMatch) {
            description = changesMatch[1].trim();
        }

        // ==========================================
        // GERAR DESCRIÇÃO
        // ==========================================

        const descricaoFormatada =
            formatarAtualizacao(description);

        const update = {
            version: version,
            date: new Date().toLocaleDateString("pt-BR"),
            description: descricaoFormatada
        };

        console.log("====================================");
        console.log("📌 VERSÃO:", version);
        console.log("📝 DESCRIÇÃO COMPLETA:");
        console.log(descricaoFormatada);
        console.log("====================================");

        // ==========================================
        // RESPOSTA
        // ==========================================

        res.json({
            success: true,
            update: update
        });

    } catch (error) {

        console.error("❌ ERRO:", error);

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });

    }

});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `🚀 Servidor iniciado na porta ${PORT}`
    );

});
