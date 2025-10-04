// Sistema de Timers Funcionais para Ofertas Relâmpago
class OfferTimer {
    constructor(offerElement, endTime) {
        this.element = offerElement;
        this.endTime = endTime;
        this.timerInterval = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        console.log('🕒 Inicializando timer para oferta:', this.element.querySelector('h3')?.textContent);
        this.startTimer();
    }
    
    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateTimer(); // Atualiza imediatamente
        
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        const now = new Date().getTime();
        const timeLeft = this.endTime - now;
        
        if (timeLeft <= 0) {
            this.onTimerEnd();
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        const timeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // Atualiza o elemento timer
        const timerElement = this.element.querySelector('.deal-timer');
        if (timerElement) {
            timerElement.innerHTML = `⏰ Termina em: <strong>${timeString}</strong>`;
            
            // Adiciona urgência quando restam menos de 1 hora
            if (timeLeft < 3600000) { // 1 hora
                timerElement.style.background = '#e74c3c';
                timerElement.style.animation = 'pulse 1s infinite';
            } else if (timeLeft < 7200000) { // 2 horas
                timerElement.style.background = '#f39c12';
            }
        }
        
        // Atualiza o timer principal da seção
        this.updateMainTimer();
    }
    
    updateMainTimer() {
        const mainTimerHours = document.querySelector('#hours');
        const mainTimerMinutes = document.querySelector('#minutes');  
        const mainTimerSeconds = document.querySelector('#seconds');
        
        if (mainTimerHours && mainTimerMinutes && mainTimerSeconds) {
            const now = new Date().getTime();
            const timeLeft = this.endTime - now;
            
            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                mainTimerHours.textContent = hours.toString().padStart(2, '0');
                mainTimerMinutes.textContent = minutes.toString().padStart(2, '0');
                mainTimerSeconds.textContent = seconds.toString().padStart(2, '0');
            }
        }
    }
    
    onTimerEnd() {
        console.log('⏰ Timer finalizado para oferta');
        this.stopTimer();
        
        // Marca oferta como expirada
        this.element.classList.add('expired');
        
        const timerElement = this.element.querySelector('.deal-timer');
        if (timerElement) {
            timerElement.innerHTML = '❌ <strong>OFERTA EXPIRADA</strong>';
            timerElement.style.background = '#95a5a6';
            timerElement.style.animation = 'none';
        }
        
        // Desabilita botão de compra
        const buyButton = this.element.querySelector('.btn-comprar');
        if (buyButton) {
            buyButton.textContent = '❌ OFERTA EXPIRADA';
            buyButton.style.background = '#95a5a6';
            buyButton.disabled = true;
            buyButton.style.cursor = 'not-allowed';
        }
        
        // Adiciona overlay de expirado
        this.addExpiredOverlay();
    }
    
    addExpiredOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'expired-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(149, 165, 166, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            backdrop-filter: blur(3px);
            z-index: 10;
        `;
        
        overlay.innerHTML = `
            <div style="
                background: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <h3 style="color: #e74c3c; margin: 0;">❌ OFERTA EXPIRADA</h3>
                <p style="color: #7f8c8d; margin: 10px 0 0 0;">Esta promoção chegou ao fim</p>
            </div>
        `;
        
        this.element.style.position = 'relative';
        this.element.appendChild(overlay);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isRunning = false;
    }
    
    // Método para estender timer (simula extensão de oferta)
    extendTimer(additionalMinutes) {
        this.endTime += additionalMinutes * 60 * 1000;
        console.log(`⏰ Timer estendido por ${additionalMinutes} minutos`);
        
        // Remove classe de expirado se existir
        this.element.classList.remove('expired');
        
        // Remove overlay se existir
        const overlay = this.element.querySelector('.expired-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Reabilita botão se estava desabilitado
        const buyButton = this.element.querySelector('.btn-comprar');
        if (buyButton && buyButton.disabled) {
            buyButton.textContent = '🛒 COMPRAR AGORA';
            buyButton.style.background = 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)';
            buyButton.disabled = false;
            buyButton.style.cursor = 'pointer';
        }
        
        // Reinicia timer se estava parado
        if (!this.isRunning) {
            this.startTimer();
        }
    }
}

// Gerenciador de Timers de Ofertas
class OfferTimerManager {
    constructor() {
        this.timers = [];
        this.init();
    }
    
    init() {
        console.log('🎯 Inicializando gerenciador de timers de ofertas');
        this.createTimersForOffers();
        this.setupGlobalTimer();
    }
    
    createTimersForOffers() {
        const offers = document.querySelectorAll('.flash-deal-item');
        
        offers.forEach((offer, index) => {
            // Define tempos diferentes para cada oferta (mais realista)
            const baseTime = new Date().getTime();
            const timeVariations = [
                2.5 * 60 * 60 * 1000, // 2h 30m para primeira oferta
                1.75 * 60 * 60 * 1000, // 1h 45m para segunda oferta
                3.25 * 60 * 60 * 1000  // 3h 15m para terceira oferta
            ];
            
            const endTime = baseTime + (timeVariations[index] || 2 * 60 * 60 * 1000);
            
            const timer = new OfferTimer(offer, endTime);
            this.timers.push(timer);
            
            console.log(`⏰ Timer criado para oferta ${index + 1}: termina em ${new Date(endTime).toLocaleTimeString()}`);
        });
    }
    
    setupGlobalTimer() {
        // Timer global que mostra o menor tempo restante
        setInterval(() => {
            this.updateGlobalTimer();
        }, 1000);
    }
    
    updateGlobalTimer() {
        const now = new Date().getTime();
        let shortestTime = Infinity;
        
        // Encontra o menor tempo restante entre todas as ofertas ativas
        this.timers.forEach(timer => {
            if (timer.isRunning) {
                const timeLeft = timer.endTime - now;
                if (timeLeft > 0 && timeLeft < shortestTime) {
                    shortestTime = timeLeft;
                }
            }
        });
        
        if (shortestTime === Infinity) {
            // Todas as ofertas expiraram
            this.onAllOffersExpired();
            return;
        }
        
        // Atualiza timer global
        const hours = Math.floor(shortestTime / (1000 * 60 * 60));
        const minutes = Math.floor((shortestTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((shortestTime % (1000 * 60)) / 1000);
        
        const globalHours = document.querySelector('#hours');
        const globalMinutes = document.querySelector('#minutes');
        const globalSeconds = document.querySelector('#seconds');
        
        if (globalHours && globalMinutes && globalSeconds) {
            globalHours.textContent = hours.toString().padStart(2, '0');
            globalMinutes.textContent = minutes.toString().padStart(2, '0');
            globalSeconds.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    onAllOffersExpired() {
        console.log('🔚 Todas as ofertas expiraram');
        
        // Mostra mensagem de fim das ofertas
        const dealsHeader = document.querySelector('.deals-header');
        if (dealsHeader) {
            dealsHeader.innerHTML = `
                <h2><i class="fa-solid fa-clock"></i> OFERTAS FINALIZADAS</h2>
                <p style="color: rgba(255,255,255,0.8); font-size: 1.1em; margin-top: 10px;">
                    Fique ligado para as próximas promoções relâmpago!
                </p>
            `;
        }
        
        // Para todos os timers
        this.timers.forEach(timer => timer.stopTimer());
    }
    
    // Método para criar nova oferta com timer
    addNewOffer(offerData, durationMinutes) {
        console.log('➕ Adicionando nova oferta com timer');
        
        const endTime = new Date().getTime() + (durationMinutes * 60 * 1000);
        
        // Cria elemento da oferta
        const offerElement = this.createOfferElement(offerData);
        
        // Adiciona ao grid
        const grid = document.querySelector('.flash-deals-grid');
        if (grid) {
            grid.appendChild(offerElement);
        }
        
        // Cria timer para nova oferta
        const timer = new OfferTimer(offerElement, endTime);
        this.timers.push(timer);
        
        return timer;
    }
    
    createOfferElement(data) {
        const offerDiv = document.createElement('div');
        offerDiv.className = 'flash-deal-item';
        offerDiv.innerHTML = `
            <div class="deal-badge">${data.desconto}% OFF</div>
            <img src="${data.imagem}" alt="${data.nome}">
            <h3>${data.nome}</h3>
            <div class="price-section">
                <span class="current-price">R$ ${data.preco.toFixed(2)}</span>
                <span class="original-price">R$ ${data.precoOriginal.toFixed(2)}</span>
            </div>
            <div class="deal-timer">⏰ Carregando...</div>
            <div class="stock-info">📦 ${data.quantidade} unidades disponíveis</div>
            <button class="btn-comprar">🛒 COMPRAR AGORA</button>
        `;
        
        return offerDiv;
    }
    
    // Métodos utilitários
    extendAllTimers(minutes) {
        console.log(`⏰ Estendendo todos os timers por ${minutes} minutos`);
        this.timers.forEach(timer => timer.extendTimer(minutes));
    }
    
    getActiveTimers() {
        return this.timers.filter(timer => timer.isRunning);
    }
    
    stopAllTimers() {
        console.log('⏸️ Parando todos os timers');
        this.timers.forEach(timer => timer.stopTimer());
    }
    
    restartAllTimers() {
        console.log('▶️ Reiniciando todos os timers');
        this.timers.forEach(timer => timer.startTimer());
    }
}

// Inicialização automática
let offerTimerManager;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🕒 Inicializando sistema de timers...');
        offerTimerManager = new OfferTimerManager();
        
        // Funções globais para debug
        window.offerTimers = {
            manager: offerTimerManager,
            extendAll: (minutes) => offerTimerManager.extendAllTimers(minutes),
            stopAll: () => offerTimerManager.stopAllTimers(),
            restartAll: () => offerTimerManager.restartAllTimers(),
            getActive: () => offerTimerManager.getActiveTimers()
        };
        
        console.log('✅ Sistema de timers ativo!');
        console.log('📋 Comandos debug: window.offerTimers');
        
    }, 2000);
});

// CSS adicional para animações de timer
const timerStyles = document.createElement('style');
timerStyles.innerHTML = `
    .expired {
        filter: grayscale(100%);
        opacity: 0.7;
    }
    
    .deal-timer {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .expired-overlay {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(timerStyles);

console.log('🕒 Sistema de timers de ofertas carregado!');