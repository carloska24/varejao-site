// 📚 GUIA INTERATIVO DE DEBUG DO VAREJÃO
// Como usar todas as ferramentas de debug e validação

class GuiaDebugInterativo {
    constructor() {
        this.currentTool = 0;
        this.tools = [];
        this.init();
    }
    
    init() {
        console.log('📚 === GUIA DE DEBUG VAREJÃO ===');
        this.defineTools();
        this.createGuideUI();
        this.showWelcome();
    }
    
    defineTools() {
        this.tools = [
            {
                name: '🚀 Jornada do Usuário',
                description: 'Simula a experiência completa de um cliente visitando o site',
                location: 'Painel flutuante no canto superior direito',
                howToUse: [
                    '1. Aguarde o painel aparecer automaticamente após 7 segundos',
                    '2. Clique no botão "▶️ Próximo Passo" para avançar',
                    '3. Observe a simulação em tempo real',
                    '4. Veja o feedback final com pontuação',
                    '5. Use "🔄 Reiniciar" para simular novamente'
                ],
                commands: [
                    'window.userJourney.restart() // Reinicia simulação',
                    'window.userJourney.nextStep() // Avança um passo'
                ],
                demo: () => this.demoUserJourney()
            },
            {
                name: '🎯 Validação UX',
                description: 'Testa automaticamente 30+ aspectos de experiência do usuário',
                location: 'Painel flutuante no canto inferior esquerdo',
                howToUse: [
                    '1. Aparece automaticamente após 5 segundos',
                    '2. Veja a pontuação geral (0-100%)',
                    '3. Clique em "🔄 Executar Novamente" para re-testar',
                    '4. Use "📊 Relatório" para ver análise completa',
                    '5. Observe as categorias: Navegação, Ofertas, Timers, etc.'
                ],
                commands: [
                    'window.uxValidator.runAllTests() // Executa todos os testes',
                    'window.uxValidator.generateReport() // Gera relatório completo'
                ],
                demo: () => this.demoUXValidation()
            },
            {
                name: '🔔 Sistema de Notificações',
                description: 'Notificações automáticas sobre ofertas expirando',
                location: 'Canto superior direito da tela',
                howToUse: [
                    '1. Notificações aparecem automaticamente',
                    '2. Tipos: Alerta de expiração, ofertas urgentes',
                    '3. Desaparecem automaticamente após 5 segundos',
                    '4. Clique no "×" para fechar manualmente',
                    '5. Animações suaves de entrada e saída'
                ],
                commands: [
                    'window.notificationSystem.show("🔥", "Oferta expirando!", "warning")',
                    'window.notificationSystem.clearAll() // Remove todas'
                ],
                demo: () => this.demoNotifications()
            },
            {
                name: '⏰ Timers das Ofertas',
                description: 'Sistema de contagem regressiva para cada oferta',
                location: 'Dentro de cada card de oferta',
                howToUse: [
                    '1. Cada oferta tem seu próprio timer',
                    '2. Cores mudam conforme urgência:',
                    '   - Verde: Tempo normal',
                    '   - Amarelo: Atenção (< 1 hora)',
                    '   - Vermelho: Crítico (< 30 min)',
                    '3. Atualização automática a cada segundo',
                    '4. Notificações quando expira'
                ],
                commands: [
                    'window.offerTimers // Vê todos os timers',
                    'window.offerTimers.simulateExpiry("offer1") // Simula expiração'
                ],
                demo: () => this.demoTimers()
            },
            {
                name: '🔧 Console de Debug',
                description: 'Comandos avançados no console do navegador',
                location: 'F12 > Console',
                howToUse: [
                    '1. Pressione F12 para abrir DevTools',
                    '2. Vá na aba "Console"',
                    '3. Digite os comandos listados',
                    '4. Pressione Enter para executar',
                    '5. Veja logs coloridos e detalhados'
                ],
                commands: [
                    'debugOfertas() // Analisa todas as ofertas',
                    'testeNavegacao() // Testa sistema de navegação',
                    'debugVisual() // Análise visual completa',
                    'debugTimer() // Debug específico de timers'
                ],
                demo: () => this.demoConsole()
            },
            {
                name: '📊 Painel de Marketing',
                description: 'Dashboard para equipe de marketing',
                location: 'Botão flutuante azul no canto inferior direito',
                howToUse: [
                    '1. Clique no botão flutuante azul',
                    '2. Abas disponíveis:',
                    '   - 📈 Analytics: Métricas de performance',
                    '   - 🎯 Campanhas: Criar/editar promoções',
                    '   - 🔔 Notificações: Push marketing',
                    '3. Use formulários para configurar',
                    '4. Veja estatísticas em tempo real'
                ],
                commands: [
                    'document.querySelector("#fab-marketing").click() // Abre painel',
                    'mostrarMetricas() // Exibe métricas detalhadas'
                ],
                demo: () => this.demoMarketingPanel()
            }
        ];
    }
    
