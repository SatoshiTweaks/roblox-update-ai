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
        return "✨ Nova atualização adicionada ao jogo.";
    }

    const textoMinusculo = texto.toLowerCase();

    const secoes = [];

    // ⚔️ ESPADAS / ARMAS
    if (
        textoMinusculo.includes("espada") ||
        textoMinusculo.includes("arma") ||
        textoMinusculo.includes("sword")
    ) {
        secoes.push(
            `⚔️ NOVAS ARMAS\n\n` +
            `Novos equipamentos foram adicionados ao jogo.\n\n` +
            `Prepare-se para testar as novas armas e enfrentar seus inimigos.`
        );
    }

    // 👹 BOSS
    if (
        textoMinusculo.includes("boss") ||
        textoMinusculo.includes("chefe") ||
        textoMinusculo.includes("inimigo")
    ) {
        secoes.push(
            `👹 NOVO BOSS\n\n` +
            `Um novo inimigo poderoso foi adicionado ao jogo.\n\n` +
            `Prepare-se para enfrentar este novo desafio e provar suas habilidades.`
        );
    }

    // 👤 NPC
    if (
        textoMinusculo.includes("npc") ||
        textoMinusculo.includes("personagem")
    ) {
        secoes.push(
            `👤 NOVO NPC\n\n` +
            `Um novo personagem foi adicionado ao mundo.\n\n` +
            `Explore o mapa e descubra tudo o que este novo NPC oferece.`
        );
    }

    // 🌎 ÁREA / MAPA
    if (
        textoMinusculo.includes("área") ||
        textoMinusculo.includes("area") ||
        textoMinusculo.includes("mapa") ||
        textoMinusculo.includes("região") ||
        textoMinusculo.includes("regiao") ||
        textoMinusculo.includes("ilha")
    ) {
        secoes.push(
            `🌎 NOVAS ÁREAS\n\n` +
            `Novas regiões foram adicionadas ao mundo.\n\n` +
            `Explore os novos locais e descubra todas as novidades disponíveis.`
        );
    }

    // 🔧 BUGS
    if (
        textoMinusculo.includes("bug") ||
        textoMinusculo.includes("bugs") ||
        textoMinusculo.includes("correção") ||
        textoMinusculo.includes("correcao") ||
        textoMinusculo.includes("corrigido") ||
        textoMinusculo.includes("correções") ||
        textoMinusculo.includes("correcoes")
    ) {
        secoes.push(
            `🔧 CORREÇÕES E MELHORIAS\n\n` +
            `Diversos problemas encontrados no jogo foram corrigidos.\n\n` +
            `Também foram realizadas melhorias para deixar a experiência mais estável.`
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
            `⚡ MELHORIAS DE DESEMPENHO\n\n` +
            `O jogo recebeu melhorias de desempenho e estabilidade.\n\n` +
            `A experiência foi otimizada para proporcionar uma jogabilidade mais fluida.`
        );
    }

    // ✨ SKILLS
    if (
        textoMinusculo.includes("skill") ||
        textoMinusculo.includes("skills") ||
        textoMinusculo.includes("habilidade") ||
        textoMinusculo.includes("habilidades")
    ) {
        secoes.push(
            `✨ NOVAS HABILIDADES\n\n` +
            `Novas habilidades foram adicionadas ao jogo.\n\n` +
            `Teste suas novas possibilidades e descubra novas formas de jogar.`
        );
    }

    // 💰 GOLD / XP
    if (
        textoMinusculo.includes("gold") ||
        textoMinusculo.includes("ouro") ||
        textoMinusculo.includes("xp") ||
        textoMinusculo.includes("experiência") ||
        textoMinusculo.includes("experiencia")
    ) {
        secoes.push(
            `💰 PROGRESSÃO\n\n` +
            `O sistema de progressão recebeu novidades e melhorias.\n\n` +
            `Continue jogando para evoluir e desbloquear novas recompensas.`
        );
    }

    // ⚙️ SISTEMA
    if (
        textoMinusculo.includes("sistema") ||
        textoMinusculo.includes("sistemas") ||
        textoMinusculo.includes("interface") ||
        textoMinusculo.includes("gui")
    ) {
        secoes.push(
            `⚙️ NOVOS SISTEMAS\n\n` +
            `Novos recursos e melhorias foram adicionados ao jogo.\n\n` +
            `A interface e os sistemas receberam ajustes para melhorar a experiência dos jogadores.`
        );
    }

    // 🎮 GAMEPLAY
    if (
        textoMinusculo.includes("gameplay") ||
        textoMinusculo.includes("jogabilidade") ||
        textoMinusculo.includes("combate") ||
        textoMinusculo.includes("dash") ||
        textoMinusculo.includes("pulo")
    ) {
        secoes.push(
            `🎮 MELHORIAS DE GAMEPLAY\n\n` +
            `A jogabilidade recebeu melhorias e ajustes.\n\n` +
            `O objetivo é tornar o combate e a experiência geral mais divertidos e fluidos.`
        );
    }

    // Se encontrou categorias
    if (secoes.length > 0) {
        return secoes.join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");
    }

    // Caso não reconheça nenhuma palavra
    return (
        `✨ NOVA ATUALIZAÇÃO\n\n` +
        `${texto}\n\n` +
        `Esta atualização traz novidades e melhorias para deixar a experiência do jogo ainda melhor.`
    );
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

        console.log("====================================");
        console.log("📢 NOVO PEDIDO RECEBIDO");
        console.log("====================================");
        console.log(prompt);

        let version = "1.0.0";
        let description = prompt;

        // Detecta a versão
        const versionMatch = prompt.match(
            /Versão:\s*([0-9]+(?:\.[0-9]+)*)/i
        );

        if (versionMatch) {
            version = versionMatch[1];
        }

        // Detecta o texto escrito pelo administrador
        const changesMatch = prompt.match(
            /Alterações informadas pelo administrador:\s*([\s\S]+)/i
        );

        if (changesMatch) {
            description = changesMatch[1].trim();
        }

        console.log("📌 Versão:", version);
        console.log("📝 Alterações:", description);

        const descricaoFormatada = formatarAtualizacao(description);

        const update = {
            version: version,
            date: new Date().toLocaleDateString("pt-BR"),
            description: descricaoFormatada
        };

        console.log("====================================");
        console.log("✅ ATUALIZAÇÃO GERADA");
        console.log("====================================");
        console.log(update);

        res.json({
            success: true,
            update: update
        });

    } catch (error) {
        console.error("❌ Erro:", error);

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});
