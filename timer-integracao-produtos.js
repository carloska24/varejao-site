// Integração DIRETA de Timers nos Cards das Frutas
(function() {
    console.log("🍎 Iniciando integração DIRETA de timers nos cards das frutas");
    
    let timersIntegrados = false;
    
    function integrarTimersNosProdutos() {
        if (timersIntegrados) return;
        timersIntegrados = true;
        
        console.log("🚀 Integrando timers DIRETAMENTE nos cards dos produtos");
        
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
        
        // Remover qualquer timer flutuante anterior
        removerTimersExtras();
        
        // Integrar timer em cada produto
        produtos.forEach((produto, index) => {
            integrarTimerNoProduto(produto, index);
        });
        
        // Criar também timers na barra inferior das ofertas
        criarTimersBarraInferior();
    }
    
    function removerTimersExtras() {
        // Remover containers flutuantes e demos
        const timersExtras = document.querySelectorAll('.timer-flutuante, .countdown-timer[style*="fixed"], .demo-timer');
        timersExtras.forEach(timer => timer.remove());
        console.log("🧹 Timers extras removidos");
    }
    
    function integrarTimerNoProduto(produto, index) {
        console.log(`🎯 Integrando timer DIRETAMENTE no produto: ${produto.nome}`);
        
        const cardProduto = document.querySelector(produto.selector);
        if (!cardProduto) {
            console.log(`❌ Card não encontrado: ${produto.selector}`);
            return;
        }
        
        // Encontrar e SUBSTITUIR o timer estático
        const timerEstatico = cardProduto.querySelector('.deal-timer');
        if (timerEstatico) {
            console.log(`🔄 Substituindo timer estático em: ${produto.nome}`);
            
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
            
            console.log(`✅ Timer INTEGRADO no produto: ${produto.nome}`);
        } else {
            console.log(`⚠️ Timer estático não encontrado em: ${produto.nome}`);
        }
    }
    
    function iniciarContagemRegressivaIntegrada(elemento) {
        const nomeProduto = elemento.getAttribute('data-produto');
        
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
        
        console.log(`⏰ ${elemento.getAttribute('data-produto')}: ${novoEstado} (${Math.floor(tempoRestante/60)}m restantes)`);
    }
    
    function criarTimersBarraInferior() {
        console.log("📱 Criando timers na barra inferior das ofertas");
        
        // Encontrar a seção de ofertas flash
        const flashDealsSection = document.querySelector('.flash-deals');
        if (!flashDealsSection) return;
        
        // Verificar se já existe barra de timers
        let barraTimers = flashDealsSection.querySelector('.barra-timers-ofertas');
        if (!barraTimers) {
            barraTimers = document.createElement('div');
            barraTimers.className = 'barra-timers-ofertas';
            barraTimers.innerHTML = `
                <div class="barra-header">⚡ OFERTAS RELÂMPAGO ATIVAS</div>
                <div class="barra-timers">
                    <div class="timer-barra verde">🍌 2h 28m 35s</div>
                    <div class="timer-barra amarelo">🍓 1h 43m 35s</div>
                    <div class="timer-barra vermelho">🍎 0h 13m 35s</div>
                </div>
            `;
            
            // Inserir após o grid de ofertas
            const flashGrid = flashDealsSection.querySelector('.flash-deals-grid');
            if (flashGrid && flashGrid.nextSibling) {
                flashDealsSection.insertBefore(barraTimers, flashGrid.nextSibling);
            } else {
                flashDealsSection.appendChild(barraTimers);
            }
        }
    }
    
    // Executar integração quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(integrarTimersNosProdutos, 1500);
        });
    } else {
        setTimeout(integrarTimersNosProdutos, 1500);
    }
    
    // Função para debug
    window.verificarTimersIntegrados = function() {
        const timersIntegrados = document.querySelectorAll('.timer-integrado');
        console.log(`🔍 Timers integrados encontrados: ${timersIntegrados.length}`);
        timersIntegrados.forEach((timer, i) => {
            console.log(`Timer ${i+1}: ${timer.getAttribute('data-produto')} - Estado: ${timer.getAttribute('data-estado')}`);
        });
    };
    
    console.log("✅ Sistema de integração DIRETA de timers carregado");
})();
    
    function integrarTimerNoProduto(produto, index) {
        console.log(`🎯 Integrando timer no produto: ${produto.nome}`);
        
        const cardProduto = document.querySelector(produto.selector);
        if (!cardProduto) {
            console.log(`❌ Card não encontrado: ${produto.selector}`);
            return;
        }
        
        // Encontrar e substituir o timer estático
        const timerEstatico = cardProduto.querySelector('.deal-timer');
        if (timerEstatico) {
            // Criar novo timer dinâmico
            const timerDinamico = document.createElement('div');
            timerDinamico.className = `deal-timer timer-dinamico ${produto.estadoInicial}`;
            timerDinamico.setAttribute('data-produto', produto.nome);
            timerDinamico.setAttribute('data-estado', produto.estadoInicial);
            
            // Calcular tempo total em segundos
            const totalSegundos = (produto.horas * 3600) + (produto.minutos * 60) + produto.segundos;
            timerDinamico.setAttribute('data-tempo-inicial', totalSegundos);
            timerDinamico.setAttribute('data-tempo-restante', totalSegundos);
            
            // Estrutura do timer dinâmico
            timerDinamico.innerHTML = `
                <div class="timer-header">⏰ Termina em:</div>
                <div class="timer-display">
                    <span class="timer-part">
                        <span class="timer-number" data-type="hours">${String(produto.horas).padStart(2, '0')}</span>
                        <span class="timer-label">h</span>
                    </span>
                    <span class="timer-separator">:</span>
                    <span class="timer-part">
                        <span class="timer-number" data-type="minutes">${String(produto.minutos).padStart(2, '0')}</span>
                        <span class="timer-label">m</span>
                    </span>
                    <span class="timer-separator">:</span>
                    <span class="timer-part">
                        <span class="timer-number" data-type="seconds">${String(produto.segundos).padStart(2, '0')}</span>
                        <span class="timer-label">s</span>
                    </span>
                </div>
            `;
            
            // Substituir timer estático pelo dinâmico
            timerEstatico.parentNode.replaceChild(timerDinamico, timerEstatico);
            
            // Iniciar contagem regressiva
            iniciarContagemRegressivaProduto(timerDinamico);
            
            console.log(`✅ Timer integrado no produto: ${produto.nome}`);
        }
    }
    
    function iniciarContagemRegressivaProduto(elemento) {
        const nomeProduto = elemento.getAttribute('data-produto');
        
        const intervalo = setInterval(() => {
            let tempoRestante = parseInt(elemento.getAttribute('data-tempo-restante'));
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                elemento.innerHTML = `
                    <div class="timer-header">⏰ PROMOÇÃO EXPIRADA</div>
                    <div class="timer-display expired">00:00:00</div>
                `;
                elemento.className = 'deal-timer timer-dinamico vermelho expired';
                return;
            }
            
            tempoRestante--;
            elemento.setAttribute('data-tempo-restante', tempoRestante);
            
            // Calcular horas, minutos, segundos
            const horas = Math.floor(tempoRestante / 3600);
            const minutos = Math.floor((tempoRestante % 3600) / 60);
            const segundos = tempoRestante % 60;
            
            // Atualizar display
            const timerNumbers = elemento.querySelectorAll('.timer-number');
            if (timerNumbers.length >= 3) {
                timerNumbers[0].textContent = String(horas).padStart(2, '0');
                timerNumbers[1].textContent = String(minutos).padStart(2, '0');
                timerNumbers[2].textContent = String(segundos).padStart(2, '0');
            }
            
            // Atualizar estado visual
            atualizarEstadoVisualProduto(elemento, tempoRestante);
            
        }, 1000);
    }
    
    function atualizarEstadoVisualProduto(elemento, tempoRestante) {
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
        
        // Aplicar efeito especial ao card do produto baseado na urgência
        const cardProduto = elemento.closest('.flash-deal-item');
        if (cardProduto) {
            cardProduto.classList.remove('produto-verde', 'produto-amarelo', 'produto-vermelho');
            cardProduto.classList.add(`produto-${novoEstado}`);
        }
    }
    
    function criarTimersContainerFlutuante() {
        console.log("🎈 Criando timers no container flutuante");
        
        // Verificar se já existe container flutuante
        let containerFlutuante = document.querySelector('.timer-flutuante');
        if (!containerFlutuante) {
            containerFlutuante = document.createElement('div');
            containerFlutuante.className = 'timer-flutuante';
            containerFlutuante.innerHTML = `
                <div class="flutuante-header">⚡ OFERTAS RELÂMPAGO</div>
                <div class="flutuante-timers"></div>
            `;
            document.body.appendChild(containerFlutuante);
        }
        
        const flutuanteTimers = containerFlutuante.querySelector('.flutuante-timers');
        
        // Criar timers compactos para o flutuante
        const timersCompactos = [
            { id: 'flutuante-1', tempo: '2h 28m 35s', estado: 'verde' },
            { id: 'flutuante-2', tempo: '1h 43m 35s', estado: 'amarelo' },
            { id: 'flutuante-3', tempo: '0h 13m 35s', estado: 'vermelho' },
            { id: 'flutuante-4', tempo: '1h 58m 35s', estado: 'verde' }
        ];
        
        timersCompactos.forEach(timer => {
            const timerElement = document.createElement('div');
            timerElement.className = `timer-compacto ${timer.estado}`;
            timerElement.innerHTML = `
                <span class="timer-icon">⏰</span>
                <span class="timer-tempo">${timer.tempo}</span>
            `;
            flutuanteTimers.appendChild(timerElement);
        });
    }
    
    function removerTimersDemo() {
        // Remover demo anterior
        const demosAnteriores = document.querySelectorAll('.countdown-timer[style*="position: fixed"]');
        demosAnteriores.forEach(demo => demo.remove());
        
        console.log("🧹 Timers demo anteriores removidos");
    }
    
    // Executar integração
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(integrarTimersNosProdutos, 1000);
        });
    } else {
        setTimeout(integrarTimersNosProdutos, 1000);
    }
    
    console.log("✅ Sistema de integração de timers carregado");
})();