    createGuideUI() {
        const panel = document.createElement('div');
        panel.id = 'debug-guide-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-height: 600px;
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            border-radius: 20px;
            padding: 25px;
            color: white;
            font-family: Arial, sans-serif;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            z-index: 10000;
            overflow-y: auto;
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
            transition: all 0.5s ease;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.5em;">📚 Guia de Debug</h2>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                    font-size: 1.2em;
                ">×</button>
            </div>
            
            <div id="guide-navigation" style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                padding: 10px;
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
            ">
                <button onclick="window.debugGuide.previousTool()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 15px;
                    cursor: pointer;
                ">← Anterior</button>
                
                <span id="tool-counter" style="
                    align-self: center;
                    font-weight: bold;
                ">1/6</span>
                
                <button onclick="window.debugGuide.nextTool()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 15px;
                    cursor: pointer;
                ">Próximo →</button>
            </div>
            
            <div id="guide-content" style="min-height: 300px;">
                <!-- Conteúdo dinâmico -->
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.debugGuide.demoCurrentTool()" style="
                    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                    border: none;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    margin: 5px;
                ">🎬 Ver Demonstração</button>
                
                <button onclick="window.debugGuide.showAllCommands()" style="
                    background: linear-gradient(45deg, #4834d4, #6c5ce7);
                    border: none;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    margin: 5px;
                ">📝 Todos os Comandos</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Anima entrada
        setTimeout(() => {
            panel.style.transform = 'translate(-50%, -50%) scale(1)';
            panel.style.opacity = '1';
        }, 100);
        
        return panel;
    }
    
    showWelcome() {
        const content = document.querySelector('#guide-content');
        if (!content) return;
        
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 3em; margin: 0;">🎮</h1>
                <h2 style="margin: 10px 0;">Bem-vindo ao Debug Center!</h2>
                <p style="opacity: 0.9; line-height: 1.6;">
                    Este guia te ensina a usar todas as ferramentas de debug 
                    e validação do sistema de flash sales do Varejão.
                </p>
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                ">
                    <h4>🎯 O que você aprenderá:</h4>
                    <ul style="text-align: left; line-height: 1.8;">
                        <li>Como usar o simulador de jornada do usuário</li>
                        <li>Como interpretar a validação UX automática</li>
                        <li>Como monitorar notificações e timers</li>
                        <li>Como usar comandos de debug no console</li>
                        <li>Como acessar o painel de marketing</li>
                    </ul>
                </div>
                <p style="font-size: 0.9em; opacity: 0.8;">
                    Use os botões de navegação para percorrer as ferramentas →
                </p>
            </div>
        `;
        
        this.updateCounter();
    }
    
    showCurrentTool() {
        if (this.currentTool >= this.tools.length) return;
        
        const tool = this.tools[this.currentTool];
        const content = document.querySelector('#guide-content');
        if (!content) return;
        
        content.innerHTML = `
            <div>
                <h3 style="margin: 0 0 15px 0; font-size: 1.4em;">${tool.name}</h3>
                
                <p style="opacity: 0.9; margin-bottom: 20px;">
                    ${tool.description}
                </p>
                
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                ">
                    <h4 style="margin: 0 0 10px 0;">📍 Localização:</h4>
                    <p style="margin: 0; opacity: 0.9;">${tool.location}</p>
                </div>
                
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                ">
                    <h4 style="margin: 0 0 10px 0;">🔧 Como usar:</h4>
                    <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
                        ${tool.howToUse.map(step => `<li style="margin: 5px 0;">${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div style="
                    background: rgba(0,0,0,0.2);
                    padding: 15px;
                    border-radius: 10px;
                    font-family: monospace;
                    margin-bottom: 15px;
                ">
                    <h4 style="margin: 0 0 10px 0;">💻 Comandos úteis:</h4>
                    ${tool.commands.map(cmd => 
                        `<div style="
                            background: rgba(255,255,255,0.1);
                            padding: 8px;
                            margin: 5px 0;
                            border-radius: 5px;
                            font-size: 0.85em;
                            cursor: pointer;
                        " onclick="navigator.clipboard.writeText('${cmd}')">${cmd}</div>`
                    ).join('')}
                    <p style="font-size: 0.8em; opacity: 0.7; margin: 10px 0 0 0;">
                        💡 Clique nos comandos para copiar
                    </p>
                </div>
            </div>
        `;
        
        this.updateCounter();
    }
    
    nextTool() {
        this.currentTool = Math.min(this.currentTool + 1, this.tools.length - 1);
        this.showCurrentTool();
    }
    
    previousTool() {
        this.currentTool = Math.max(this.currentTool - 1, 0);
        if (this.currentTool === 0) {
            this.showWelcome();
        } else {
            this.showCurrentTool();
        }
    }
    
    updateCounter() {
        const counter = document.querySelector('#tool-counter');
        if (counter) {
            counter.textContent = `${this.currentTool === 0 ? 'Início' : this.currentTool}/${this.tools.length}`;
        }
    }
    
    demoCurrentTool() {
        if (this.currentTool === 0 || this.currentTool > this.tools.length) {
            this.showAllDemo();
            return;
        }
        
        const tool = this.tools[this.currentTool - 1];
        console.log(`🎬 Demonstrando: ${tool.name}`);
        tool.demo();
    }
    
    // Demonstrações específicas
    demoUserJourney() {
        console.log('🚀 === DEMO: JORNADA DO USUÁRIO ===');
        if (window.userJourney) {
            window.userJourney.restart();
            console.log('✅ Simulação de jornada reiniciada!');
            console.log('👀 Observe o painel no canto superior direito');
        } else {
            console.warn('⚠️ Sistema de jornada ainda não carregado. Aguarde alguns segundos.');
        }
    }
    
    demoUXValidation() {
        console.log('🎯 === DEMO: VALIDAÇÃO UX ===');
        if (window.uxValidator) {
            window.uxValidator.runAllTests();
            console.log('✅ Testes UX executados!');
            console.log('👀 Observe o painel no canto inferior esquerdo');
        } else {
            console.warn('⚠️ Sistema de validação ainda não carregado. Aguarde alguns segundos.');
        }
    }
    
    demoNotifications() {
        console.log('🔔 === DEMO: NOTIFICAÇÕES ===');
        if (window.notificationSystem) {
            window.notificationSystem.show('🔥', 'Demo: Oferta expirando em 5 minutos!', 'warning');
            setTimeout(() => {
                window.notificationSystem.show('✅', 'Demo: Sistema funcionando perfeitamente!', 'success');
            }, 2000);
            console.log('✅ Notificações de demo exibidas!');
        } else {
            console.warn('⚠️ Sistema de notificações ainda não carregado.');
        }
    }
    
    demoTimers() {
        console.log('⏰ === DEMO: TIMERS ===');
        const timers = document.querySelectorAll('.deal-timer, .timer-container');
        console.log(`🕰️ Encontrados ${timers.length} timers ativos`);
        
        timers.forEach((timer, index) => {
            setTimeout(() => {
                timer.style.outline = '3px solid #ff6b6b';
                timer.style.outlineOffset = '5px';
                timer.style.animation = 'pulse 1s infinite';
                
                setTimeout(() => {
                    timer.style.outline = 'none';
                    timer.style.animation = 'none';
                }, 2000);
            }, index * 500);
        });
        
        if (window.offerTimers) {
            console.log('🎯 Timers gerenciados:', window.offerTimers);
        }
    }
    
    demoConsole() {
        console.log('🔧 === DEMO: CONSOLE DE DEBUG ===');
        console.log('💡 Pressione F12 para abrir o DevTools');
        console.log('📝 Comandos disponíveis:');
        console.log('  debugOfertas() - Analisa ofertas');
        console.log('  testeNavegacao() - Testa navegação');
        console.log('  debugVisual() - Análise visual');
        console.log('  debugTimer() - Debug de timers');
        
        // Executa alguns comandos automaticamente
        if (typeof debugOfertas === 'function') {
            console.log('🎬 Executando debugOfertas():');
            debugOfertas();
        }
    }
    
    demoMarketingPanel() {
        console.log('📊 === DEMO: PAINEL DE MARKETING ===');
        const fab = document.querySelector('#fab-marketing');
        if (fab) {
            // Destaca o botão
            fab.style.animation = 'pulse 2s infinite';
            fab.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                fab.click();
                fab.style.animation = 'none';
                fab.style.transform = 'scale(1)';
                console.log('✅ Painel de marketing aberto!');
            }, 3000);
            
            console.log('👀 Observe o botão flutuante azul destacado');
        } else {
            console.warn('⚠️ Botão de marketing não encontrado');
        }
    }
    
    showAllDemo() {
        console.log('🎪 === DEMONSTRAÇÃO COMPLETA ===');
        console.log('🚀 Executando todas as demonstrações...');
        
        this.demoUserJourney();
        setTimeout(() => this.demoUXValidation(), 2000);
        setTimeout(() => this.demoNotifications(), 4000);
        setTimeout(() => this.demoTimers(), 6000);
        setTimeout(() => this.demoMarketingPanel(), 8000);
        
        console.log('✨ Todas as demonstrações iniciadas!');
    }
    
    showAllCommands() {
        console.log('\n📝 === TODOS OS COMANDOS DE DEBUG ===');
        console.log('\n🚀 JORNADA DO USUÁRIO:');
        console.log('  window.userJourney.restart()');
        console.log('  window.userJourney.nextStep()');
        
        console.log('\n🎯 VALIDAÇÃO UX:');
        console.log('  window.uxValidator.runAllTests()');
        console.log('  window.uxValidator.generateReport()');
        
        console.log('\n🔔 NOTIFICAÇÕES:');
        console.log('  window.notificationSystem.show("🔥", "Mensagem", "warning")');
        console.log('  window.notificationSystem.clearAll()');
        
        console.log('\n⏰ TIMERS:');
        console.log('  window.offerTimers');
        console.log('  window.offerTimers.simulateExpiry("offer1")');
        
        console.log('\n🔧 DEBUG GERAL:');
        console.log('  debugOfertas()');
        console.log('  testeNavegacao()');
        console.log('  debugVisual()');
        console.log('  debugTimer()');
        
        console.log('\n📊 MARKETING:');
        console.log('  document.querySelector("#fab-marketing").click()');
        console.log('  mostrarMetricas()');
        
        console.log('\n💡 Dica: Copie e cole estes comandos no console (F12)');
    }
}

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('📚 Carregando guia de debug...');
        window.debugGuide = new GuiaDebugInterativo();
    }, 3000);
});

// Comando rápido para abrir o guia
function abrirGuiaDebug() {
    if (window.debugGuide) {
        window.debugGuide = new GuiaDebugInterativo();
    } else {
        window.debugGuide = new GuiaDebugInterativo();
    }
}

console.log('📚 Guia de debug carregado! Use abrirGuiaDebug() para iniciar.');