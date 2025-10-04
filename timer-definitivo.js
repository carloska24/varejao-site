// SOLUÇÃO DEFINITIVA PARA TIMERS - SUBSTITUIÇÃO COMPLETA
(function() {
    'use strict';
    
    console.log('🔥 === SOLUÇÃO DEFINITIVA DE TIMERS ===');
    
    // Executar imediatamente quando carregar
    function initDefinitiveTimers() {
        console.log('⚡ Inicializando timers definitivos...');
        
        // 1. SUBSTITUIR TIMER PRINCIPAL COMPLETAMENTE
        replaceMainTimer();
        
        // 2. SUBSTITUIR TIMERS INDIVIDUAIS COMPLETAMENTE  
        replaceIndividualTimers();
        
        console.log('✅ Timers definitivos instalados e funcionando!');
    }
    
    function replaceMainTimer() {
        console.log('🕒 Substituindo timer principal...');
        
        // Encontrar elementos do timer principal
        let hours = document.querySelector('#hours');
        let minutes = document.querySelector('#minutes');
        let seconds = document.querySelector('#seconds');
        
        // Se não existirem, criar eles
        if (!hours || !minutes || !seconds) {
            console.log('🔧 Criando elementos do timer principal...');
            createMainTimerElements();
            hours = document.querySelector('#hours');
            minutes = document.querySelector('#minutes');
            seconds = document.querySelector('#seconds');
        }
        
        if (!hours || !minutes || !seconds) {
            console.log('❌ Não foi possível encontrar/criar timer principal');
            return;
        }
        
        // Limpar todos os intervalos existentes
        if (window.definitiveMainTimer) {
            clearInterval(window.definitiveMainTimer);
        }
        
        // Função de atualização do timer principal
        function updateMainTimer() {
            const now = new Date();
            
            // Calcular até meia-noite (fim do dia de promoções)
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);
            
            const timeLeft = endOfDay.getTime() - now.getTime();
            
            if (timeLeft <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                return;
            }
            
            const h = Math.floor(timeLeft / (1000 * 60 * 60));
            const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
            
            // Aplicar styling dinâmico
            applyMainTimerStyling(hours, minutes, seconds, timeLeft);
        }
        
        // Executar imediatamente
        updateMainTimer();
        
        // Iniciar intervalo definitivo
        window.definitiveMainTimer = setInterval(updateMainTimer, 1000);
        
        console.log('✅ Timer principal definitivo funcionando!');
    }
    
    function createMainTimerElements() {
        // Procurar por containers possíveis
        const possibleContainers = [
            '.timer-container',
            '.countdown-timer', 
            '.flash-sale-timer',
            '.promo-timer'
        ];
        
        let container = null;
        for (const selector of possibleContainers) {
            container = document.querySelector(selector);
            if (container) break;
        }
        
        // Se não encontrou container, criar um na seção de ofertas
        if (!container) {
            const ofertasSection = document.querySelector('#ofertas-especiais');
            if (ofertasSection) {
                container = document.createElement('div');
                container.className = 'timer-container-created';
                container.style.cssText = `
                    text-align: center;
                    margin: 20px 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    border-radius: 15px;
                    color: white;
                    font-weight: bold;
                `;
                
                container.innerHTML = `
                    <div style="font-size: 1.2em; margin-bottom: 10px;">⏰ OFERTA TERMINA EM:</div>
                    <div style="font-size: 2em; display: flex; justify-content: center; gap: 10px;">
                        <span id="hours">23</span>h
                        <span id="minutes">59</span>m
                        <span id="seconds">59</span>s
                    </div>
                `;
                
                ofertasSection.insertBefore(container, ofertasSection.firstChild);
                console.log('🔧 Container de timer criado!');
            }
        } else {
            // Se encontrou container, garantir que tem os elementos
            if (!container.querySelector('#hours')) {
                container.innerHTML = `
                    <div style="font-size: 1.2em; margin-bottom: 10px;">⏰ OFERTA TERMINA EM:</div>
                    <div style="font-size: 2em; display: flex; justify-content: center; gap: 10px;">
                        <span id="hours">23</span>h
                        <span id="minutes">59</span>m
                        <span id="seconds">59</span>s
                    </div>
                `;
            }
        }
    }
    
    function applyMainTimerStyling(hours, minutes, seconds, timeLeft) {
        const elements = [hours, minutes, seconds];
        
        let color, background, animation = 'none';
        
        if (timeLeft < 3600000) { // < 1 hora
            color = '#ffffff';
            background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
            animation = 'pulse 1s infinite';
        } else if (timeLeft < 7200000) { // < 2 horas
            color = '#ffffff'; 
            background = 'linear-gradient(45deg, #f39c12, #e67e22)';
        } else {
            color = '#ffffff';
            background = 'linear-gradient(45deg, #27ae60, #229954)';
        }
        
        elements.forEach(el => {
            if (el) {
                el.style.cssText = `
                    background: ${background};
                    color: ${color};
                    padding: 10px 15px;
                    border-radius: 10px;
                    margin: 0 5px;
                    animation: ${animation};
                    display: inline-block;
                    min-width: 60px;
                    text-align: center;
                `;
            }
        });
    }
    
    function replaceIndividualTimers() {
        console.log('🎯 Substituindo timers individuais...');
        
        // Encontrar todos os timers de ofertas
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        if (dealTimers.length === 0) {
            console.log('🔧 Criando timers individuais...');
            createIndividualTimers();
            return;
        }
        
        // Configurações das ofertas
        const offerConfigs = [
            { hours: 2, minutes: 30, name: 'Banana Nanica' },
            { hours: 1, minutes: 45, name: 'Banana Prata' },
            { hours: 3, minutes: 15, name: 'Maçã Gala' }
        ];
        
        dealTimers.forEach((timer, index) => {
            const config = offerConfigs[index] || { hours: 2, minutes: 0, name: `Oferta ${index + 1}` };
            
            // Calcular tempo final
            const endTime = new Date().getTime() + 
                           (config.hours * 60 * 60 * 1000) + 
                           (config.minutes * 60 * 1000);
            
            // Limpar intervalo anterior
            if (timer.definitiveInterval) {
                clearInterval(timer.definitiveInterval);
            }
            
            // Função de atualização
            function updateIndividualTimer() {
                const now = new Date().getTime();
                const timeLeft = endTime - now;
                
                if (timeLeft <= 0) {
                    timer.innerHTML = `⏰ <strong style="color: #fff;">EXPIRADA!</strong>`;
                    timer.style.cssText = `
                        background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
                        color: white !important;
                        padding: 12px 20px !important;
                        border-radius: 25px !important;
                        font-weight: bold !important;
                        animation: pulse 1s infinite !important;
                        display: inline-block !important;
                        margin-top: 15px !important;
                        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4) !important;
                        border: none !important;
                    `;
                    
                    clearInterval(timer.definitiveInterval);
                    return;
                }
                
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timer.innerHTML = `⏰ <strong>${hours}h ${minutes}m ${seconds}s</strong>`;
                
                // Styling baseado no tempo restante
                let gradient, shadow, animation = 'none';
                
                if (timeLeft < 1800000) { // < 30 minutos
                    gradient = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    shadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
                    animation = 'pulse 1s infinite';
                } else if (timeLeft < 3600000) { // < 1 hora
                    gradient = 'linear-gradient(45deg, #f39c12, #e67e22)';
                    shadow = '0 4px 15px rgba(243, 156, 18, 0.4)';
                } else {
                    gradient = 'linear-gradient(45deg, #27ae60, #229954)';
                    shadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
                }
                
                timer.style.cssText = `
                    background: ${gradient} !important;
                    color: white !important;
                    padding: 12px 20px !important;
                    border-radius: 25px !important;
                    font-weight: bold !important;
                    animation: ${animation} !important;
                    display: inline-block !important;
                    margin-top: 15px !important;
                    box-shadow: ${shadow} !important;
                    border: none !important;
                    font-size: 0.95em !important;
                    transition: all 0.3s ease !important;
                `;
            }
            
            // Executar imediatamente
            updateIndividualTimer();
            
            // Iniciar intervalo definitivo
            timer.definitiveInterval = setInterval(updateIndividualTimer, 1000);
            
            console.log(`✅ Timer individual ${index + 1} (${config.name}) funcionando!`);
        });
        
        console.log(`✅ ${dealTimers.length} timers individuais definitivos funcionando!`);
    }
    
    function createIndividualTimers() {
        // Encontrar cards de ofertas
        const offerCards = document.querySelectorAll('.flash-deal-item, .offer-card, .product-card');
        
        if (offerCards.length === 0) {
            console.log('⚠️ Nenhum card de oferta encontrado para adicionar timers');
            return;
        }
        
        const offerConfigs = [
            { hours: 2, minutes: 30, name: 'Oferta 1' },
            { hours: 1, minutes: 45, name: 'Oferta 2' },
            { hours: 3, minutes: 15, name: 'Oferta 3' }
        ];
        
        offerCards.forEach((card, index) => {
            if (index >= offerConfigs.length) return;
            
            const config = offerConfigs[index];
            
            // Criar elemento timer
            const timer = document.createElement('div');
            timer.className = 'deal-timer deal-timer-created';
            timer.style.cssText = `
                background: linear-gradient(45deg, #27ae60, #229954);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-weight: bold;
                display: inline-block;
                margin-top: 15px;
                box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
                font-size: 0.95em;
            `;
            
            // Adicionar ao card
            card.appendChild(timer);
            
            // Configurar timer
            const endTime = new Date().getTime() + 
                           (config.hours * 60 * 60 * 1000) + 
                           (config.minutes * 60 * 1000);
            
            function updateCreatedTimer() {
                const now = new Date().getTime();
                const timeLeft = endTime - now;
                
                if (timeLeft <= 0) {
                    timer.innerHTML = `⏰ <strong>EXPIRADA!</strong>`;
                    timer.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    timer.style.animation = 'pulse 1s infinite';
                    clearInterval(timer.definitiveInterval);
                    return;
                }
                
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timer.innerHTML = `⏰ <strong>${hours}h ${minutes}m ${seconds}s</strong>`;
                
                // Atualizar cor baseada no tempo
                if (timeLeft < 1800000) {
                    timer.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    timer.style.animation = 'pulse 1s infinite';
                } else if (timeLeft < 3600000) {
                    timer.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
                    timer.style.animation = 'none';
                } else {
                    timer.style.background = 'linear-gradient(45deg, #27ae60, #229954)';
                    timer.style.animation = 'none';
                }
            }
            
            // Executar imediatamente
            updateCreatedTimer();
            
            // Iniciar intervalo
            timer.definitiveInterval = setInterval(updateCreatedTimer, 1000);
            
            console.log(`✅ Timer criado para ${config.name}`);
        });
    }
    
    // Garantir que a animação pulse existe
    function ensurePulseAnimation() {
        if (!document.getElementById('definitive-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'definitive-pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Função para verificação completa
    window.verificarTimersDefinitivos = function() {
        console.log('🔍 === VERIFICAÇÃO DEFINITIVA DE TIMERS ===');
        
        const mainElements = {
            hours: document.querySelector('#hours'),
            minutes: document.querySelector('#minutes'),
            seconds: document.querySelector('#seconds')
        };
        
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        console.log('⏰ Timer Principal:');
        if (mainElements.hours && mainElements.minutes && mainElements.seconds) {
            const time = `${mainElements.hours.textContent}h ${mainElements.minutes.textContent}m ${mainElements.seconds.textContent}s`;
            console.log(`  ✅ FUNCIONANDO: ${time}`);
        } else {
            console.log('  ❌ NÃO FUNCIONANDO');
        }
        
        console.log(`🎯 Timers Individuais: ${dealTimers.length} encontrados`);
        dealTimers.forEach((timer, index) => {
            const isWorking = timer.definitiveInterval ? 'FUNCIONANDO' : 'PARADO';
            console.log(`  Timer ${index + 1}: ${isWorking} - "${timer.textContent}"`);
        });
        
        const allWorking = (mainElements.hours && mainElements.minutes && mainElements.seconds) && 
                          dealTimers.length > 0;
        
        console.log(`\n🎉 STATUS GERAL: ${allWorking ? '✅ TODOS FUNCIONANDO' : '❌ PROBLEMAS DETECTADOS'}`);
        
        return allWorking;
    };
    
    // Inicialização com múltiplas tentativas
    function initWithRetry(attempts = 3) {
        console.log(`🔄 Tentativa ${4 - attempts} de inicialização...`);
        
        ensurePulseAnimation();
        initDefinitiveTimers();
        
        // Verificar se funcionou após 2 segundos
        setTimeout(() => {
            const working = window.verificarTimersDefinitivos();
            
            if (!working && attempts > 1) {
                console.log('⚠️ Tentando novamente...');
                initWithRetry(attempts - 1);
            } else if (working) {
                console.log('🎉 TIMERS DEFINITIVOS FUNCIONANDO PERFEITAMENTE!');
            } else {
                console.log('❌ Falha após todas as tentativas');
            }
        }, 2000);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => initWithRetry(), 1000);
        });
    } else {
        setTimeout(() => initWithRetry(), 1000);
    }
    
    console.log('🔥 Sistema definitivo de timers carregado!');
    console.log('💡 Use verificarTimersDefinitivos() para verificar o status');
    
})();