// Sistema de Estados Visuais para Timers
(function() {
    console.log("🎨 Iniciando sistema de estados visuais para timers");
    
    let estadosTimerAtivos = false;
    
    function iniciarEstadosVisuais() {
        if (estadosTimerAtivos) return;
        estadosTimerAtivos = true;
        
        console.log("🚀 Ativando estados visuais dos timers");
        
        // Configurar diferentes timers com estados variados
        configurarTimersComEstados();
        
        // Iniciar sistema de atualização automática
        iniciarAtualizacaoAutomatica();
        
        // Monitorar mudanças nos timers
        monitorarTimers();
    }
    
    function configurarTimersComEstados() {
        console.log("⚙️ Configurando timers com diferentes estados");
        
        // Definir diferentes cenários de tempo
        const cenarios = [
            {
                id: 'timer1',
                horas: 2,
                minutos: 28,
                segundos: 35,
                estado: 'verde'
            },
            {
                id: 'timer2', 
                horas: 1,
                minutos: 43,
                segundos: 35,
                estado: 'amarelo'
            },
            {
                id: 'timer3',
                horas: 0,
                minutos: 13,
                segundos: 35,
                estado: 'vermelho'
            },
            {
                id: 'timer4',
                horas: 1,
                minutos: 58,
                segundos: 35,
                estado: 'verde'
            }
        ];
        
        // Criar ou atualizar timers existentes
        cenarios.forEach((cenario, index) => {
            criarTimerComEstado(cenario, index);
        });
    }
    
    function criarTimerComEstado(cenario, index) {
        console.log(`🎯 Criando timer ${index + 1} com estado: ${cenario.estado}`);
        
        // Encontrar container de timers ou criar um
        let container = document.querySelector('.countdown-timer');
        if (!container) {
            container = document.createElement('div');
            container.className = 'countdown-timer';
            
            // Inserir no local apropriado
            const flashDeals = document.querySelector('.flash-deals');
            if (flashDeals) {
                flashDeals.appendChild(container);
            } else {
                document.body.appendChild(container);
            }
        }
        
        // Criar elemento do timer
        const timerElement = document.createElement('div');
        timerElement.className = `countdown-item ${cenario.estado}`;
        timerElement.setAttribute('data-timer-id', cenario.id);
        timerElement.setAttribute('data-estado', cenario.estado);
        
        // Calcular tempo total em segundos
        const totalSegundos = (cenario.horas * 3600) + (cenario.minutos * 60) + cenario.segundos;
        timerElement.setAttribute('data-tempo-inicial', totalSegundos);
        timerElement.setAttribute('data-tempo-restante', totalSegundos);
        
        timerElement.innerHTML = `
            <span class="countdown-number">${String(cenario.horas).padStart(2, '0')}</span>
            <span class="countdown-label">h</span>
            <span style="margin: 0 3px;">:</span>
            <span class="countdown-number">${String(cenario.minutos).padStart(2, '0')}</span>
            <span class="countdown-label">m</span>
            <span style="margin: 0 3px;">:</span>
            <span class="countdown-number">${String(cenario.segundos).padStart(2, '0')}</span>
            <span class="countdown-label">s</span>
        `;
        
        container.appendChild(timerElement);
        
        // Iniciar contagem regressiva
        iniciarContagemRegressiva(timerElement);
    }
    
    function iniciarContagemRegressiva(elemento) {
        const timerId = elemento.getAttribute('data-timer-id');
        
        const intervalo = setInterval(() => {
            let tempoRestante = parseInt(elemento.getAttribute('data-tempo-restante'));
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                elemento.innerHTML = '<span class="countdown-number">00:00:00</span><span class="countdown-label">EXPIRADO</span>';
                elemento.className = 'countdown-item vermelho';
                return;
            }
            
            tempoRestante--;
            elemento.setAttribute('data-tempo-restante', tempoRestante);
            
            // Calcular horas, minutos, segundos
            const horas = Math.floor(tempoRestante / 3600);
            const minutos = Math.floor((tempoRestante % 3600) / 60);
            const segundos = tempoRestante % 60;
            
            // Atualizar display
            const numerosDisplay = elemento.querySelectorAll('.countdown-number');
            if (numerosDisplay.length >= 3) {
                numerosDisplay[0].textContent = String(horas).padStart(2, '0');
                numerosDisplay[1].textContent = String(minutos).padStart(2, '0');
                numerosDisplay[2].textContent = String(segundos).padStart(2, '0');
            }
            
            // Atualizar estado visual baseado no tempo restante
            atualizarEstadoVisual(elemento, tempoRestante);
            
        }, 1000);
    }
    
    function atualizarEstadoVisual(elemento, tempoRestante) {
        const tempoInicial = parseInt(elemento.getAttribute('data-tempo-inicial'));
        const porcentagemRestante = (tempoRestante / tempoInicial) * 100;
        
        // Remover classes de estado anteriores
        elemento.classList.remove('verde', 'amarelo', 'vermelho');
        
        // Aplicar novo estado baseado na porcentagem
        if (porcentagemRestante > 50) {
            elemento.classList.add('verde');
            elemento.setAttribute('data-estado', 'verde');
        } else if (porcentagemRestante > 20) {
            elemento.classList.add('amarelo');
            elemento.setAttribute('data-estado', 'amarelo');
        } else {
            elemento.classList.add('vermelho');
            elemento.setAttribute('data-estado', 'vermelho');
        }
        
        // Log do estado atual
        console.log(`⏰ Timer ${elemento.getAttribute('data-timer-id')}: ${Math.floor(tempoRestante/3600)}h ${Math.floor((tempoRestante%3600)/60)}m ${tempoRestante%60}s - Estado: ${elemento.getAttribute('data-estado')}`);
    }
    
    function iniciarAtualizacaoAutomatica() {
        console.log("🔄 Iniciando atualização automática dos estados");
        
        // Verificar e atualizar estados a cada 5 segundos
        setInterval(() => {
            const timers = document.querySelectorAll('.countdown-item[data-timer-id]');
            timers.forEach(timer => {
                const tempoRestante = parseInt(timer.getAttribute('data-tempo-restante'));
                if (tempoRestante > 0) {
                    atualizarEstadoVisual(timer, tempoRestante);
                }
            });
        }, 5000);
    }
    
    function monitorarTimers() {
        console.log("👁️ Iniciando monitoramento de timers");
        
        // Observer para detectar mudanças no DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && (
                            node.className.includes('countdown') || 
                            node.className.includes('timer')
                        )) {
                            console.log("🆕 Novo timer detectado, aplicando estados visuais");
                            aplicarEstadoSeNecessario(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function aplicarEstadoSeNecessario(elemento) {
        if (!elemento.getAttribute('data-estado')) {
            // Aplicar estado aleatório para demonstração
            const estados = ['verde', 'amarelo', 'vermelho'];
            const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
            
            elemento.classList.add(estadoAleatorio);
            elemento.setAttribute('data-estado', estadoAleatorio);
            
            console.log(`🎲 Estado aleatório aplicado: ${estadoAleatorio}`);
        }
    }
    
    // Função global para testes
    window.testarEstadosTimer = function() {
        console.log("🧪 Testando mudança de estados...");
        
        const timers = document.querySelectorAll('.countdown-item');
        const estados = ['verde', 'amarelo', 'vermelho'];
        
        timers.forEach((timer, index) => {
            const novoEstado = estados[index % estados.length];
            timer.className = `countdown-item ${novoEstado}`;
            timer.setAttribute('data-estado', novoEstado);
            
            console.log(`Timer ${index + 1}: ${novoEstado}`);
        });
    };
    
    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarEstadosVisuais);
    } else {
        iniciarEstadosVisuais();
    }
    
    // Executar com delay para garantir que outros scripts carregaram
    setTimeout(iniciarEstadosVisuais, 1000);
    
    console.log("✅ Sistema de estados visuais carregado");
})();