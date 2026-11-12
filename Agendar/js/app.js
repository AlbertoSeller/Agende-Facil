

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
    // 1. ELEMENTOS E FEEDBACK DE ACESSIBILIDADE
       ========================================== */

    const htmlElement = document.documentElement;
    const body = document.body;

    const feedback = document.getElementById("accessibilityFeedback");

    function anunciar(mensagem) {
        if (feedback) {
            feedback.textContent = mensagem;
        }
    }


    /* ==========================================
    // 2. CONTROLE DE FONTE (A+ E A-)
       ========================================== */

    const btnIncrease = document.getElementById("increaseFont");
    const btnDecrease = document.getElementById("decreaseFont");

    let currentFontSize = 16;

    function changeFontSize(value) {
        currentFontSize = Math.min(
            24,
            Math.max(12, currentFontSize + value)
        );

        htmlElement.style.fontSize = `${currentFontSize}px`;
    }

    btnIncrease?.addEventListener("click", () => {
        if (currentFontSize < 24) {
            changeFontSize(2);
            anunciar("Tamanho da fonte aumentado.");
        } else {
            anunciar("Tamanho máximo da fonte atingido.");
        }
    });

    btnDecrease?.addEventListener("click", () => {
        if (currentFontSize > 12) {
            changeFontSize(-2);
            anunciar("Tamanho da fonte diminuído.");
        } else {
            anunciar("Tamanho mínimo da fonte atingido.");
        }
    });


    /* ==========================================
    // 3. ALTO CONTRASTE
       ========================================== */

    const btnContrast = document.getElementById("contrastButton");

    btnContrast?.addEventListener("click", () => {
        const ativo = body.classList.toggle("high-contrast");

        btnContrast.setAttribute("aria-pressed", String(ativo));

        btnContrast.textContent = ativo
            ? "Contraste Padrão"
            : "Alto contraste";

        anunciar(
            ativo
                ? "Alto contraste ativado."
                : "Alto contraste desativado."
        );
    });


    /* ==========================================
    // 4. CONFIGURAÇÃO DO MODAL
       ========================================== */

    const modalElement = document.getElementById("agendamentoModal");
    const modalTitle = document.getElementById("modalTitle");

    let agendamentoModal = null;

    if (modalElement && window.bootstrap?.Modal) {
        agendamentoModal = new bootstrap.Modal(modalElement);
    }

    const serviceButtons = document.querySelectorAll("[data-service]");

    const servicoSelecionado = document.getElementById("servicoSelecionado");

    const form = document.getElementById("agendamentoForm");

    const formFeedback = document.getElementById("formFeedback");

    const btnNext = document.getElementById("btnNext");
    const btnBack = document.getElementById("btnBack");
    const btnConfirm = document.getElementById("btnConfirm");

    const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3")
    ];

    const progress = [
        document.getElementById("progress1"),
        document.getElementById("progress2"),
        document.getElementById("progress3")
    ];

    let etapaAtual = 1;


    /* ==========================================
    // 5. CAMPOS DO FORMULÁRIO
       ========================================== */

    const campoNome = document.getElementById("nome");
    const campoTelefone = document.getElementById("telefone");
    const campoData = document.getElementById("data");
    const campoHorario = document.getElementById("horario");

    // Impede seleção de datas anteriores ao dia atual.
    function dataLocalAtual() {
        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    if (campoData) {
        campoData.min = dataLocalAtual();
    }

    function formatarData(dataString) {
        if (!dataString) return "";

        const [ano, mes, dia] = dataString.split("-");

        return `${dia}/${mes}/${ano}`;
    }


    /* ==========================================
    // 6. CONTROLE DAS ETAPAS
       ========================================== */

    function mostrarEtapa(numero) {
        etapaAtual = numero;

        steps.forEach((step, index) => {
            const ativa = index === numero - 1;

            step.classList.toggle("d-none", !ativa);
            step.setAttribute("aria-hidden", String(!ativa));
        });

        progress.forEach((item, index) => {
            if (item) {
                item.classList.toggle("active", index < numero);
                item.setAttribute(
                    "aria-current",
                    index === numero - 1 ? "step" : "false"
                );
            }
        });

        btnBack?.classList.toggle("d-none", numero === 1);
        btnNext?.classList.toggle("d-none", numero === 3);
        btnConfirm?.classList.toggle("d-none", numero !== 3);

        formFeedback.textContent = "";

        // Leva o foco ao título da etapa exibida.
        const titulo = steps[numero - 1]?.querySelector("h3");

        if (titulo) {
            titulo.setAttribute("tabindex", "-1");
            titulo.focus();
        }
    }


    /* ==========================================
    // 7. VALIDAÇÃO DE CADA ETAPA
       ========================================== */

    function validarEtapa(numero) {
        const campos = numero === 1
            ? [campoNome, campoTelefone]
            : [campoData, campoHorario];

        for (const campo of campos) {
            if (!campo || !campo.checkValidity()) {
                campo?.reportValidity();
                return false;
            }
        }

        if (numero === 2) {
            if (campoData.value < dataLocalAtual()) {
                campoData.setCustomValidity(
                    "Selecione uma data a partir de hoje."
                );

                campoData.reportValidity();
                campoData.setCustomValidity("");

                return false;
            }
        }

        return true;
    }


    /* ==========================================
    // 8. PREENCHER RESUMO DO AGENDAMENTO
       ========================================== */

    function preencherResumo() {
        document.getElementById("reviewService").textContent =
            servicoSelecionado.value;

        document.getElementById("reviewName").textContent =
            campoNome.value.trim();

        document.getElementById("reviewPhone").textContent =
            campoTelefone.value.trim();

        document.getElementById("reviewDate").textContent =
            formatarData(campoData.value);

        document.getElementById("reviewTime").textContent =
            campoHorario.value;
    }


    /* ==========================================
    // 9. BOTÕES DE NAVEGAÇÃO
       ========================================== */

    btnNext?.addEventListener("click", () => {
        if (!validarEtapa(etapaAtual)) {
            return;
        }

        if (etapaAtual === 2) {
            preencherResumo();
        }

        if (etapaAtual < 3) {
            mostrarEtapa(etapaAtual + 1);
        }
    });

    btnBack?.addEventListener("click", () => {
        if (etapaAtual > 1) {
            mostrarEtapa(etapaAtual - 1);
        }
    });


    /* ==========================================
    // 10. ABRIR MODAL AO ESCOLHER SERVIÇO
       ========================================== */

    serviceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const servico = button.dataset.service;

            if (!agendamentoModal) {
                anunciar("O formulário de agendamento não está disponível.");
                return;
            }

            form.reset();

            if (formFeedback) {
                formFeedback.textContent = "";
            }

            servicoSelecionado.value = servico;
            modalTitle.textContent = `Agendar ${servico}`;

            campoData.min = dataLocalAtual();

            mostrarEtapa(1);

            agendamentoModal.show();
        });
    });


    /* ==========================================
    // 11. ARMAZENAMENTO NO LOCALSTORAGE
       ========================================== */

    function obterAgendamentos() {
        try {
            const dados = JSON.parse(
                localStorage.getItem("agendaFacil") || "[]"
            );

            return Array.isArray(dados) ? dados : [];

        } catch (error) {
            return [];
        }
    }


    /* ==========================================
    // 12. CONFIRMAR AGENDAMENTO
       ========================================== */

    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        if (etapaAtual !== 3) {
            return;
        }

        const novoAgendamento = {
            id: Date.now(),
            nome: campoNome.value.trim(),
            telefone: campoTelefone.value.trim(),
            data: campoData.value,
            horario: campoHorario.value,
            servico: servicoSelecionado.value,
            criadoEm: new Date().toISOString()
        };

        if (!novoAgendamento.nome ||
            !novoAgendamento.telefone ||
            !novoAgendamento.data ||
            !novoAgendamento.horario) {

            formFeedback.textContent =
                "Confira os dados antes de confirmar.";

            return;
        }

        const agendamentos = obterAgendamentos();

        agendamentos.push(novoAgendamento);

        try {
            localStorage.setItem(
                "agendaFacil",
                JSON.stringify(agendamentos)
            );

        } catch (error) {
            formFeedback.textContent =
                "Não foi possível salvar o agendamento neste navegador.";

            return;
        }

        alert("Agendamento confirmado com sucesso!");

        anunciar("Agendamento confirmado com sucesso.");

        form.reset();

        agendamentoModal?.hide();
    });


    /* ==========================================
    // 13. CONSULTAR MEUS AGENDAMENTOS
       ========================================== */

    const btnMyAppointments =
        document.getElementById("myAppointments");

    btnMyAppointments?.addEventListener("click", () => {
        const agendamentos = obterAgendamentos();

        if (agendamentos.length === 0) {
            alert("Você ainda não possui agendamentos.");
            return;
        }

        let mensagem = "MEUS AGENDAMENTOS\n\n";

        agendamentos.forEach((agendamento, index) => {
            mensagem +=
                `${index + 1}. ${agendamento.servico}\n` +
                `Data: ${formatarData(agendamento.data)}\n` +
                `Horário: ${agendamento.horario}\n\n`;
        });

        alert(mensagem);
    });


    /* ==========================================
    // 14. INICIALIZAÇÃO
       ========================================== */

    if (steps[0]) {
        mostrarEtapa(1);
    }

});
