document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      console.log("JSON recebido →", data);

      // ————————— Preencher “Alcance vs. Impressões” —————————
      const alcanceUniqueEl = document.getElementById("alcance-unique");
      const impressoesEl = document.getElementById("impressoes");
      const repeticaoEl = document.getElementById("repeticao");

      // 1) Toggle “Insights e Observações”
      const btnToggleInsights = document.getElementById("toggle-insights");
      const contentInsights = document.getElementById("insights-content");
      const iconInsights = document.getElementById("icon-insights");

      if (btnToggleInsights && contentInsights && iconInsights) {
        btnToggleInsights.addEventListener("click", () => {
          // Alterna visibilidade do conteúdo
          contentInsights.classList.toggle("hidden");
          // Gira o ícone
          iconInsights.classList.toggle("rotate-180");
        });
      }

      // 2) Toggle “Recomendações”
      const btnToggleRecs = document.getElementById("toggle-recommendations");
      const contentRecs = document.getElementById("recommendations-content");
      const iconRecs = document.getElementById("icon-recommendations");

      if (btnToggleRecs && contentRecs && iconRecs) {
        btnToggleRecs.addEventListener("click", () => {
          contentRecs.classList.toggle("hidden");
          iconRecs.classList.toggle("rotate-180");
        });
      }

      if (alcanceUniqueEl) {
        // Exibe 107.378 com separador de milhares
        alcanceUniqueEl.innerText = data.alcance.toLocaleString("pt-BR");
      }
      if (impressoesEl) {
        // No seu JSON, o campo que representa “impressões” chama-se “visualizacoes”
        impressoesEl.innerText = data.visualizacoes.toLocaleString("pt-BR");
      }
      if (repeticaoEl && data.alcance > 0) {
        // Repetição ≈ impressões ÷ alcance
        const rep = data.visualizacoes / data.alcance;
        repeticaoEl.innerText = rep.toFixed(2);
      }

      // Preenchendo o valor de “Taxa de Engajamento”
      const taxaEngEl = document.getElementById("taxa-engajamento");
      if (taxaEngEl) {
        // data.taxaEngajamento já vem como 0.88 → representa 0,88%
        taxaEngEl.innerText = data.taxaEngajamento.toFixed(2) + " %";
      }

      // 1) Toggle “Insights e Observações”
      const btnToggleInsightsTE = document.getElementById("toggle-insights-te");
      const contentInsightsTE = document.getElementById("insights-content-te");
      const iconInsightsTE = document.getElementById("icon-insights-te");

      if (btnToggleInsightsTE && contentInsightsTE && iconInsightsTE) {
        btnToggleInsightsTE.addEventListener("click", () => {
          contentInsightsTE.classList.toggle("hidden");
          iconInsightsTE.classList.toggle("rotate-180");
        });
      }

      // 2) Toggle “Recomendações Práticas”
      const btnToggleRecsTE = document.getElementById("toggle-recs-te");
      const contentRecsTE = document.getElementById("recs-content-te");
      const iconRecsTE = document.getElementById("icon-recs-te");

      if (btnToggleRecsTE && contentRecsTE && iconRecsTE) {
        btnToggleRecsTE.addEventListener("click", () => {
          contentRecsTE.classList.toggle("hidden");
          iconRecsTE.classList.toggle("rotate-180");
        });
      }

      // ————————— Preencher “Redes de Conversão” —————————
      const visitasPerfilEl = document.getElementById("visitas-perfil");
      const cliquesSiteEl = document.getElementById("cliques-site");
      const cliquesContatoEl = document.getElementById("cliques-contato");
      const taxaConvEl = document.getElementById("taxa-conversao");

      if (visitasPerfilEl) {
        // No JSON, o campo de “visitas ao perfil” chama-se “visitas”
        visitasPerfilEl.innerText = data.visitas.toLocaleString("pt-BR");
      }
      if (cliquesSiteEl) {
        // No JSON, “toquesLinkSite” equivale a “cliques no site”
        cliquesSiteEl.innerText = data.toquesLinkSite.toLocaleString("pt-BR");
      }
      if (cliquesContatoEl) {
        // No JSON, “clicksPerfil” equivale a “cliques no contato”
        cliquesContatoEl.innerText = data.clicksPerfil.toLocaleString("pt-BR");
      }
      if (taxaConvEl && data.visitas > 0) {
        // Taxa de conversão = (cliquesSite + cliquesContato) ÷ visitasPerfil × 100
        const totalCliques = data.toquesLinkSite + data.clicksPerfil;
        const convRate = (totalCliques / data.visitas) * 100;
        taxaConvEl.innerText = convRate.toFixed(2) + " %";
      }

      // ————————— Toggle “Insights e Observações (Redes de Conversão)” —————————
      const btnToggleInsightsRedes = document.getElementById(
        "toggle-insights-redes"
      );
      const contentInsightsRedes = document.getElementById(
        "insights-redes-content"
      );
      const iconInsightsRedes = document.getElementById("icon-insights-redes");

      if (btnToggleInsightsRedes && contentInsightsRedes && iconInsightsRedes) {
        btnToggleInsightsRedes.addEventListener("click", () => {
          contentInsightsRedes.classList.toggle("hidden");
          iconInsightsRedes.classList.toggle("rotate-180");
        });
      }

      // ————————— Toggle “Recomendações (Redes de Conversão)” —————————
      const btnToggleRecsRedes = document.getElementById("toggle-recs-redes");
      const contentRecsRedes = document.getElementById("recs-redes-content");
      const iconRecsRedes = document.getElementById("icon-recs-redes");

      if (btnToggleRecsRedes && contentRecsRedes && iconRecsRedes) {
        btnToggleRecsRedes.addEventListener("click", () => {
          contentRecsRedes.classList.toggle("hidden");
          iconRecsRedes.classList.toggle("rotate-180");
        });
      }

      // ————————— Gráfico de Engajamento —————————
      const chartEngCanvas = document.getElementById("chartEngajamento");
      if (chartEngCanvas) {
        const ctxEng = chartEngCanvas.getContext("2d");
        new Chart(ctxEng, {
          type: "line",
          data: {
            labels: data.gruposDatas,
            datasets: [
              {
                label: "Engajamento",
                data: data.valoresEngajamento,
                fill: true,
                tension: 0.3,
                borderColor: "#4F46E5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                pointBackgroundColor: "#4F46E5",
                pointHoverRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
          },
        });
      }

      // ————————— Preencher “Métricas de Engajamento Detalhadas” —————————
      const curtidasDetEl = document.getElementById("curtidas-detalhe");
      const comentariosDetEl = document.getElementById("comentarios-detalhe");
      const compartilhDetEl = document.getElementById(
        "compartilhamentos-detalhe"
      );
      const salvosDetEl = document.getElementById("salvos-detalhe");
      const respostasStoriesEl = document.getElementById(
        "respostas-stories-detalhe"
      );

      if (curtidasDetEl) curtidasDetEl.innerText = data.curtidas;
      if (comentariosDetEl) comentariosDetEl.innerText = data.comentarios;
      if (compartilhDetEl) compartilhDetEl.innerText = data.compartilhamentos;
      if (salvosDetEl) salvosDetEl.innerText = data.salvos;
      if (respostasStoriesEl) respostasStoriesEl.innerText = data.respostas;

      // ————————— Toggle “Insights e Observações” (Métricas de Engajamento Detalhadas) —————————
      const btnToggleInsightsEng = document.getElementById(
        "toggle-insights-eng"
      );
      const contentInsightsEng = document.getElementById(
        "insights-eng-content"
      );
      const iconInsightsEng = document.getElementById("icon-insights-eng");

      if (btnToggleInsightsEng && contentInsightsEng && iconInsightsEng) {
        btnToggleInsightsEng.addEventListener("click", () => {
          contentInsightsEng.classList.toggle("hidden");
          iconInsightsEng.classList.toggle("rotate-180");
        });
      }

      // ————————— Toggle “Recomendações” (Métricas de Engajamento Detalhadas) —————————
      const btnToggleRecsEng = document.getElementById("toggle-recs-eng");
      const contentRecsEng = document.getElementById("recs-eng-content");
      const iconRecsEng = document.getElementById("icon-recs-eng");

      if (btnToggleRecsEng && contentRecsEng && iconRecsEng) {
        btnToggleRecsEng.addEventListener("click", () => {
          contentRecsEng.classList.toggle("hidden");
          iconRecsEng.classList.toggle("rotate-180");
        });
      }

      // ————————— Gráficos de Seguidores Diário/Semanal —————————
      // Checa se existe o elemento antes de usar
      const chartSegCanvas = document.getElementById("chartSeguidores");
      const selectPeriodo = document.getElementById("selectPeriodoSeguidores");
      if (chartSegCanvas && selectPeriodo) {
        // Preparar dados de seguidores
        const dailyLabels = data.datasSeguidores;
        const dailyNovos = data.novosSeguidores;
        const dailyNao = data.naoSeguidores;

        // Calcular semanas
        const diasPorSemana = 7;
        const totalDias = dailyLabels.length || 0;
        const numeroSemanas = Math.ceil(totalDias / diasPorSemana);

        const weeklyLabels = [];
        const weeklyNovos = [];
        const weeklyNao = [];

        for (let semana = 0; semana < numeroSemanas; semana++) {
          const inicio = semana * diasPorSemana;
          const fim = Math.min(inicio + diasPorSemana, totalDias);

          let somaNovos = 0;
          let somaNao = 0;
          for (let i = inicio; i < fim; i++) {
            somaNovos += dailyNovos[i] || 0;
            somaNao += dailyNao[i] || 0;
          }

          const dataInicio = dailyLabels[inicio];
          const dataFim = dailyLabels[fim - 1];
          weeklyLabels.push(`Semana ${semana + 1} (${dataInicio}–${dataFim})`);
          weeklyNovos.push(somaNovos);
          weeklyNao.push(somaNao);
        }

        // Inicializar gráfico de seguidores
        const ctxSeg = chartSegCanvas.getContext("2d");
        const configSeguidores = {
          type: "line",
          data: {
            labels: dailyLabels,
            datasets: [
              {
                label: "Novos Seguidores",
                data: dailyNovos,
                fill: true,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.3)",
                pointBackgroundColor: "#10B981",
                pointHoverRadius: 5,
                tension: 0.2,
              },
              {
                label: "Não Seguidores",
                data: dailyNao,
                fill: true,
                borderColor: "#F87171",
                backgroundColor: "rgba(248, 113, 113, 0.3)",
                pointBackgroundColor: "#F87171",
                pointHoverRadius: 5,
                tension: 0.2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: { mode: "index", intersect: false },
              legend: { labels: { usePointStyle: true, padding: 20 } },
            },
            interaction: { mode: "index", intersect: false },
            scales: {
              x: { display: true, title: { display: false } },
              y: {
                beginAtZero: true,
                grid: {
                  drawBorder: false,
                  color: "#e5e7eb",
                  borderDash: [4, 4],
                },
              },
            },
          },
        };
        const chartSeguidores = new Chart(ctxSeg, configSeguidores);

        // Listener para troca entre Diário e Semanal
        selectPeriodo.addEventListener("change", (event) => {
          const periodo = event.target.value;
          if (periodo === "diario") {
            chartSeguidores.config.type = "line";
            chartSeguidores.data.labels = dailyLabels;
            chartSeguidores.data.datasets = [
              {
                label: "Novos Seguidores",
                data: dailyNovos,
                fill: true,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.3)",
                pointBackgroundColor: "#10B981",
                pointHoverRadius: 5,
                tension: 0.2,
              },
              {
                label: "Não Seguidores",
                data: dailyNao,
                fill: true,
                borderColor: "#F87171",
                backgroundColor: "rgba(248, 113, 113, 0.3)",
                pointBackgroundColor: "#F87171",
                pointHoverRadius: 5,
                tension: 0.2,
              },
            ];
          } else {
            chartSeguidores.config.type = "bar";
            chartSeguidores.data.labels = weeklyLabels;
            chartSeguidores.data.datasets = [
              {
                label: "Novos Seguidores (semanal)",
                data: weeklyNovos,
                backgroundColor: "#10B981",
                hoverBackgroundColor: "#059669",
              },
              {
                label: "Não Seguidores (semanal)",
                data: weeklyNao,
                backgroundColor: "#F87171",
                hoverBackgroundColor: "#EF4444",
              },
            ];
          }
          chartSeguidores.update();
        });
      }

      const btnToggleInsightsSeguidores = document.getElementById(
        "toggle-insights-seguidores"
      );
      const contentInsightsSeguidores = document.getElementById(
        "insights-seguidores-content"
      );
      const iconInsightsSeguidores = document.getElementById(
        "icon-insights-seguidores"
      );

      if (
        btnToggleInsightsSeguidores &&
        contentInsightsSeguidores &&
        iconInsightsSeguidores
      ) {
        btnToggleInsightsSeguidores.addEventListener("click", () => {
          contentInsightsSeguidores.classList.toggle("hidden");
          iconInsightsSeguidores.classList.toggle("rotate-180");
        });
      }

      // ——— Cálculo da Taxa de Crescimento de Seguidores ———
      const novosArray = data.novosSeguidores || [];
      const totalNovos = novosArray.reduce((acc, val) => acc + val, 0);

      // Como no JSON a base final (em 04/Jun) é 475 seguidores:
      const seguidoresFinais = 475;

      // Base inicial em 01/Mai:
      const seguidoresIniciais = seguidoresFinais - totalNovos;

      // Crescimento total (%) no período:
      let crescimentoPercent = 0;
      if (seguidoresIniciais > 0) {
        crescimentoPercent = (totalNovos / seguidoresIniciais) * 100;
      }

      // Número de dias para CAGR:
      // como há 35 valores em novosArray (de 01/Mai a 04/Jun),
      // usamos 34 intervalos entre esses 35 dias.
      const dias = novosArray.length - 1;
      let cagrDiario = 0;
      if (dias > 0 && seguidoresIniciais > 0) {
        cagrDiario =
          Math.pow(seguidoresFinais / seguidoresIniciais, 1 / dias) - 1;
      }

      // Média diária simples:
      const mediaDiaria =
        novosArray.length > 0 ? totalNovos / novosArray.length : 0;

      // Preenchendo no HTML
      const elInicial = document.getElementById("seg-inicial");
      const elFinal = document.getElementById("seg-final");
      const elTotal = document.getElementById("growth-total");
      const elCAGR = document.getElementById("cagr-diario");
      const elMedia = document.getElementById("media-diaria");

      if (elInicial) {
        elInicial.innerText = seguidoresIniciais.toLocaleString("pt-BR");
      }
      if (elFinal) {
        elFinal.innerText = seguidoresFinais.toLocaleString("pt-BR");
      }
      if (elTotal) {
        elTotal.innerText = crescimentoPercent.toFixed(2) + " %";
      }
      if (elCAGR) {
        elCAGR.innerText = (cagrDiario * 100).toFixed(2) + " %";
      }
      if (elMedia) {
        elMedia.innerText = mediaDiaria.toFixed(2);
      }

      // ————————— Gráfico Único Demográfico: Faixa Etária —————————
      const idadeCanvas = document.getElementById("chartIdadeUnico");
      if (idadeCanvas) {
        const ctxIdadeUnico = idadeCanvas.getContext("2d");
        new Chart(ctxIdadeUnico, {
          type: "bar",
          data: {
            labels:
              data.demografico && data.demografico.idade
                ? data.demografico.idade.labels
                : [],
            datasets: [
              {
                label: "Todos",
                data:
                  data.demografico && data.demografico.idade
                    ? data.demografico.idade.todos
                    : [],
                backgroundColor: "#6366F1",
              },
              {
                label: "Homens",
                data:
                  data.demografico && data.demografico.idade
                    ? data.demografico.idade.homens
                    : [],
                backgroundColor: "#3B82F6",
              },
              {
                label: "Mulheres",
                data:
                  data.demografico && data.demografico.idade
                    ? data.demografico.idade.mulheres
                    : [],
                backgroundColor: "#EC4899",
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => value + "%",
                  stepSize: 10,
                },
                grid: {
                  drawBorder: false,
                  color: "#E5E7EB",
                  borderDash: [4, 4],
                },
              },
              y: { grid: { display: false } },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (ctx) => ctx.dataset.label + ": " + ctx.parsed.x + "%",
                },
              },
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 12,
                  padding: 20,
                },
              },
            },
          },
        });
      }

      const btnToggleInsightsIdade = document.getElementById(
        "toggle-insights-idade"
      );
      const contentInsightsIdade = document.getElementById(
        "insights-idade-content"
      );
      const iconInsightsIdade = document.getElementById("icon-insights-idade");

      if (btnToggleInsightsIdade && contentInsightsIdade && iconInsightsIdade) {
        btnToggleInsightsIdade.addEventListener("click", () => {
          contentInsightsIdade.classList.toggle("hidden");
          iconInsightsIdade.classList.toggle("rotate-180");
        });
      }

      // ————————— Gráfico Demográfico: Gênero Total —————————
      const generoCanvas = document.getElementById("chartGeneroTotal");
      if (generoCanvas) {
        const ctxGeneroTotal = generoCanvas.getContext("2d");
        new Chart(ctxGeneroTotal, {
          type: "pie",
          data: {
            labels: ["Homens", "Mulheres"],
            datasets: [
              {
                data: [
                  data.demografico?.genero?.homens || 0,
                  data.demografico?.genero?.mulheres || 0,
                ],
                backgroundColor: ["#3B82F6", "#EC4899"],
              },
            ],
          },
          options: { responsive: true },
        });
      }

      // ————————— Gráfico Demográfico: Cidade —————————
      const cidadeCanvas = document.getElementById("chartCidade");
      if (cidadeCanvas) {
        const ctxCidade = cidadeCanvas.getContext("2d");
        new Chart(ctxCidade, {
          type: "bar",
          data: {
            labels: data.demografico?.cidade?.labels || [],
            datasets: [
              {
                label: "% Seguidores",
                data: data.demografico?.cidade?.valores || [],
                backgroundColor: "#10B981",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true, ticks: { callback: (v) => v + "%" } },
            },
          },
        });
      }

      // ————————————— Preencher CARD 1: Estáticos & Carrosséis —————————————
      function createTipoBadge(tipo) {
        const span = document.createElement("span");
        span.className =
          "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full";

        if (tipo === "carrossel") {
          span.classList.add("bg-blue-100", "text-blue-700");
          span.innerText = "Carrossel";
        } else if (tipo === "estático" || tipo === "estatico") {
          span.classList.add("bg-green-100", "text-green-700");
          span.innerText = "Estático";
        } else {
          span.classList.add("bg-gray-100", "text-gray-700");
          span.innerText = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        }
        return span;
      }

      function createMetricItem(label, value, valueColor = "text-gray-700") {
        const div = document.createElement("div");
        div.className =
          "bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center";

        const spanLabel = document.createElement("span");
        spanLabel.className = "text-xs text-gray-500 mb-1";
        spanLabel.innerText = label;

        const spanVal = document.createElement("span");
        spanVal.className = `text-lg font-semibold ${valueColor}`;
        spanVal.innerText = value;

        div.appendChild(spanLabel);
        div.appendChild(spanVal);
        return div;
      }
      const estaticosCarrosseis = Array.isArray(data.posts)
        ? data.posts.filter((p) => {
            const t = (p.tipo || "").toLowerCase();
            return t === "estático" || t === "estatico" || t === "carrossel";
          })
        : [];

      // 2.2) Capturar referências aos nós do HTML que compõem o carrossel
      const ecInner = document.getElementById("ec-carousel-inner");
      const ecContainer = document.getElementById("ec-carousel-container");
      const prevBtn = document.getElementById("ec-prev-btn");
      const nextBtn = document.getElementById("ec-next-btn");

      if (!ecInner || !ecContainer || !prevBtn || !nextBtn) {
        console.warn(
          "Algum elemento do carrossel EC não foi encontrado no DOM."
        );
        return;
      }

      // ——————————————————————————————————————————————
      // 3) Montar cada card e inserir dentro de ecInner
      // ——————————————————————————————————————————————
      estaticosCarrosseis.forEach((post) => {
        // Campos de cada post
        const tipoPost = (post.tipo || "").toLowerCase();
        const dataPost = post.data || "";
        const textoPub = post.publicacao || "";

        const likes = Number(post.likes) || 0;
        const comentarios = Number(post.comentarios) || 0;
        const salvos = Number(post.salvos) || 0;
        const compartilhamentos = Number(post.compartilhamentos) || 0;
        const interacoesTotais =
          Number(post.interacao) ||
          likes + comentarios + compartilhamentos + salvos;

        const novosSeguidores = Number(post.novosSeguidores) || 0;
        const visitasPerfil = Number(post.visitasPerfil) || 0;
        const acoesPerfil = Number(post.acoesPerfil) || 0;

        const alcancePost = Number(post.alcance) || 0;
        const visualizacoes = Number(post.visualizacoes) || 0;

        // ===== Cria o card container =====
        const card = document.createElement("div");
        // Cada card terá largura mínima de 28rem (aprox. 448px)
        card.className =
          "min-w-[28rem] bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow flex flex-col justify-between";

        // Borda colorida de acordo com o tipo
        if (tipoPost === "carrossel") {
          card.classList.add("border-2", "border-blue-100");
        } else if (tipoPost === "estático" || tipoPost === "estatico") {
          card.classList.add("border-2", "border-green-100");
        }

        // ===== Conteúdo do Card =====

        // --- Cabeçalho (data + badge) ---
        const cabEC = document.createElement("div");
        cabEC.className = "flex items-center justify-between mb-3";

        const dtEC = document.createElement("p");
        dtEC.className = "text-sm text-gray-600";
        dtEC.innerText = dataPost;
        cabEC.appendChild(dtEC);

        cabEC.appendChild(createTipoBadge(tipoPost));
        card.appendChild(cabEC);

        // --- Texto da publicação (legenda) ---
        const pubEC = document.createElement("div");
        pubEC.className = "mb-4 text-sm text-gray-800 space-y-1";
        pubEC.innerText = textoPub;
        card.appendChild(pubEC);

        // --- Métricas básicas (grid 2x5) ---
        const gridECmet = document.createElement("div");
        gridECmet.className = "grid grid-cols-2 gap-2 mb-4";

        gridECmet.appendChild(
          createMetricItem("Likes", likes.toLocaleString("pt-BR"))
        );
        gridECmet.appendChild(
          createMetricItem("Comentários", comentarios.toLocaleString("pt-BR"))
        );
        gridECmet.appendChild(
          createMetricItem("Salvos", salvos.toLocaleString("pt-BR"))
        );
        gridECmet.appendChild(
          createMetricItem(
            "Compart.",
            compartilhamentos.toLocaleString("pt-BR")
          )
        );
        gridECmet.appendChild(
          createMetricItem(
            "Novos Seg.",
            novosSeguidores.toLocaleString("pt-BR")
          )
        );
        gridECmet.appendChild(
          createMetricItem(
            "Visitas Perfil",
            visitasPerfil.toLocaleString("pt-BR")
          )
        );
        gridECmet.appendChild(
          createMetricItem("Ações Perfil", acoesPerfil.toLocaleString("pt-BR"))
        );
        gridECmet.appendChild(
          createMetricItem(
            "Interação",
            interacoesTotais.toLocaleString("pt-BR"),
            "text-indigo-600"
          )
        );
        gridECmet.appendChild(
          createMetricItem("Alcance", alcancePost.toLocaleString("pt-BR"))
        );
        gridECmet.appendChild(
          createMetricItem(
            "Visualizações",
            visualizacoes.toLocaleString("pt-BR")
          )
        );

        card.appendChild(gridECmet);

        // ===== Anexa o card no wrapper interno do carrossel =====
        ecInner.appendChild(card);
      });

      // ——————————————————————————————————————————————
      // 4) Configurar comportamento das setas “Prev/Next”
      // ——————————————————————————————————————————————

      // Cada card tem largura fixa de 28rem → em px, isso equivale a 28 × 16 = 448px.
      // O gap entre cards (space-x-6) equivale a 1.5rem → 24px.
      // Portanto, a cada clique, deslocamos 472px (448 + 24).
      const CARD_WIDTH = 448; // px
      const CARD_GAP = 24; // px
      const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP; // 472px

      // Ao clicar em ▶, rola o ecContainer para a direita
      nextBtn.addEventListener("click", () => {
        ecContainer.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      });

      // Ao clicar em ◀, rola o ecContainer para a esquerda
      prevBtn.addEventListener("click", () => {
        ecContainer.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
      });

      // Função que habilita/desabilita os botões conforme a posição de scroll
      function updatePrevNextButtons() {
        // Se estiver no início (scrollLeft <= 0), desabilita Prev
        if (ecContainer.scrollLeft <= 0) {
          prevBtn.setAttribute("disabled", "true");
          prevBtn.classList.add("opacity-50", "cursor-not-allowed");
        } else {
          prevBtn.removeAttribute("disabled");
          prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
        }

        // Se estiver no final (scrollLeft + larguraContainer >= largura total do inner), desabilita Next
        if (
          ecContainer.scrollLeft + ecContainer.clientWidth >=
          ecInner.scrollWidth - 5
        ) {
          nextBtn.setAttribute("disabled", "true");
          nextBtn.classList.add("opacity-50", "cursor-not-allowed");
        } else {
          nextBtn.removeAttribute("disabled");
          nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
        }
      }

      // Atualiza o estado inicial dos botões
      updatePrevNextButtons();
      // Sempre que o container rolar (manual ou programaticamente), atualiza os botões
      ecContainer.addEventListener("scroll", updatePrevNextButtons);

      // ====================================================
      // §§§ Em seguida, seu código continua gerando o card de “Posts Reels”…
      // ====================================================

      const gridReels = document.getElementById("posts-reels-grid");
      const reels = data.posts.filter(
        (p) => (p.tipo || "").toLowerCase() === "reel"
      );

      // ====================================================
      // 5) Loop para Reels → gera cards ricos em métricas
      // ====================================================

      reels.forEach((post) => {
        const dataPost = post.data || "";
        const textoPub = post.publicacao || "";

        const likes = Number(post.likes) || 0;
        const comentarios = Number(post.comentarios) || 0;
        const salvos = Number(post.salvos) || 0;
        const compartilhamentos = Number(post.compartilhamentos) || 0;
        const interacoesTotais =
          Number(post.interacao) ||
          likes + comentarios + compartilhamentos + salvos;

        const novosSeguidores = Number(post.novosSeguidores) || 0;
        const visitasPerfil = Number(post.visitasPerfil) || 0;
        const acoesPerfil = Number(post.acoesPerfil) || 0;

        const alcancePost = Number(post.alcance) || 0;
        const visualizacoes = Number(post.visualizacoes) || 0;

        const ir = post.insightsReel || {};

        // Cria o card container para Reel
        const card = document.createElement("div");
        card.className =
          "bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow flex flex-col justify-between border-2 border-purple-50";

        // ======== Conteúdo do Card Reel ========

        // --- Cabeçalho (data + badge “Reel”) ---
        const cabecalho = document.createElement("div");
        cabecalho.className = "flex items-center justify-between mb-3";

        const hData = document.createElement("p");
        hData.className = "text-sm text-gray-600";
        hData.innerText = dataPost;
        cabecalho.appendChild(hData);

        const badgeTipo = createTipoBadge("reel");
        cabecalho.appendChild(badgeTipo);

        card.appendChild(cabecalho);

        // --- Texto da publicação (legenda) ---
        const divPub = document.createElement("div");
        divPub.className = "mb-4 text-sm text-gray-800 space-y-1";
        divPub.innerText = textoPub;
        card.appendChild(divPub);

        // --- Métricas básicas em grid 2x5 ---
        const gridBasic = document.createElement("div");
        gridBasic.className = "grid grid-cols-2 gap-2 mb-4";

        gridBasic.appendChild(
          createMetricItem("Likes", likes.toLocaleString("pt-BR"))
        );
        gridBasic.appendChild(
          createMetricItem("Comentários", comentarios.toLocaleString("pt-BR"))
        );
        gridBasic.appendChild(
          createMetricItem("Salvos", salvos.toLocaleString("pt-BR"))
        );
        gridBasic.appendChild(
          createMetricItem(
            "Compart.",
            compartilhamentos.toLocaleString("pt-BR")
          )
        );
        gridBasic.appendChild(
          createMetricItem(
            "Novos Seg.",
            novosSeguidores.toLocaleString("pt-BR")
          )
        );
        gridBasic.appendChild(
          createMetricItem(
            "Visitas Perfil",
            visitasPerfil.toLocaleString("pt-BR")
          )
        );
        gridBasic.appendChild(
          createMetricItem("Ações Perfil", acoesPerfil.toLocaleString("pt-BR"))
        );
        gridBasic.appendChild(
          createMetricItem(
            "Interação",
            interacoesTotais.toLocaleString("pt-BR"),
            "text-indigo-600"
          )
        );
        gridBasic.appendChild(
          createMetricItem("Alcance", alcancePost.toLocaleString("pt-BR"))
        );
        gridBasic.appendChild(
          createMetricItem(
            "Visualizações",
            visualizacoes.toLocaleString("pt-BR")
          )
        );

        card.appendChild(gridBasic);

        // --- Separador ---
        const sep = document.createElement("hr");
        sep.className = "border-gray-200 my-3";
        card.appendChild(sep);

        // --- Insights específicos de Reel ---
        const divInsights = document.createElement("div");
        divInsights.className = "space-y-4";

        // 1) Visualizações (seguidores vs não seguidores)
        const vizWrapper = document.createElement("div");
        vizWrapper.className = "text-sm text-gray-700";

        const labelViz = document.createElement("p");
        labelViz.className = "font-medium text-gray-800 mb-1";
        labelViz.innerText = "Visualizações";
        vizWrapper.appendChild(labelViz);

        // Track da barra
        const barViz = document.createElement("div");
        barViz.className =
          "w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative";

        // Preenchimento roxo para “Seguidores”
        const progSegViz = document.createElement("div");
        progSegViz.className = "bg-purple-600 h-2.5 absolute left-0 top-0";
        progSegViz.style.width = `${ir.visualizacoesSeguidoresPercent || 0}%`;
        barViz.appendChild(progSegViz);

        // Preenchimento cinza para “Não Seguidores” (empurra para a direita)
        const progNaoViz = document.createElement("div");
        progNaoViz.className = "bg-gray-400 h-2.5 absolute left-0 top-0";
        progNaoViz.style.width = `${
          ir.visualizacoesNaoSeguidoresPercent || 0
        }%`;
        // usamos o mesmo left=0 e a cor cinza aparece “por trás” do roxo quando roxo não ocupa 100%
        barViz.appendChild(progNaoViz);

        const legendViz = document.createElement("div");
        legendViz.className = "flex justify-between text-xs text-gray-500 mt-1";
        const segTextViz = document.createElement("span");
        segTextViz.className = "text-purple-600 font-medium";
        segTextViz.innerText = `Seg: ${(
          ir.visualizacoesSeguidoresPercent || 0
        ).toFixed(1)}%`;
        const naoSegTextViz = document.createElement("span");
        naoSegTextViz.className = "text-gray-600 font-medium";
        naoSegTextViz.innerText = `Não seg: ${(
          ir.visualizacoesNaoSeguidoresPercent || 0
        ).toFixed(1)}%`;
        legendViz.appendChild(segTextViz);
        legendViz.appendChild(naoSegTextViz);

        vizWrapper.appendChild(barViz);
        vizWrapper.appendChild(legendViz);
        divInsights.appendChild(vizWrapper);

        // 2) Interações (seguidores vs não seguidores)
        const intWrapper = document.createElement("div");
        intWrapper.className = "text-sm text-gray-700";

        const labelInt = document.createElement("p");
        labelInt.className = "font-medium text-gray-800 mb-1";
        labelInt.innerText = "Interações";
        intWrapper.appendChild(labelInt);

        const barInt = document.createElement("div");
        barInt.className =
          "w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative";

        const progSegInt = document.createElement("div");
        progSegInt.className = "bg-pink-600 h-2.5 absolute left-0 top-0";
        progSegInt.style.width = `${ir.interacoesSeguidoresPercent || 0}%`;
        barInt.appendChild(progSegInt);

        const progNaoInt = document.createElement("div");
        progNaoInt.className = "bg-gray-400 h-2.5 absolute left-0 top-0";
        progNaoInt.style.width = `${ir.interacoesNaoSeguidoresPercent || 0}%`;
        barInt.appendChild(progNaoInt);

        const legendInt = document.createElement("div");
        legendInt.className = "flex justify-between text-xs text-gray-500 mt-1";
        const segTextInt = document.createElement("span");
        segTextInt.className = "text-pink-600 font-medium";
        segTextInt.innerText = `Seg: ${(
          ir.interacoesSeguidoresPercent || 0
        ).toFixed(1)}%`;
        const naoSegTextInt = document.createElement("span");
        naoSegTextInt.className = "text-gray-600 font-medium";
        naoSegTextInt.innerText = `Não seg: ${(
          ir.interacoesNaoSeguidoresPercent || 0
        ).toFixed(1)}%`;
        legendInt.appendChild(segTextInt);
        legendInt.appendChild(naoSegTextInt);

        intWrapper.appendChild(barInt);
        intWrapper.appendChild(legendInt);
        divInsights.appendChild(intWrapper);

        // 3) Contas alcançadas & Contas com engajamento
        const rowAlcEng = document.createElement("div");
        rowAlcEng.className = "flex items-center gap-4";

        const contAlc = document.createElement("div");
        contAlc.className = "flex-1 text-sm text-gray-700";
        contAlc.innerHTML = `<span class="font-medium">${(
          ir.contasAlcancadas || 0
        ).toLocaleString("pt-BR")}</span> Contas alcançadas`;

        const contEng = document.createElement("div");
        contEng.className = "flex-1 text-sm text-gray-700";
        contEng.innerHTML = `<span class="font-medium">${(
          ir.contasComEngajamento || 0
        ).toLocaleString("pt-BR")}</span> Contas com engajamento`;

        rowAlcEng.appendChild(contAlc);
        rowAlcEng.appendChild(contEng);
        divInsights.appendChild(rowAlcEng);

        // 4) Atividade do Perfil & Seguidores Ganhos
        const rowPerfil = document.createElement("div");
        rowPerfil.className = "flex items-center gap-4";

        const ativPerfil = document.createElement("div");
        ativPerfil.className = "flex-1 text-sm text-gray-700";
        ativPerfil.innerHTML = `<span class="font-medium">${(
          ir.perfil?.atividadePerfil || 0
        ).toLocaleString("pt-BR")}</span> Atividade no perfil`;

        const segsGanhos = document.createElement("div");
        segsGanhos.className = "flex-1 text-sm text-gray-700";
        segsGanhos.innerHTML = `<span class="font-medium">${(
          ir.perfil?.seguidoresGanhos || 0
        ).toLocaleString("pt-BR")}</span> Seguidores ganhos`;

        rowPerfil.appendChild(ativPerfil);
        rowPerfil.appendChild(segsGanhos);
        divInsights.appendChild(rowPerfil);

        card.appendChild(divInsights);

        // Insere o card final no grid de Reels
        gridReels.appendChild(card);
      });

      //   Card Métrica dos Posts
      function createMetricItem(label, value, valueColor = "text-gray-700") {
        const div = document.createElement("div");
        div.className =
          "bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center";
        // Label em texto pequeno e “cinza”
        const spanLabel = document.createElement("span");
        spanLabel.className = "text-xs text-gray-500 mb-1";
        spanLabel.innerText = label;
        // Valor em texto maior e cor personalizada
        const spanVal = document.createElement("span");
        spanVal.className = `text-lg font-semibold ${valueColor}`;
        spanVal.innerText = value;
        div.appendChild(spanLabel);
        div.appendChild(spanVal);
        return div;
      }

      const resumoContainer = document.getElementById("resumo-metrics");

      // 2) Verifica se data.posts existe e é array
      if (Array.isArray(data.posts) && resumoContainer) {
        // 3) Inicializa acumuladores
        let totalNovosSeguidores = 0;
        let totalLikes = 0;
        let totalComentarios = 0;
        let totalSalvos = 0;
        let totalCompartilhamentos = 0;
        let totalInteracoes = 0;
        let totalAlcance = 0;
        let totalVisualizacoes = 0;

        // 4) Percorre todos os posts e acumula valores
        data.posts.forEach((post) => {
          totalNovosSeguidores += Number(post.novosSeguidores) || 0;
          totalLikes += Number(post.likes) || 0;
          totalComentarios += Number(post.comentarios) || 0;
          totalSalvos += Number(post.salvos) || 0;
          totalCompartilhamentos += Number(post.compartilhamentos) || 0;
          // post.interacao pode já representar a soma de curtidas+comentários etc.
          // Caso queira garantir, você poderia fazer:
          //    const somaInter = Number(post.interacao) || (Number(post.likes)||0) + (Number(post.comentarios)||0) + (Number(post.salvos)||0) + (Number(post.compartilhamentos)||0);
          totalInteracoes += Number(post.interacao) || 0;
          totalAlcance += Number(post.alcance) || 0;
          totalVisualizacoes += Number(post.visualizacoes) || 0;
        });

        // 5) Cria e anexa um pequeno “card” para cada métrica dentro de #resumo-metrics
        //    Usamos a função createMetricItem(label, value, valueColor) para manter estilo parecido
        resumoContainer.appendChild(
          createMetricItem(
            "Total Novos Seguidores",
            totalNovosSeguidores.toLocaleString("pt-BR"),
            "text-green-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Likes",
            totalLikes.toLocaleString("pt-BR"),
            "text-blue-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Comentários",
            totalComentarios.toLocaleString("pt-BR"),
            "text-indigo-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Salvos",
            totalSalvos.toLocaleString("pt-BR"),
            "text-pink-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Compartilhamentos",
            totalCompartilhamentos.toLocaleString("pt-BR"),
            "text-purple-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Interações",
            totalInteracoes.toLocaleString("pt-BR"),
            "text-red-600"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Alcance",
            totalAlcance.toLocaleString("pt-BR"),
            "text-gray-800"
          )
        );
        resumoContainer.appendChild(
          createMetricItem(
            "Total de Visualizações",
            totalVisualizacoes.toLocaleString("pt-BR"),
            "text-gray-800"
          )
        );
      } else {
        console.warn(
          "Não foi possível renderizar o resumo de métricas (resumoContainer ou data.posts inválido)."
        );
      }

      const toggles = [
      { btnId: "toggle-reels",    contentId: "content-reels",    iconId: "icon-reels"    },
      { btnId: "toggle-ctas",     contentId: "content-ctas",     iconId: "icon-ctas"     },
      { btnId: "toggle-salvcomp", contentId: "content-salvcomp", iconId: "icon-salvcomp" },
      { btnId: "toggle-linguagem",contentId: "content-linguagem",iconId: "icon-linguagem"},
      { btnId: "toggle-legendas", contentId: "content-legendas", iconId: "icon-legendas" },
      { btnId: "toggle-calendario",contentId:"content-calendario",iconId: "icon-calendario"},
      { btnId: "toggle-metricas", contentId: "content-metricas", iconId: "icon-metricas" }
    ];

    toggles.forEach(({ btnId, contentId, iconId }) => {
      const btn     = document.getElementById(btnId);
      const content = document.getElementById(contentId);
      const icon    = document.getElementById(iconId);

      if (btn && content && icon) {
        btn.addEventListener("click", () => {
          content.classList.toggle("hidden");
          icon.classList.toggle("rotate-180");
        });
      }
    });
    })
    .catch((err) => console.error("Erro ao carregar data.json →", err));

  // ------------ Filtro por datas (caso exista o botão) ------------
  const btnApply = document.getElementById("btnApplyFilters");
  if (btnApply) {
    btnApply.addEventListener("click", () => {
      const start = document.getElementById("dateStart")?.value;
      const end = document.getElementById("dateEnd")?.value;
      alert(`Filtros aplicados de ${start} até ${end}`);
      // Se desejar refazer fetch ou filtrar localmente:
      //   fetchOuFiltrarComDatas(start, end);
    });
  }
});
