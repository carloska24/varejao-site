// Correção DEFINITIVA - Timers DENTRO dos Cards das Frutas
(function() {
    console.log("🎯 CORREÇÃO DEFINITIVA: Timers DENTRO dos cards");
    
    function corrigirTimersNoLocal() {
        console.log("🔧 Iniciando correção dos timers nos locais corretos");
        
        // Remover qualquer timer que esteja fora dos cards
        removerTimersExternos();
        
        // Aplicar timers diretamente nos cards existentes
        aplicarTimersNosCards();
    }
    
    function removerTimersExternos() {
        // Remover todos os timers que não estão dentro dos cards
        const timersExternos = document.querySelectorAll('.countdown-timer, .timer-flutuante, .barra-timers-ofertas, .timer-compacto');
        timersExternos.forEach(timer => {
            if (!timer.closest('.flash-deal-item')) {
                timer.remove();
                console.log("🗑️ Timer externo removido");
            }
        });
    }
    
    function aplicarTimersNosCards() {
        console.log("🎯 Aplicando timers DIRETAMENTE nos cards");
        
        // Selecionar todos os cards de ofertas
        const cards = document.querySelectorAll('.flash-deal-item');
        console.log(`📦 Encontrados ${cards.length} cards`);
        
        // Configurações para cada card
        const configuracoes = [
            { horas: 2, minutos: 28, segundos: 35, estado: 'verde' },   // Banana
            { horas: 1, minutos: 43, segundos: 35, estado: 'amarelo' }, // Morango  
            { horas: 0, minutos: 13, segundos: 35, estado: 'vermelho' } // Maçã
        ];
        
        cards.forEach((card, index) => {
            if (index < configuracoes.length) {
                const config = configuracoes[index];
                modificarTimerDoCard(card, config, index);
            }
        });
    }
    
    function modificarTimerDoCard(card, config, index) {
        console.log(`🔄 Modificando timer do card ${index + 1}`);
        
        // Encontrar o timer estático existente no card
        const timerExistente = card.querySelector('.deal-timer');
        
        if (timerExistente) {
            console.log(`✅ Timer encontrado no card ${index + 1}`);
            
            // Preservar a posição original, apenas modificar o conteúdo
            timerExistente.className = `deal-timer timer-ativo ${config.estado}`;
            timerExistente.setAttribute('data-estado', config.estado);
            
            // Calcular tempo total
            const totalSegundos = (config.horas * 3600) + (config.minutos * 60) + config.segundos;
            timerExistente.setAttribute('data-tempo-restante', totalSegundos);
            timerExistente.setAttribute('data-tempo-inicial', totalSegundos);
            
            // Atualizar apenas o conteúdo, mantendo a posição
            atualizarConteudoTimer(timerExistente, config);
            
            // Iniciar contagem regressiva
            iniciarContagem(timerExistente);
            
            console.log(`🎉 Timer do card ${index + 1} ativado com sucesso`);
        } else {
            console.log(`❌ Timer não encontrado no card ${index + 1}`);
        }
    }
    
    function atualizarConteudoTimer(elemento, config) {
        const iconePorEstado = {
            'verde': '🌟',
            'amarelo': '⚡',
            'vermelho': '🔥'
        };
        
        const mensagemPorEstado = {
            'verde': 'Tempo restante',
            'amarelo': 'ATENÇÃO! Termina em',
            'vermelho': 'ÚLTIMAS HORAS!'
        };
        
        elemento.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 5px;">
                <span style="font-size: 1.1em;">${iconePorEstado[config.estado]}</span>
                <span style="font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${mensagemPorEstado[config.estado]}
                </span>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-family: 'Courier New', monospace;">
                <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                    <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(config.horas).padStart(2, '0')}</div>
                    <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">HORAS</div>
                </div>
                <div style="font-size: 1.2em; font-weight: bold; opacity: 0.7;">:</div>
                <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                    <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(config.minutos).padStart(2, '0')}</div>
                    <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">MIN</div>
                </div>
                <div style="font-size: 1.2em; font-weight: bold; opacity: 0.7;">:</div>
                <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                    <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(config.segundos).padStart(2, '0')}</div>
                    <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">SEG</div>
                </div>
            </div>
        `;
    }
    
    function getCorPorEstado(estado) {
        switch(estado) {
            case 'verde': return '#4CAF50';
            case 'amarelo': return '#FF9800';
            case 'vermelho': return '#F44336';
            default: return '#333';
        }
    }
    
    function iniciarContagem(elemento) {
        const intervalo = setInterval(() => {
            let tempoRestante = parseInt(elemento.getAttribute('data-tempo-restante'));
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                elemento.innerHTML = '⏰ PROMOÇÃO EXPIRADA';
                elemento.style.color = '#999';
                return;
            }
            
            tempoRestante--;
            elemento.setAttribute('data-tempo-restante', tempoRestante);
            
            // Calcular tempo
            const horas = Math.floor(tempoRestante / 3600);
            const minutos = Math.floor((tempoRestante % 3600) / 60);
            const segundos = tempoRestante % 60;
            
            // Determinar estado baseado no tempo restante
            const tempoInicial = parseInt(elemento.getAttribute('data-tempo-inicial'));
            const porcentagem = (tempoRestante / tempoInicial) * 100;
            
            let estado, cor;
            if (porcentagem > 50) {
                estado = 'verde';
                cor = '#4CAF50';
            } else if (porcentagem > 20) {
                estado = 'amarelo';
                cor = '#FF9800';
            } else {
                estado = 'vermelho';
                cor = '#F44336';
            }
            
            // Atualizar visual sem mudar posição
            elemento.className = `deal-timer timer-ativo ${estado}`;
            elemento.setAttribute('data-estado', estado);
            
            const iconePorEstado = {
                'verde': '🌟',
                'amarelo': '⚡',
                'vermelho': '🔥'
            };
            
            const mensagemPorEstado = {
                'verde': 'Tempo restante',
                'amarelo': 'ATENÇÃO! Termina em',
                'vermelho': 'ÚLTIMAS HORAS!'
            };
            
            elemento.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 5px;">
                    <span style="font-size: 1.1em;">${iconePorEstado[estado]}</span>
                    <span style="font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${mensagemPorEstado[estado]}
                    </span>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-family: 'Courier New', monospace;">
                    <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                        <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(horas).padStart(2, '0')}</div>
                        <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">HORAS</div>
                    </div>
                    <div style="font-size: 1.2em; font-weight: bold; opacity: 0.7;">:</div>
                    <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                        <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(minutos).padStart(2, '0')}</div>
                        <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">MIN</div>
                    </div>
                    <div style="font-size: 1.2em; font-weight: bold; opacity: 0.7;">:</div>
                    <div style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px;">
                        <div style="font-size: 1.4em; font-weight: 900; line-height: 1;">${String(segundos).padStart(2, '0')}</div>
                        <div style="font-size: 0.6em; opacity: 0.8; margin-top: 1px;">SEG</div>
                    </div>
                </div>
            `;
            
        }, 1000);
    }
    
    // Executar correção
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(corrigirTimersNoLocal, 1000);
        });
    } else {
        setTimeout(corrigirTimersNoLocal, 1000);
    }
    
    // Função para debug
    window.verificarPosicaoTimers = function() {
        const cards = document.querySelectorAll('.flash-deal-item');
        console.log(`🔍 Verificando ${cards.length} cards:`);
        
        cards.forEach((card, i) => {
            const timer = card.querySelector('.deal-timer');
            const rect = card.getBoundingClientRect();
            console.log(`Card ${i+1}:`, {
                temTimer: !!timer,
                posicao: `top: ${rect.top}, left: ${rect.left}`,
                visivel: rect.top < window.innerHeight && rect.bottom > 0
            });
        });
    };
    
    console.log("✅ Correção de posição dos timers carregada");
})();