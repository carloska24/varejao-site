// Sistema de Notificações para Ofertas
class OfferNotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }
    
    init() {
        this.createNotificationContainer();
        console.log('🔔 Sistema de notificações de ofertas inicializado');
    }
    
    createNotificationContainer() {
        this.container = document.createElement('div');
        this.container.id = 'offer-notifications';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
            width: 100%;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }
    
    showNotification(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `offer-notification ${type}`;
        
        const notificationId = Date.now() + Math.random();
        notification.dataset.id = notificationId;
        
        notification.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-left: 5px solid ${this.getColorForType(type)};
            animation: slideInRight 0.5s ease-out;
            pointer-events: auto;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 2em;">${this.getIconForType(type)}</div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.1em;">${title}</h4>
                    <p style="margin: 0; color: #7f8c8d; font-size: 0.95em;">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.2em;
                    color: #bdc3c7;
                    cursor: pointer;
                    padding: 5px;
                ">×</button>
            </div>
        `;
        
        // Efeitos hover
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateX(-10px)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateX(0)';
        });
        
        this.container.appendChild(notification);
        this.notifications.push(notificationId);
        
        // Auto-remove após duração especificada
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notificationId);
            }, duration);
        }
        
        return notificationId;
    }
    
    removeNotification(id) {
        const notification = document.querySelector(`[data-id="${id}"]`);
        if (notification) {
            notification.style.animation = 'slideOutRight 0.3s ease-in-out forwards';
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(nId => nId !== id);
            }, 300);
        }
    }
    
    getColorForType(type) {
        const colors = {
            'urgent': '#e74c3c',
            'warning': '#f39c12',
            'info': '#3498db',
            'success': '#27ae60',
            'expired': '#95a5a6'
        };
        return colors[type] || '#3498db';
    }
    
    getIconForType(type) {
        const icons = {
            'urgent': '🚨',
            'warning': '⚠️',
            'info': 'ℹ️',
            'success': '✅',
            'expired': '❌'
        };
        return icons[type] || 'ℹ️';
    }
    
    // Métodos específicos para ofertas
    notifyUrgent(offerName, timeLeft) {
        return this.showNotification(
            'urgent',
            'Oferta Terminando!',
            `${offerName} termina em ${timeLeft}. Aproveite agora!`,
            8000
        );
    }
    
    notifyWarning(offerName, timeLeft) {
        return this.showNotification(
            'warning',
            'Últimas Horas!',
            `${offerName} termina em ${timeLeft}`,
            6000
        );
    }
    
    notifyExpired(offerName) {
        return this.showNotification(
            'expired',
            'Oferta Expirada',
            `${offerName} não está mais disponível`,
            4000
        );
    }
    
    notifyNewOffer(offerName, discount) {
        return this.showNotification(
            'success',
            'Nova Oferta!',
            `${offerName} com ${discount}% de desconto!`,
            7000
        );
    }
    
    // Limpa todas as notificações
    clearAll() {
        this.notifications.forEach(id => this.removeNotification(id));
    }
}

// Integração com sistema de timers
class TimerNotificationIntegration {
    constructor(timerManager, notificationSystem) {
        this.timerManager = timerManager;
        this.notifications = notificationSystem;
        this.notifiedOffers = new Set();
        this.init();
    }
    
    init() {
        console.log('🔗 Integrando timers com notificações');
        this.startMonitoring();
    }
    
    startMonitoring() {
        setInterval(() => {
            this.checkOfferStatus();
        }, 30000); // Verifica a cada 30 segundos
    }
    
    checkOfferStatus() {
        const activeTimers = this.timerManager.getActiveTimers();
        
        activeTimers.forEach(timer => {
            const now = new Date().getTime();
            const timeLeft = timer.endTime - now;
            const offerName = timer.element.querySelector('h3')?.textContent || 'Oferta';
            
            const offerKey = `${offerName}_${timer.endTime}`;
            
            // Notificação urgente - menos de 30 minutos
            if (timeLeft < 30 * 60 * 1000 && timeLeft > 0) {
                if (!this.notifiedOffers.has(`${offerKey}_urgent`)) {
                    const minutes = Math.floor(timeLeft / (1000 * 60));
                    this.notifications.notifyUrgent(offerName, `${minutes} minutos`);
                    this.notifiedOffers.add(`${offerKey}_urgent`);
                }
            }
            // Notificação de aviso - menos de 2 horas
            else if (timeLeft < 2 * 60 * 60 * 1000 && timeLeft > 30 * 60 * 1000) {
                if (!this.notifiedOffers.has(`${offerKey}_warning`)) {
                    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    this.notifications.notifyWarning(offerName, `${hours}h ${minutes}m`);
                    this.notifiedOffers.add(`${offerKey}_warning`);
                }
            }
        });
    }
    
    onOfferExpired(offerName) {
        this.notifications.notifyExpired(offerName);
    }
    
    onNewOffer(offerName, discount) {
        this.notifications.notifyNewOffer(offerName, discount);
    }
}

// CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.innerHTML = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .offer-notification:hover {
        box-shadow: 0 15px 40px rgba(0,0,0,0.3) !important;
    }
    
    .offer-notification.urgent {
        animation: slideInRight 0.5s ease-out, urgentGlow 2s ease-in-out infinite;
    }
    
    @keyframes urgentGlow {
        0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        50% { box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4); }
    }
    
    /* Responsivo para mobile */
    @media (max-width: 768px) {
        #offer-notifications {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .offer-notification {
            margin-bottom: 10px;
            padding: 15px;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Inicialização automática
let notificationSystem;
let timerNotificationIntegration;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Inicializa sistema de notificações
        notificationSystem = new OfferNotificationSystem();
        
        // Aguarda o timer manager estar pronto
        const checkTimerManager = setInterval(() => {
            if (window.offerTimers && window.offerTimers.manager) {
                timerNotificationIntegration = new TimerNotificationIntegration(
                    window.offerTimers.manager,
                    notificationSystem
                );
                
                // Funções globais para teste
                window.notificationSystem = notificationSystem;
                
                console.log('🔔 Sistema de notificações integrado com timers!');
                console.log('📋 Teste: window.notificationSystem.notifyUrgent("Banana", "30 min")');
                
                clearInterval(checkTimerManager);
            }
        }, 500);
        
    }, 3000);
});

console.log('🔔 Sistema de notificações de ofertas carregado!');