// Debug Específico para Timers - Diagnóstico Completo
class TimerDebugSystem {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('🔍 === INICIANDO DEBUG DOS TIMERS ===');
        this.runDiagnostics();
        this.createDebugUI();
    }
    
    runDiagnostics() {
        console.log('🔍 Executando diagnósticos dos timers...');
        
        // 1. Verificar se elementos HTML existem
        this.checkHTMLElements();
        
        // 2. Verificar se scripts estão carregados
        this.checkScripts();
        
        // 3. Verificar se timers estão funcionando
        this.checkTimerFunctionality();
        
        // 4. Verificar timer principal
        this.checkMainTimer();
        
        // 5. Verificar timers individuais
        this.checkIndividualTimers();
        
        // 6. Testar sistema de notificações
        this.checkNotificationIntegration();
    }
    
    checkHTMLElements() {
        console.log('\n1️⃣ === VERIFICANDO ELEMENTOS HTML ===');
        
        // Timer principal
        const mainTimerElements = {
            hours: document.querySelector('#hours'),
            minutes: document.querySelector('#minutes'),
            seconds: document.querySelector('#seconds')
        };
        
        console.log('⏰ Timer Principal:');
        Object.entries(mainTimerElements).forEach(([key, element]) => {
            if (element) {
                console.log(`  ✅ ${key}: ENCONTRADO (valor: ${element.textContent})`);
            } else {
                console.log(`  ❌ ${key}: NÃO ENCONTRADO`);
            }
        });
        
        // Timers individuais
        const dealTimers = document.querySelectorAll('.deal-timer');
        console.log(`\n🎯 Timers Individuais: ${dealTimers.length} encontrados`);
        
        dealTimers.forEach((timer, index) => {
            console.log(`  Timer ${index + 1}: "${timer.textContent}"`);
            console.log(`    Elemento pai: ${timer.parentElement?.className || 'Sem classe'}`);
        });
        
        return {
            mainTimer: mainTimerElements,
            dealTimers: dealTimers
        };
    }
    
    checkScripts() {
        console.log('\n2️⃣ === VERIFICANDO SCRIPTS CARREGADOS ===');
        
        const scripts = [
            'timer-ofertas.js',
            'notificacoes-ofertas.js',
            'script.js'
        ];
        
        scripts.forEach(scriptName => {
            const scriptElement = document.querySelector(`script[src="${scriptName}"]`);
            if (scriptElement) {
                console.log(`  ✅ ${scriptName}: CARREGADO`);
            } else {
                console.log(`  ❌ ${scriptName}: NÃO ENCONTRADO`);
            }
        });
        
        // Verificar objetos globais
        console.log('\n🌐 Objetos Globais:');
        const globalObjects = [
            'OfferTimer',
            'OfferTimerManager', 
            'offerTimers',
            'notificationSystem'
        ];
        
        globalObjects.forEach(objName => {
            if (typeof window[objName] !== 'undefined') {
                console.log(`  ✅ ${objName}: DISPONÍVEL`);
            } else {
                console.log(`  ❌ ${objName}: NÃO DISPONÍVEL`);
            }
        });
    }
    
    checkTimerFunctionality() {
        console.log('\n3️⃣ === VERIFICANDO FUNCIONALIDADE DOS TIMERS ===');
        
        // Testar timer principal
        const mainTimer = this.testMainTimer();
        
        // Testar timers individuais
        const individualTimers = this.testIndividualTimers();
        
        // Resumo
        console.log('\n📊 RESUMO DA FUNCIONALIDADE:');
        console.log(`  Timer Principal: ${mainTimer ? '✅ FUNCIONANDO' : '❌ COM PROBLEMAS'}`);
        console.log(`  Timers Individuais: ${individualTimers ? '✅ FUNCIONANDO' : '❌ COM PROBLEMAS'}`);
        
        return { mainTimer, individualTimers };
    }
    
    testMainTimer() {
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        
        if (!hours || !minutes || !seconds) {
            console.log('  ❌ Timer principal: Elementos HTML ausentes');
            return false;
        }
        
        // Capturar valores iniciais
        const initialSeconds = parseInt(seconds.textContent);
        
        // Aguardar 2 segundos e verificar mudança
        return new Promise(resolve => {
            setTimeout(() => {
                const newSeconds = parseInt(seconds.textContent);
                const isWorking = newSeconds !== initialSeconds;
                
                console.log(`  Timer Principal: ${initialSeconds} → ${newSeconds}`);
                if (isWorking) {
                    console.log('  ✅ Timer principal: ATUALIZANDO');
                } else {
                    console.log('  ⚠️ Timer principal: NÃO ATUALIZANDO');
                }
                
                resolve(isWorking);
            }, 2100);
        });
    }
    
    testIndividualTimers() {
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        if (dealTimers.length === 0) {
            console.log('  ❌ Nenhum timer individual encontrado');
            return false;
        }
        
        // Capturar textos iniciais
        const initialTexts = Array.from(dealTimers).map(timer => timer.textContent);
        
        // Aguardar e verificar mudanças
        return new Promise(resolve => {
            setTimeout(() => {
                const newTexts = Array.from(dealTimers).map(timer => timer.textContent);
                const hasChanged = initialTexts.some((text, index) => text !== newTexts[index]);
                
                console.log('  📊 Estado dos Timers Individuais:');
                dealTimers.forEach((timer, index) => {
                    const changed = initialTexts[index] !== newTexts[index];
                    console.log(`    Timer ${index + 1}: ${changed ? '✅ ATUALIZANDO' : '⚠️ ESTÁTICO'}`);
                    console.log(`      Antes: "${initialTexts[index]}"`);
                    console.log(`      Depois: "${newTexts[index]}"`);
                });
                
                resolve(hasChanged);
            }, 2100);
        });
    }
    
    checkMainTimer() {
        console.log('\n4️⃣ === VERIFICANDO TIMER PRINCIPAL ===');
        
        const timerContainer = document.querySelector('.timer-container') || 
                              document.querySelector('.countdown-timer') ||
                              document.querySelector('#timer-principal');
                              
        if (!timerContainer) {
            console.log('  ⚠️ Container do timer principal não encontrado');
            console.log('  🔍 Procurando por elementos individuais...');
        }
        
        // Forçar atualização do timer principal
        this.forceMainTimerUpdate();
    }
    
    forceMainTimerUpdate() {
        console.log('🔧 Forçando atualização do timer principal...');
        
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes'); 
        const seconds = document.querySelector('#seconds');
        
        if (hours && minutes && seconds) {
            // Calcular tempo até meia-noite (24h de promoção)
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
            
            console.log(`  🕒 Timer atualizado: ${h}h ${m}m ${s}s`);
            
            // Iniciar intervalos se não existirem
            if (!window.mainTimerInterval) {
                this.startMainTimerInterval();
            }
        }
    }
    
    startMainTimerInterval() {
        console.log('🔄 Iniciando intervalo do timer principal...');
        
        window.mainTimerInterval = setInterval(() => {
            const hours = document.querySelector('#hours');
            const minutes = document.querySelector('#minutes'); 
            const seconds = document.querySelector('#seconds');
            
            if (!hours || !minutes || !seconds) return;
            
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
        }, 1000);
        
        console.log('✅ Timer principal ativo!');
    }
    
    checkIndividualTimers() {
        console.log('\n5️⃣ === VERIFICANDO TIMERS INDIVIDUAIS ===');
        
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        if (dealTimers.length === 0) {
            console.log('  ❌ Nenhum timer de oferta encontrado');
            return;
        }
        
        // Criar timers funcionais para cada oferta
        dealTimers.forEach((timerElement, index) => {
            this.createFunctionalTimer(timerElement, index);
        });
    }
    
    createFunctionalTimer(timerElement, index) {
        // Tempos diferentes para cada oferta (em horas)
        const offerDurations = [2.5, 1.75, 3.25]; // 2h30m, 1h45m, 3h15m
        const duration = offerDurations[index] || 2; // Padrão 2 horas
        
        const endTime = new Date().getTime() + (duration * 60 * 60 * 1000);
        
        // Limpar intervalos existentes
        if (timerElement.timerInterval) {
            clearInterval(timerElement.timerInterval);
        }
        
        // Função de atualização
        const updateTimer = () => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            
            if (timeLeft <= 0) {
                timerElement.innerHTML = '⏰ <strong style="color: #e74c3c;">EXPIRADO!</strong>';
                timerElement.style.background = '#e74c3c';
                timerElement.style.animation = 'pulse 1s infinite';
                
                if (timerElement.timerInterval) {
                    clearInterval(timerElement.timerInterval);
                }
                
                // Notificação de expiração
                if (window.notificationSystem) {
                    window.notificationSystem.show(
                        '⏰', 
                        `Oferta ${index + 1} expirou!`, 
                        'error'
                    );
                }
                return;
            }
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const timeString = `${hours}h ${minutes}m ${seconds}s`;
            timerElement.innerHTML = `⏰ Termina em: <strong>${timeString}</strong>`;
            
            // Estados de urgência
            if (timeLeft < 1800000) { // 30 minutos
                timerElement.style.background = '#e74c3c';
                timerElement.style.color = 'white';
                timerElement.style.animation = 'pulse 1s infinite';
            } else if (timeLeft < 3600000) { // 1 hora
                timerElement.style.background = '#f39c12';
                timerElement.style.color = 'white';
                timerElement.style.animation = 'none';
            } else {
                timerElement.style.background = '#27ae60';
                timerElement.style.color = 'white';
                timerElement.style.animation = 'none';
            }
        };
        
        // Atualizar imediatamente
        updateTimer();
        
        // Iniciar intervalo
        timerElement.timerInterval = setInterval(updateTimer, 1000);
        
        console.log(`  ✅ Timer ${index + 1} iniciado (${duration}h de duração)`);
    }
    
    checkNotificationIntegration() {
        console.log('\n6️⃣ === VERIFICANDO INTEGRAÇÃO COM NOTIFICAÇÕES ===');
        
        if (typeof window.notificationSystem !== 'undefined') {
            console.log('  ✅ Sistema de notificações disponível');
            
            // Teste de notificação
            window.notificationSystem.show(
                '🔧', 
                'Debug: Testando integração com timers', 
                'info'
            );
        } else {
            console.log('  ⚠️ Sistema de notificações não encontrado');
        }
    }
    
    createDebugUI() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'timer-debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 300px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            border: 2px solid #00ff00;
            max-height: 400px;
            overflow-y: auto;
        `;
        
        debugPanel.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <strong>🔍 DEBUG TIMERS</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #ff0000;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    padding: 2px 6px;
                ">×</button>
            </div>
            <div id="timer-debug-content">
                <div>⏰ Iniciando diagnósticos...</div>
                <div style="margin-top: 10px;">
                    <button onclick="window.timerDebug.forceMainTimerUpdate()" style="
                        background: #007acc;
                        color: white;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 5px 10px;
                        margin: 2px;
                        font-size: 10px;
                    ">🔧 Corrigir Timer Principal</button>
                </div>
                <div>
                    <button onclick="window.timerDebug.checkIndividualTimers()" style="
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 5px 10px;
                        margin: 2px;
                        font-size: 10px;
                    ">🎯 Corrigir Timers Individuais</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(debugPanel);
        
        // Atualizar conteúdo a cada 5 segundos
        setInterval(() => {
            this.updateDebugUI();
        }, 5000);
    }
    
    updateDebugUI() {
        const content = document.querySelector('#timer-debug-content');
        if (!content) return;
        
        const hours = document.querySelector('#hours')?.textContent || 'N/A';
        const minutes = document.querySelector('#minutes')?.textContent || 'N/A';
        const seconds = document.querySelector('#seconds')?.textContent || 'N/A';
        
        const dealTimers = document.querySelectorAll('.deal-timer');
        
        content.innerHTML = `
            <div><strong>⏰ Timer Principal:</strong></div>
            <div>  ${hours}h ${minutes}m ${seconds}s</div>
            <div style="margin-top: 10px;"><strong>🎯 Timers Individuais (${dealTimers.length}):</strong></div>
            ${Array.from(dealTimers).map((timer, i) => 
                `<div style="font-size: 10px;">  ${i+1}: ${timer.textContent.substring(0, 30)}...</div>`
            ).join('')}
            <div style="margin-top: 10px;">
                <button onclick="window.timerDebug.forceMainTimerUpdate()" style="
                    background: #007acc;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    padding: 5px 10px;
                    margin: 2px;
                    font-size: 10px;
                ">🔧 Corrigir Timer Principal</button>
            </div>
            <div>
                <button onclick="window.timerDebug.checkIndividualTimers()" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    padding: 5px 10px;
                    margin: 2px;
                    font-size: 10px;
                ">🎯 Corrigir Timers Individuais</button>
            </div>
        `;
    }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🔍 Iniciando sistema de debug de timers...');
        window.timerDebug = new TimerDebugSystem();
    }, 2000);
});

// Função rápida para debug
function debugTimers() {
    if (window.timerDebug) {
        window.timerDebug.runDiagnostics();
    } else {
        window.timerDebug = new TimerDebugSystem();
    }
}

console.log('🔍 Sistema de debug de timers carregado! Use debugTimers() para iniciar.');