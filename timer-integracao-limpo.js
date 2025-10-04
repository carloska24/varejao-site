// Integração DIRETA de Timers nos Cards das Frutas - VERSÃO LIMPA
(function() {
    console.log("🍎 INICIANDO integração DIRETA de timers nos cards das frutas");
    
    let timersIntegrados = false;
    
    function integrarTimersNosProdutos() {
        if (timersIntegrados) return;
        timersIntegrados = true;
        
        console.log("🚀 INTEGRANDO timers DIRETAMENTE nos cards dos produtos");
        
        // Configuração específica para cada produto
        const produtos = [
            {
                selector: '.flash-deal-item:nth-child(1)', // Banana
                nome: 'Banana Nanica',
                horas: 2,
                minutos: 28,
                segundos: 35,
                estadoInicial: 'verde'
            },
            {
                selector: '.flash-deal-item:nth-child(2)', // Morango
                nome: 'Morango Premium',
                horas: 1,
                minutos: 43,
                segundos: 35,
                estadoInicial: 'amarelo'
            },
            {
                selector: '.flash-deal-item:nth-child(3)', // Maçã
                nome: 'Maçã Gala',
                horas: 0,
                minutos: 13,
                segundos: 35,
                estadoInicial: 'vermelho'
            }
        ];
        
        // PRIMEIRO: Remover qualquer timer flutuante anterior
        removerTimersExtras();
        
        // SEGUNDO: Integrar timer em cada produto
        produtos.forEach((produto, index) => {
            integrarTimerNoProduto(produto, index);
        });
        
        console.log("✅ INTEGRAÇÃO CONCLUÍDA");
    }
    
    function removerTimersExtras() {
        // Remover containers flutuantes e demos
        const timersExtras = document.querySelectorAll('.timer-flutuante, .countdown-timer[style*="fixed"], .demo-timer, .barra-timers-ofertas');
        timersExtras.forEach(timer => timer.remove());
        console.log(`🧹 ${timersExtras.length} timers extras removidos`);
    }
    
    function integrarTimerNoProduto(produto, index) {
        console.log(`🎯 INTEGRANDO timer no produto: ${produto.nome}`);
        
        const cardProduto = document.querySelector(produto.selector);
        if (!cardProduto) {
            console.log(`❌ Card NÃO encontrado: ${produto.selector}`);
            return;
        }
        
        console.log(`✅ Card ENCONTRADO: ${produto.nome}`);
        
        // Encontrar e SUBSTITUIR o timer estático
        const timerEstatico = cardProduto.querySelector('.deal-timer');
        if (timerEstatico) {
            console.log(`🔄 SUBSTITUINDO timer estático em: ${produto.nome}`);
            
            // Criar novo timer dinâmico integrado
            const timerIntegrado = document.createElement('div');
            timerIntegrado.className = `deal-timer timer-integrado ${produto.estadoInicial}`;
            timerIntegrado.setAttribute('data-produto', produto.nome);
            timerIntegrado.setAttribute('data-estado', produto.estadoInicial);
            
            // Calcular tempo total em segundos
            const totalSegundos = (produto.horas * 3600) + (produto.minutos * 60) + produto.segundos;
            timerIntegrado.setAttribute('data-tempo-inicial', totalSegundos);
            timerIntegrado.setAttribute('data-tempo-restante', totalSegundos);
            
            // Estrutura do timer integrado (similar ao original mas dinâmico)
            timerIntegrado.innerHTML = `
                ⏰ Termina em: 
                <span class="timer-tempo">
                    <span class="timer-h">${String(produto.horas).padStart(2, '0')}</span>h 
                    <span class="timer-m">${String(produto.minutos).padStart(2, '0')}</span>m 
                    <span class="timer-s">${String(produto.segundos).padStart(2, '0')}</span>s
                </span>
            `;
            
            // SUBSTITUIR o timer estático pelo integrado
            timerEstatico.parentNode.replaceChild(timerIntegrado, timerEstatico);
            
            // Iniciar contagem regressiva
            iniciarContagemRegressivaIntegrada(timerIntegrado);
            
            console.log(`✅ Timer INTEGRADO SUCESSO no produto: ${produto.nome}`);
        } else {
            console.log(`⚠️ Timer estático NÃO encontrado em: ${produto.nome}`);
            // Debug: verificar o que tem no card
            console.log("🔍 Conteúdo do card:", cardProduto.innerHTML);
        }
    }
    
    function iniciarContagemRegressivaIntegrada(elemento) {
        const nomeProduto = elemento.getAttribute('data-produto');
        console.log(`⏰ INICIANDO contagem para: ${nomeProduto}`);
        
        const intervalo = setInterval(() => {
            let tempoRestante = parseInt(elemento.getAttribute('data-tempo-restante'));
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                elemento.innerHTML = `⏰ PROMOÇÃO EXPIRADA`;
                elemento.className = 'deal-timer timer-integrado vermelho expired';
                return;
            }
            
            tempoRestante--;
            elemento.setAttribute('data-tempo-restante', tempoRestante);
            
            // Calcular horas, minutos, segundos
            const horas = Math.floor(tempoRestante / 3600);
            const minutos = Math.floor((tempoRestante % 3600) / 60);
            const segundos = tempoRestante % 60;
            
            // Atualizar display mantendo o formato original
            elemento.innerHTML = `
                ⏰ Termina em: 
                <span class="timer-tempo">
                    <span class="timer-h">${String(horas).padStart(2, '0')}</span>h 
                    <span class="timer-m">${String(minutos).padStart(2, '0')}</span>m 
                    <span class="timer-s">${String(segundos).padStart(2, '0')}</span>s
                </span>
            `;
            
            // Atualizar estado visual
            atualizarEstadoVisualIntegrado(elemento, tempoRestante);
            
        }, 1000);
    }
    
    function atualizarEstadoVisualIntegrado(elemento, tempoRestante) {
        const tempoInicial = parseInt(elemento.getAttribute('data-tempo-inicial'));
        const porcentagemRestante = (tempoRestante / tempoInicial) * 100;
        
        // Remover classes de estado anteriores
        elemento.classList.remove('verde', 'amarelo', 'vermelho');
        
        // Aplicar novo estado baseado na porcentagem
        let novoEstado;
        if (porcentagemRestante > 50) {
            novoEstado = 'verde';
        } else if (porcentagemRestante > 20) {
            novoEstado = 'amarelo';
        } else {
            novoEstado = 'vermelho';
        }
        
        elemento.classList.add(novoEstado);
        elemento.setAttribute('data-estado', novoEstado);
        
        // Aplicar efeito no card do produto
        const cardProduto = elemento.closest('.flash-deal-item');
        if (cardProduto) {
            cardProduto.classList.remove('produto-verde', 'produto-amarelo', 'produto-vermelho');
            cardProduto.classList.add(`produto-${novoEstado}`);
        }
    }
    
    // Executar integração quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(integrarTimersNosProdutos, 2000);
        });
    } else {
        setTimeout(integrarTimersNosProdutos, 2000);
    }
    
    // Função para debug
    window.verificarTimersIntegrados = function() {
        const timersIntegrados = document.querySelectorAll('.timer-integrado');
        console.log(`🔍 Timers integrados encontrados: ${timersIntegrados.length}`);
        timersIntegrados.forEach((timer, i) => {
            console.log(`Timer ${i+1}: ${timer.getAttribute('data-produto')} - Estado: ${timer.getAttribute('data-estado')}`);
        });
        
        // Verificar também os cards
        const cards = document.querySelectorAll('.flash-deal-item');
        console.log(`🔍 Cards encontrados: ${cards.length}`);
        cards.forEach((card, i) => {
            const timer = card.querySelector('.deal-timer');
            console.log(`Card ${i+1} tem timer:`, !!timer, timer ? timer.className : 'N/A');
        });
    };
    
    console.log("✅ Sistema de integração DIRETA de timers LIMPO carregado");
})();