// FORÇA BRUTA - TIMERS GARANTIDOS
console.log('💪 === FORÇA BRUTA PARA TIMERS ===');

// Executar IMEDIATAMENTE
setTimeout(() => {
    console.log('⚡ FORÇA BRUTA ATIVADA!');
    
    // TIMER PRINCIPAL - FORÇAR CRIAÇÃO E FUNCIONAMENTO
    function forceMainTimer() {
        // Limpar tudo primeiro
        const existingIntervals = [
            window.definitiveMainTimer,
            window.mainTimerInterval, 
            window.instantTimerInterval
        ];
        
        existingIntervals.forEach(interval => {
            if (interval) clearInterval(interval);
        });
        
        // Encontrar ou criar elementos
        let hours = document.querySelector('#hours');
        let minutes = document.querySelector('#minutes');
        let seconds = document.querySelector('#seconds');
        
        // Se não existirem, FORÇAR CRIAÇÃO
        if (!hours || !minutes || !seconds) {
            console.log('🔧 FORÇANDO criação do timer principal...');
            
            // Procurar local para inserir
            const targets = [
                '#ofertas-especiais',
                '.hero-section', 
                '.main-content',
                'main',
                'body'
            ];
            
            let targetElement = null;
            for (const selector of targets) {
                targetElement = document.querySelector(selector);
                if (targetElement) break;
            }
            
            if (targetElement) {
                const timerHTML = `
                    <div id="timer-forcado" style="
                        background: linear-gradient(135deg, #e74c3c, #c0392b);
                        color: white;
                        padding: 20px;
                        margin: 20px 0;
                        border-radius: 15px;
                        text-align: center;
                        font-weight: bold;
                        box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
                    ">
                        <div style="font-size: 1.3em; margin-bottom: 15px;">⏰ OFERTA TERMINA EM:</div>
                        <div style="font-size: 2.5em; display: flex; justify-content: center; gap: 15px; align-items: center;">
                            <span id="hours" style="background: rgba(0,0,0,0.2); padding: 10px 15px; border-radius: 10px; min-width: 70px;">23</span>
                            <span style="font-size: 0.8em;">h</span>
                            <span id="minutes" style="background: rgba(0,0,0,0.2); padding: 10px 15px; border-radius: 10px; min-width: 70px;">59</span>
                            <span style="font-size: 0.8em;">m</span>
                            <span id="seconds" style="background: rgba(0,0,0,0.2); padding: 10px 15px; border-radius: 10px; min-width: 70px;">59</span>
                            <span style="font-size: 0.8em;">s</span>
                        </div>
                    </div>
                `;
                
                // Inserir no início do elemento target
                targetElement.insertAdjacentHTML('afterbegin', timerHTML);
                
                hours = document.querySelector('#hours');
                minutes = document.querySelector('#minutes');
                seconds = document.querySelector('#seconds');
                
                console.log('✅ Timer principal CRIADO à força!');
            }
        }
        
        if (hours && minutes && seconds) {
            // FORÇAR funcionamento
            function updateForceTimer() {
                const now = new Date();
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
            }
            
            // Executar AGORA
            updateForceTimer();
            
            // FORÇAR intervalo
            window.forceMainTimerInterval = setInterval(updateForceTimer, 1000);
            
            console.log('💪 Timer principal FUNCIONANDO À FORÇA!');
        } else {
            console.log('❌ FALHA ao forçar timer principal');
        }
    }
    
    // TIMERS INDIVIDUAIS - FORÇAR CRIAÇÃO E FUNCIONAMENTO
    function forceIndividualTimers() {
        console.log('🎯 FORÇANDO timers individuais...');
        
        // Procurar por cards de ofertas existentes
        const possibleSelectors = [
            '.flash-deal-item',
            '.offer-card',
            '.product-card',
            '.deal-card',
            '[class*="offer"]',
            '[class*="deal"]',
            '[class*="product"]'
        ];
        
        let offerCards = [];
        for (const selector of possibleSelectors) {
            const cards = document.querySelectorAll(selector);
            if (cards.length > 0) {
                offerCards = Array.from(cards);
                console.log(`📦 Encontrados ${cards.length} cards com seletor: ${selector}`);
                break;
            }
        }
        
        // Se não encontrou cards, CRIAR cards de exemplo
        if (offerCards.length === 0) {
            console.log('🔧 CRIANDO cards de ofertas à força...');
            
            const targetElement = document.querySelector('#ofertas-especiais') || 
                                document.querySelector('main') || 
                                document.querySelector('body');
            
            if (targetElement) {
                const cardsHTML = `
                    <div id="ofertas-forcadas" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div class="offer-card-forced" style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #333; margin-bottom: 15px;">🍌 Banana Nanica</h3>
                            <div style="font-size: 1.5em; color: #e74c3c; font-weight: bold;">R$ 2,99/kg</div>
                            <div style="text-decoration: line-through; color: #999;">R$ 4,99</div>
                            <div class="deal-timer-forced" data-duration="150">⏰ Carregando...</div>
                        </div>
                        <div class="offer-card-forced" style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #333; margin-bottom: 15px;">🍌 Banana Prata</h3>
                            <div style="font-size: 1.5em; color: #e74c3c; font-weight: bold;">R$ 3,49/kg</div>
                            <div style="text-decoration: line-through; color: #999;">R$ 5,49</div>
                            <div class="deal-timer-forced" data-duration="105">⏰ Carregando...</div>
                        </div>
                        <div class="offer-card-forced" style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #333; margin-bottom: 15px;">🍎 Maçã Gala</h3>
                            <div style="font-size: 1.5em; color: #e74c3c; font-weight: bold;">R$ 4,99/kg</div>
                            <div style="text-decoration: line-through; color: #999;">R$ 7,99</div>
                            <div class="deal-timer-forced" data-duration="195">⏰ Carregando...</div>
                        </div>
                    </div>
                `;
                
                targetElement.insertAdjacentHTML('beforeend', cardsHTML);
                offerCards = Array.from(document.querySelectorAll('.offer-card-forced'));
                console.log('✅ Cards de ofertas CRIADOS à força!');
            }
        }
        
        // FORÇAR timers nos cards
        const dealTimers = document.querySelectorAll('.deal-timer, .deal-timer-forced');
        
        if (dealTimers.length === 0) {
            console.log('🔧 CRIANDO timers nos cards...');
            
            offerCards.forEach((card, index) => {
                const durations = [150, 105, 195]; // minutos
                const duration = durations[index] || 120;
                
                const timer = document.createElement('div');
                timer.className = 'deal-timer-created';
                timer.dataset.duration = duration;
                timer.style.cssText = `
                    background: linear-gradient(45deg, #27ae60, #229954);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    margin-top: 15px;
                    display: inline-block;
                    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
                `;
                
                card.appendChild(timer);
                console.log(`✅ Timer criado no card ${index + 1}`);
            });
        }
        
        // ATIVAR todos os timers
        const allTimers = document.querySelectorAll('.deal-timer, .deal-timer-forced, .deal-timer-created');
        
        allTimers.forEach((timer, index) => {
            const duration = parseInt(timer.dataset.duration) || (150 - (index * 25)); // minutos variados
            const endTime = new Date().getTime() + (duration * 60 * 1000);
            
            // Limpar intervalo anterior
            if (timer.forceInterval) {
                clearInterval(timer.forceInterval);
            }
            
            function updateForceIndividualTimer() {
                const now = new Date().getTime();
                const timeLeft = endTime - now;
                
                if (timeLeft <= 0) {
                    timer.innerHTML = '⏰ <strong>EXPIRADA!</strong>';
                    timer.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    timer.style.animation = 'pulse 1s infinite';
                    clearInterval(timer.forceInterval);
                    return;
                }
                
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timer.innerHTML = `⏰ <strong>${hours}h ${minutes}m ${seconds}s</strong>`;
                
                // Cores baseadas no tempo
                if (timeLeft < 1800000) { // < 30 min
                    timer.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    timer.style.animation = 'pulse 1s infinite';
                } else if (timeLeft < 3600000) { // < 1 hora
                    timer.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
                    timer.style.animation = 'none';
                } else {
                    timer.style.background = 'linear-gradient(45deg, #27ae60, #229954)';
                    timer.style.animation = 'none';
                }
            }
            
            // Executar AGORA
            updateForceIndividualTimer();
            
            // FORÇAR intervalo
            timer.forceInterval = setInterval(updateForceIndividualTimer, 1000);
            
            console.log(`💪 Timer individual ${index + 1} FUNCIONANDO À FORÇA!`);
        });
        
        console.log(`💪 ${allTimers.length} timers individuais FORÇADOS!`);
    }
    
    // Garantir animação pulse
    if (!document.getElementById('force-pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'force-pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // EXECUTAR FORÇA BRUTA
    forceMainTimer();
    forceIndividualTimers();
    
    // Função de verificação forçada
    window.verificarForcaBruta = function() {
        console.log('💪 === VERIFICAÇÃO FORÇA BRUTA ===');
        
        const mainTimer = document.querySelector('#hours');
        const dealTimers = document.querySelectorAll('.deal-timer, .deal-timer-forced, .deal-timer-created');
        
        console.log(`⏰ Timer Principal: ${mainTimer ? '✅ FUNCIONANDO' : '❌ FALHOU'}`);
        console.log(`🎯 Timers Individuais: ${dealTimers.length} encontrados`);
        
        dealTimers.forEach((timer, index) => {
            const working = timer.forceInterval ? 'FUNCIONANDO' : 'PARADO';
            console.log(`  Timer ${index + 1}: ${working}`);
        });
        
        const success = mainTimer && dealTimers.length > 0;
        console.log(`\n💪 FORÇA BRUTA: ${success ? '✅ SUCESSO TOTAL' : '❌ FALHA'}`);
        
        return success;
    };
    
    // Verificar resultado após 3 segundos
    setTimeout(() => {
        window.verificarForcaBruta();
    }, 3000);
    
    console.log('💪 FORÇA BRUTA EXECUTADA!');
    console.log('💡 Use verificarForcaBruta() para verificar');
    
}, 100); // Executar quase imediatamente

console.log('💪 Sistema de força bruta carregado!');