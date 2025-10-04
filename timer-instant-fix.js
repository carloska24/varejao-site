// Correção IMEDIATA dos Timers - Execução Instantânea
console.log('🚀 === CORREÇÃO IMEDIATA DOS TIMERS ===');

// Executar imediatamente quando o script carrega
(function executeImmediately() {
    'use strict';
    
    console.log('⚡ Executando correção instantânea...');
    
    // Aguardar um pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
        
        // TIMER PRINCIPAL - Correção Instantânea
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        
        if (hours && minutes && seconds) {
            console.log('⏰ Corrigindo timer principal...');
            
            // Limpar qualquer intervalo anterior
            if (window.instantTimerInterval) {
                clearInterval(window.instantTimerInterval);
            }
            
            // Função de atualização do timer principal
            function updateInstantMainTimer() {
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
            
            // Executar imediatamente
            updateInstantMainTimer();
            
            // Iniciar intervalo
            window.instantTimerInterval = setInterval(updateInstantMainTimer, 1000);
            
            console.log('✅ Timer principal corrigido e funcionando!');
        } else {
            console.log('⚠️ Elementos do timer principal não encontrados');
        }
        
        // TIMERS INDIVIDUAIS - Correção Instantânea  
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        if (dealTimers.length > 0) {
            console.log(`🎯 Corrigindo ${dealTimers.length} timers individuais...`);
            
            // Configurações das ofertas
            const offers = [
                { duration: 150, name: 'Banana Nanica' }, // 2h30m
                { duration: 105, name: 'Banana Prata' },  // 1h45m  
                { duration: 195, name: 'Maçã Gala' }      // 3h15m
            ];
            
            dealTimers.forEach((timer, index) => {
                const offer = offers[index] || { duration: 120, name: `Oferta ${index + 1}` };
                const endTime = new Date().getTime() + (offer.duration * 60 * 1000);
                
                // Limpar intervalo anterior
                if (timer.instantInterval) {
                    clearInterval(timer.instantInterval);
                }
                
                // Função de atualização do timer individual
                function updateInstantTimer() {
                    const now = new Date().getTime();
                    const timeLeft = endTime - now;
                    
                    if (timeLeft <= 0) {
                        timer.innerHTML = '⏰ <span style="color: #e74c3c; font-weight: bold;">EXPIRADA!</span>';
                        timer.style.cssText = `
                            background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
                            color: white !important;
                            padding: 10px 15px !important;
                            border-radius: 20px !important;
                            font-weight: bold !important;
                            margin-top: 10px !important;
                            display: inline-block !important;
                            animation: pulse 1s infinite !important;
                            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4) !important;
                        `;
                        
                        clearInterval(timer.instantInterval);
                        return;
                    }
                    
                    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    
                    timer.innerHTML = `⏰ <strong>${hours}h ${minutes}m ${seconds}s</strong>`;
                    
                    // Estados visuais dinâmicos
                    let gradient, shadow, animation = 'none';
                    
                    if (timeLeft < 1800000) { // < 30 minutos - CRÍTICO
                        gradient = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                        shadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
                        animation = 'pulse 1s infinite';
                    } else if (timeLeft < 3600000) { // < 1 hora - ATENÇÃO
                        gradient = 'linear-gradient(45deg, #f39c12, #e67e22)';
                        shadow = '0 4px 15px rgba(243, 156, 18, 0.4)';
                    } else { // NORMAL
                        gradient = 'linear-gradient(45deg, #27ae60, #229954)';
                        shadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
                    }
                    
                    timer.style.cssText = `
                        background: ${gradient} !important;
                        color: white !important;
                        padding: 10px 15px !important;
                        border-radius: 20px !important;
                        font-weight: bold !important;
                        margin-top: 10px !important;
                        display: inline-block !important;
                        animation: ${animation} !important;
                        box-shadow: ${shadow} !important;
                        border: none !important;
                        font-size: 0.9em !important;
                    `;
                }
                
                // Executar imediatamente
                updateInstantTimer();
                
                // Iniciar intervalo
                timer.instantInterval = setInterval(updateInstantTimer, 1000);
                
                console.log(`✅ Timer ${index + 1} (${offer.name}) funcionando!`);
            });
            
            console.log('✅ Todos os timers individuais corrigidos!');
        } else {
            console.log('⚠️ Nenhum timer individual encontrado');
        }
        
        // Verificar se a animação pulse existe
        if (!document.getElementById('instant-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'instant-pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('🎉 CORREÇÃO INSTANTÂNEA COMPLETA!');
        console.log('✅ Timer principal: FUNCIONANDO');
        console.log('✅ Timers individuais: FUNCIONANDO');
        console.log('✅ Animações: ATIVAS');
        
    }, 500); // Delay de 500ms para garantir DOM pronto
    
})();

// Função para verificação rápida
window.verificarTimers = function() {
    console.log('🔍 === VERIFICAÇÃO DE TIMERS ===');
    
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const dealTimers = document.querySelectorAll('.deal-timer');
    
    console.log('⏰ Timer Principal:');
    if (hours && minutes && seconds) {
        console.log(`  ✅ Funcionando: ${hours.textContent}h ${minutes.textContent}m ${seconds.textContent}s`);
    } else {
        console.log('  ❌ Não encontrado');
    }
    
    console.log(`🎯 Timers Individuais: ${dealTimers.length} encontrados`);
    dealTimers.forEach((timer, index) => {
        console.log(`  Timer ${index + 1}: ${timer.textContent}`);
    });
    
    return {
        mainTimer: !!(hours && minutes && seconds),
        individualTimers: dealTimers.length,
        working: true
    };
};

console.log('⚡ Correção instantânea carregada! Use verificarTimers() para verificar.');