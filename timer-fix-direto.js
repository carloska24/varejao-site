// Correção Direta e Simples para Timers - Garantia 100%
(function() {
    'use strict';
    
    console.log('🔧 === CORREÇÃO DIRETA DE TIMERS INICIADA ===');
    
    // Aguardar DOM carregar completamente
    function initTimers() {
        console.log('⏰ Inicializando timers funcionais...');
        
        // 1. Corrigir Timer Principal
        fixMainTimer();
        
        // 2. Corrigir Timers Individuais
        fixIndividualTimers();
        
        console.log('✅ Todos os timers corrigidos e funcionais!');
    }
    
    function fixMainTimer() {
        console.log('🕒 Corrigindo timer principal...');
        
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        
        if (!hours || !minutes || !seconds) {
            console.log('⚠️ Elementos do timer principal não encontrados');
            return;
        }
        
        // Limpar intervalo anterior se existir
        if (window.mainTimerInterval) {
            clearInterval(window.mainTimerInterval);
        }
        
        // Calcular tempo até meia-noite (24h de promoção)
        function updateMainTimer() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const timeLeft = tomorrow.getTime() - now.getTime();
            
            const h = Math.floor(timeLeft / (1000 * 60 * 60));
            const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
        }
        
        // Atualizar imediatamente
        updateMainTimer();
        
        // Iniciar intervalo
        window.mainTimerInterval = setInterval(updateMainTimer, 1000);
        
        console.log('✅ Timer principal funcionando!');
    }
    
    function fixIndividualTimers() {
        console.log('🎯 Corrigindo timers individuais...');
        
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        if (dealTimers.length === 0) {
            console.log('⚠️ Nenhum timer individual encontrado');
            return;
        }
        
        // Duração das ofertas (em minutos)
        const offerDurations = [150, 105, 195]; // 2h30m, 1h45m, 3h15m
        
        dealTimers.forEach((timer, index) => {
            const duration = offerDurations[index] || 120; // Padrão 2h
            const endTime = new Date().getTime() + (duration * 60 * 1000);
            
            // Limpar intervalo anterior
            if (timer.timerInterval) {
                clearInterval(timer.timerInterval);
            }
            
            function updateTimer() {
                const now = new Date().getTime();
                const timeLeft = endTime - now;
                
                if (timeLeft <= 0) {
                    timer.innerHTML = '⏰ <strong style="color: #e74c3c;">EXPIRADA!</strong>';
                    timer.style.cssText = `
                        background: #e74c3c !important;
                        color: white !important;
                        animation: pulse 1s infinite !important;
                        padding: 8px 12px !important;
                        border-radius: 15px !important;
                        font-weight: bold !important;
                    `;
                    
                    clearInterval(timer.timerInterval);
                    return;
                }
                
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                const timeString = `${hours}h ${minutes}m ${seconds}s`;
                timer.innerHTML = `⏰ Termina em: <strong>${timeString}</strong>`;
                
                // Estados visuais baseados no tempo restante
                let bgColor, textColor, animation = 'none';
                
                if (timeLeft < 1800000) { // < 30 minutos
                    bgColor = '#e74c3c';
                    textColor = 'white';
                    animation = 'pulse 1s infinite';
                } else if (timeLeft < 3600000) { // < 1 hora  
                    bgColor = '#f39c12';
                    textColor = 'white';
                } else {
                    bgColor = '#27ae60';
                    textColor = 'white';
                }
                
                timer.style.cssText = `
                    background: ${bgColor} !important;
                    color: ${textColor} !important;
                    animation: ${animation} !important;
                    padding: 8px 12px !important;
                    border-radius: 15px !important;
                    font-weight: bold !important;
                    margin-top: 10px !important;
                    display: inline-block !important;
                `;
            }
            
            // Atualizar imediatamente
            updateTimer();
            
            // Iniciar intervalo
            timer.timerInterval = setInterval(updateTimer, 1000);
            
            console.log(`✅ Timer ${index + 1} funcionando (${duration} minutos)`);
        });
        
        console.log(`✅ ${dealTimers.length} timers individuais funcionando!`);
    }
    
    // Adicionar CSS para animação pulse se não existir
    function addPulseAnimation() {
        const styleId = 'timer-pulse-animation';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Função para forçar correção manual
    window.forceTimerFix = function() {
        console.log('🔧 Forçando correção manual dos timers...');
        initTimers();
    };
    
    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addPulseAnimation();
            setTimeout(initTimers, 1000);
        });
    } else {
        addPulseAnimation();
        setTimeout(initTimers, 1000);
    }
    
    console.log('🔧 Sistema de correção de timers carregado!');
    console.log('💡 Use forceTimerFix() para corrigir manualmente');
    
})();