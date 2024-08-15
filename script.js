// script.js
document.addEventListener("DOMContentLoaded", () => {
    const frasesMotivacionais = [
        "Continue firme, cada dia é uma vitória!",
        "Você é mais forte que qualquer tentação.",
        "Lembre-se do seu objetivo e vá em frente.",
        "A cada queda, levante-se mais forte."
    ];

    let fraseIndex = 0;
    const fraseMotivacaoEl = document.getElementById("frase-motivacao");

    // Função para trocar a frase motivacional a cada alguns minutos
    function trocarFrase() {
        fraseMotivacaoEl.textContent = frasesMotivacionais[fraseIndex];
        fraseIndex = (fraseIndex + 1) % frasesMotivacionais.length;
    }

    setInterval(trocarFrase, 300000); // Troca a cada 5 minutos
    trocarFrase(); // Inicializa a primeira frase

    const salvarMetaBtn = document.getElementById("salvar-meta");
    const recaiBtn = document.getElementById("recai");
    const dataInicioEl = document.getElementById("data-inicio");
    const metaDiasEl = document.getElementById("meta-dias");
    const progressoEl = document.getElementById("progresso");

    const diasRestantesEl = document.getElementById("dias-restantes");
    const mensagemSucessoEl = document.getElementById("mensagem-sucesso");
    const mensagemParabensEl = document.getElementById("mensagem-parabens");

    // Carregar a meta salva
    function carregarMeta() {
        const meta = JSON.parse(localStorage.getItem("metaNofap")) || {};
        if (meta.dataInicio) {
            dataInicioEl.value = meta.dataInicio;
        }
        if (meta.metaDias) {
            metaDiasEl.value = meta.metaDias;
            atualizarProgresso(meta.dataInicio, meta.metaDias);
        }
    }

    // Salvar a meta
    salvarMetaBtn.addEventListener("click", () => {
        const dataInicio = dataInicioEl.value;
        const metaDias = metaDiasEl.value;

        if (dataInicio && metaDias) {
            const meta = { dataInicio, metaDias };
            localStorage.setItem("metaNofap", JSON.stringify(meta));
            atualizarProgresso(dataInicio, metaDias);

            // Mostrar mensagem de sucesso
            mensagemSucessoEl.textContent = "Meta salva com sucesso!";
            mensagemSucessoEl.style.display = "block";
            setTimeout(() => {
                mensagemSucessoEl.style.display = "none";
            }, 3000); // Mensagem desaparece após 3 segundos
        }
    });

    // Atualizar o progresso
    function atualizarProgresso(dataInicio, metaDias) {
        const dataInicioDate = new Date(dataInicio);
        const hoje = new Date();
        const diasPassados = Math.floor((hoje - dataInicioDate) / (1000 * 60 * 60 * 24));
        const progresso = (diasPassados / metaDias) * 100;
        progressoEl.value = Math.min(progresso, 100);

        const diasRestantes = metaDias - diasPassados;
        if (diasRestantes > 0) {
            diasRestantesEl.textContent = `Faltam ${diasRestantes} dias para cumprir sua meta.`;
            mensagemParabensEl.style.display = "none";
        } else {
            diasRestantesEl.textContent = "Meta cumprida!";
            mensagemParabensEl.textContent = "Parabéns, agora aumente sua meta!";
            mensagemParabensEl.style.display = "block";
        }
    }

    // Resetar a meta
    recaiBtn.addEventListener("click", () => {
        if (confirm("Você tem certeza que deseja resetar sua meta?")) {
            localStorage.removeItem("metaNofap");
            dataInicioEl.value = "";
            metaDiasEl.value = "";
            progressoEl.value = 0;
            diasRestantesEl.textContent = "";
            mensagemParabensEl.style.display = "none";
        }
    });

    carregarMeta(); // Carregar a meta ao carregar a página
});
