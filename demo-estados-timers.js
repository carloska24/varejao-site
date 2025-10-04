// Demo de Estados Visuais - Exibição Forçada dos 3 Estados
(function() {
    console.log("🎭 Iniciando demo de estados visuais dos timers");
    
    function criarDemoEstados() {
        console.log("🚀 Criando demo com os 3 estados visuais");
        
        // Remover timers existentes primeiro
        const timersExistentes = document.querySelectorAll('.countdown-timer');
        timersExistentes.forEach(timer => timer.remove());
        
        // Criar container principal para demo
        const demoContainer = document.createElement('div');
        demoContainer.className = 'countdown-timer';
        demoContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: rgba(0,0,0,0.8);
            padding: 15px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        `;
        
        // Timer Verde (Muito tempo restante)
        const timerVerde = criarTimerDemo({
            horas: 2,
            minutos: 28,
            segundos: 35,
            estado: 'verde',
            label: 'Tempo Tranquilo'
        });
        
        // Timer Amarelo (Tempo médio)
        const timerAmarelo = criarTimerDemo({
            horas: 1,
            minutos: 43,
            segundos: 35,
            estado: 'amarelo',
            label: 'Atenção!'
        });
        
        // Timer Vermelho (Urgente)
        const timerVermelho = criarTimerDemo({
            horas: 0,
            minutos: 13,
            segundos: 35,
            estado: 'vermelho',
            label: 'URGENTE!'
        });
        
        // Timer em transição (mudança de estado)
        const timerTransicao = criarTimerDemo({
            horas: 1,
            minutos: 0,
            segundos: 35,
            estado: 'amarelo',
            label: 'Mudando Estado'
        });
        
        // Adicionar todos os timers ao container
        demoContainer.appendChild(timerVerde);
        demoContainer.appendChild(timerAmarelo);
        demoContainer.appendChild(timerVermelho);
        demoContainer.appendChild(timerTransicao);
        
        // Adicionar ao body
        document.body.appendChild(demoContainer);
        
        // Iniciar animações e contadores
        iniciarContadoresDemo([timerVerde, timerAmarelo, timerVermelho, timerTransicao]);
        
        // Demonstrar mudança de estados a cada 3 segundos
        demonstrarMudancaEstados(timerTransicao);
        
        console.log("✅ Demo de estados visuais criado com sucesso!");
    }
    
    function criarTimerDemo(config) {
        const timer = document.createElement('div');
        timer.className = `countdown-item ${config.estado}`;
        timer.setAttribute('data-estado', config.estado);
        timer.setAttribute('data-label', config.label);
        
        timer.innerHTML = `
            <div style="text-align: center; margin-bottom: 5px; font-size: 0.8em; font-weight: bold;">
                ${config.label}
            </div>
            <span class="countdown-number">${String(config.horas).padStart(2, '0')}</span>
            <span class="countdown-label">h</span>
            <span style="margin: 0 3px; font-weight: bold;">:</span>
            <span class="countdown-number">${String(config.minutos).padStart(2, '0')}</span>
            <span class="countdown-label">m</span>
            <span style="margin: 0 3px; font-weight: bold;">:</span>
            <span class="countdown-number">${String(config.segundos).padStart(2, '0')}</span>
            <span class="countdown-label">s</span>
        `;
        
        // Calcular tempo total em segundos
        const totalSegundos = (config.horas * 3600) + (config.minutos * 60) + config.segundos;
        timer.setAttribute('data-tempo-restante', totalSegundos);
        timer.setAttribute('data-tempo-inicial', totalSegundos);
        
        return timer;
    }
    
    function iniciarContadoresDemo(timers) {
        timers.forEach((timer, index) => {
            const intervalo = setInterval(() => {
                let tempoRestante = parseInt(timer.getAttribute('data-tempo-restante'));
                
                if (tempoRestante <= 0) {
                    clearInterval(intervalo);
                    timer.querySelector('.countdown-number').textContent = '00:00:00';
                    timer.className = 'countdown-item vermelho';
                    return;
                }
                
                tempoRestante--;
                timer.setAttribute('data-tempo-restante', tempoRestante);
                
                // Atualizar display
                const horas = Math.floor(tempoRestante / 3600);
                const minutos = Math.floor((tempoRestante % 3600) / 60);
                const segundos = tempoRestante % 60;
                
                const numeros = timer.querySelectorAll('.countdown-number');
                if (numeros.length >= 3) {
                    numeros[0].textContent = String(horas).padStart(2, '0');
                    numeros[1].textContent = String(minutos).padStart(2, '0');
                    numeros[2].textContent = String(segundos).padStart(2, '0');
                }
                
            }, 1000);
        });
    }
    
    function demonstrarMudancaEstados(timer) {
        const estados = ['verde', 'amarelo', 'vermelho'];
        const labels = ['Tempo OK', 'Atenção!', 'URGENTE!'];
        let estadoAtual = 0;
        
        setInterval(() => {
            estadoAtual = (estadoAtual + 1) % estados.length;
            
            // Remover classes anteriores
            timer.classList.remove('verde', 'amarelo', 'vermelho');
            
            // Adicionar novo estado
            timer.classList.add(estados[estadoAtual]);
            timer.setAttribute('data-estado', estados[estadoAtual]);
            
            // Atualizar label
            const labelElement = timer.querySelector('div');
            labelElement.textContent = `${labels[estadoAtual]} (Demo)`;
            
            console.log(`🎭 Estado alterado para: ${estados[estadoAtual]}`);
            
        }, 3000);
    }
    
    // Função para remover demo
    window.removerDemoTimers = function() {
        const demos = document.querySelectorAll('.countdown-timer');
        demos.forEach(demo => {
            if (demo.style.position === 'fixed') {
                demo.remove();
            }
        });
        console.log("🗑️ Demo removido");
    };
    
    // Função para testar mudança manual de estados
    window.testarMudancaEstado = function(novoEstado) {
        const timers = document.querySelectorAll('.countdown-item');
        timers.forEach(timer => {
            timer.classList.remove('verde', 'amarelo', 'vermelho');
            timer.classList.add(novoEstado);
            timer.setAttribute('data-estado', novoEstado);
        });
        console.log(`🎨 Todos os timers alterados para: ${novoEstado}`);
    };
    
    // Executar demo quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(criarDemoEstados, 2000);
        });
    } else {
        setTimeout(criarDemoEstados, 2000);
    }
    
    console.log("🎭 Sistema de demo de estados carregado");
})();