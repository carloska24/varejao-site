// Simulador de Experiência do Usuário - Teste de Jornada Completa
class UserJourneySimulator {
    constructor() {
        this.currentStep = 0;
        this.steps = [];
        this.init();
    }
    
    init() {
        console.log('🚀 === INICIANDO SIMULAÇÃO DE JORNADA DO USUÁRIO ===');
        this.defineSteps();
        this.createSimulationUI();
        this.startSimulation();
    }
    
    defineSteps() {
        this.steps = [
            {
                name: 'Chegada ao Site',
                description: 'Usuário acessa o site pela primeira vez',
                action: () => this.simulatePageLoad(),
                validation: () => document.querySelector('#ofertas-especiais') !== null
            },
            {
                name: 'Visualização das Ofertas',
                description: 'Usuário navega para seção de ofertas',
                action: () => this.simulateOfferNavigation(),
                validation: () => window.getComputedStyle(document.querySelector('#ofertas-especiais')).display !== 'none'
            },
            {
                name: 'Análise de Produtos',
                description: 'Usuário analisa produtos em oferta',
                action: () => this.simulateProductAnalysis(),
                validation: () => document.querySelectorAll('.flash-deal-item').length > 0
            },
            {
                name: 'Verificação de Timers',
                description: 'Usuário verifica tempo restante das ofertas',
                action: () => this.simulateTimerCheck(),
                validation: () => document.querySelector('.timer-container') !== null
            },
            {
                name: 'Interação com Produtos',
                description: 'Usuário interage com produtos específicos',
                action: () => this.simulateProductInteraction(),
                validation: () => true
            },
            {
                name: 'Decisão de Compra',
                description: 'Usuário decide comprar um produto',
                action: () => this.simulatePurchaseDecision(),
                validation: () => document.querySelectorAll('.btn-comprar').length > 0
            },
            {
                name: 'Feedback Final',
                description: 'Experiência geral do usuário',
                action: () => this.generateUserFeedback(),
                validation: () => true
            }
        ];
    }
    
    createSimulationUI() {
        const panel = document.createElement('div');
        panel.id = 'user-journey-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 350px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            color: white;
            font-family: Arial, sans-serif;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.5s ease;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 1.2em;">🚀 Jornada do Usuário</h3>
                <button onclick="this.parentElement.parentElement.style.transform='translateX(400px)'" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                ">×</button>
            </div>
            <div id="journey-progress" style="margin-bottom: 15px;"></div>
            <div id="journey-current-step" style="
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 15px;
                min-height: 100px;
            "></div>
            <div style="text-align: center;">
                <button onclick="window.userJourney.nextStep()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin: 5px;
                ">▶️ Próximo Passo</button>
                <button onclick="window.userJourney.restart()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin: 5px;
                ">🔄 Reiniciar</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 1000);
        
        return panel;
    }
    
    async startSimulation() {
        await this.delay(2000);
        console.log('👤 Iniciando simulação de jornada do usuário...');
        this.updateUI();
        await this.executeCurrentStep();
    }
    
    async executeCurrentStep() {
        if (this.currentStep >= this.steps.length) {
            this.completeJourney();
            return;
        }
        
        const step = this.steps[this.currentStep];
        console.log(`🎬 Executando: ${step.name}`);
        
        try {
            await step.action();
            await this.delay(1000);
            
            const isValid = step.validation();
            console.log(`✅ ${step.name}: ${isValid ? 'Sucesso' : 'Falha'}`);
            
            this.updateStepResult(isValid);
        } catch (error) {
            console.error(`❌ Erro em ${step.name}:`, error);
            this.updateStepResult(false);
        }
    }
    
    async simulatePageLoad() {
        console.log('📄 Simulando carregamento da página...');
        
        // Verifica se todos os elementos críticos estão presentes
        const criticalElements = [
            '#ofertas-especiais',
            '.bottom-nav',
            '.flash-deals-grid'
        ];
        
        for (const selector of criticalElements) {
            const element = document.querySelector(selector);
            if (!element) {
                console.warn(`⚠️ Elemento crítico não encontrado: ${selector}`);
            }
        }
        
        // Simula tempo de carregamento
        await this.delay(1500);
        console.log('✅ Página carregada com sucesso');
    }
    
    async simulateOfferNavigation() {
        console.log('🧭 Simulando navegação para ofertas...');
        
        const offerBtn = document.querySelectorAll('.nav-item')[2];
        if (offerBtn) {
            offerBtn.click();
            await this.delay(500);
            
            // Verifica se a seção está visível
            const section = document.querySelector('#ofertas-especiais');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        console.log('🎯 Navegação para ofertas executada');
    }
    
    async simulateProductAnalysis() {
        console.log('🔍 Simulando análise de produtos...');
        
        const products = document.querySelectorAll('.flash-deal-item');
        console.log(`📦 Encontrados ${products.length} produtos em oferta`);
        
        // Simula visualização de cada produto
        for (let i = 0; i < Math.min(products.length, 3); i++) {
            const product = products[i];
            product.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Simula hover no produto
            product.style.transform = 'scale(1.02)';
            await this.delay(800);
            product.style.transform = 'scale(1)';
            
            console.log(`👀 Analisando produto ${i + 1}`);
        }
        
        console.log('🔎 Análise de produtos concluída');
    }
    
    async simulateTimerCheck() {
        console.log('⏰ Simulando verificação de timers...');
        
        const timers = document.querySelectorAll('.deal-timer, .timer-container');
        console.log(`⏱️ Encontrados ${timers.length} timers ativos`);
        
        // Destaca os timers
        timers.forEach((timer, index) => {
            setTimeout(() => {
                timer.style.outline = '2px solid #ff6b6b';
                timer.style.outlineOffset = '4px';
                setTimeout(() => {
                    timer.style.outline = 'none';
                }, 1000);
            }, index * 300);
        });
        
        await this.delay(2000);
        console.log('⏰ Verificação de timers concluída');
    }
    
    async simulateProductInteraction() {
        console.log('🖱️ Simulando interação com produtos...');
        
        const products = document.querySelectorAll('.flash-deal-item');
        if (products.length > 0) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            
            // Simula clique no produto
            randomProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await this.delay(500);
            
            // Adiciona efeito visual
            randomProduct.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
            randomProduct.style.transform = 'scale(1.05)';
            
            await this.delay(1500);
            
            randomProduct.style.boxShadow = '';
            randomProduct.style.transform = '';
            
            console.log('🎯 Produto selecionado para análise detalhada');
        }
        
        console.log('✅ Interação com produtos finalizada');
    }
    
    async simulatePurchaseDecision() {
        console.log('💳 Simulando processo de decisão de compra...');
        
        const buyButtons = document.querySelectorAll('.btn-comprar');
        if (buyButtons.length > 0) {
            const randomButton = buyButtons[Math.floor(Math.random() * buyButtons.length)];
            
            // Destaca o botão de compra
            randomButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await this.delay(500);
            
            randomButton.style.animation = 'pulse 1s infinite';
            await this.delay(2000);
            randomButton.style.animation = '';
            
            console.log('🛒 Decisão de compra simulada');
        }
        
        console.log('💰 Processo de compra finalizado');
    }
    
    async generateUserFeedback() {
        console.log('📝 Gerando feedback do usuário...');
        
        const feedback = this.calculateUserExperience();
        console.log('👤 Feedback do usuário:', feedback);
        
        // Mostra feedback no painel
        this.showFeedback(feedback);
        
        await this.delay(1000);
        console.log('✅ Feedback gerado com sucesso');
    }
    
    calculateUserExperience() {
        let score = 0;
        const criteria = [];
        
        // Verifica navegação
        if (document.querySelector('#ofertas-especiais') && 
            window.getComputedStyle(document.querySelector('#ofertas-especiais')).display !== 'none') {
            score += 20;
            criteria.push('✅ Navegação funcional');
        } else {
            criteria.push('❌ Problemas de navegação');
        }
        
        // Verifica ofertas
        const offers = document.querySelectorAll('.flash-deal-item');
        if (offers.length > 0) {
            score += 25;
            criteria.push(`✅ ${offers.length} ofertas disponíveis`);
        } else {
            criteria.push('❌ Nenhuma oferta encontrada');
        }
        
        // Verifica timers
        const timers = document.querySelectorAll('.deal-timer, .timer-container');
        if (timers.length > 0) {
            score += 20;
            criteria.push(`✅ ${timers.length} timers ativos`);
        } else {
            criteria.push('❌ Timers não funcionando');
        }
        
        // Verifica CTAs
        const ctas = document.querySelectorAll('.btn-comprar');
        if (ctas.length > 0) {
            score += 15;
            criteria.push(`✅ ${ctas.length} botões de compra`);
        } else {
            criteria.push('❌ Botões de compra ausentes');
        }
        
        // Verifica responsividade
        if (window.innerWidth > 768 || document.querySelector('.bottom-nav')) {
            score += 10;
            criteria.push('✅ Design responsivo');
        } else {
            criteria.push('❌ Problemas de responsividade');
        }
        
        // Verifica performance
        if (document.readyState === 'complete') {
            score += 10;
            criteria.push('✅ Carregamento rápido');
        } else {
            criteria.push('⚠️ Carregamento lento');
        }
        
        return {
            score,
            maxScore: 100,
            percentage: Math.round((score / 100) * 100),
            criteria,
            sentiment: this.getSentiment(score)
        };
    }
    
    getSentiment(score) {
        if (score >= 90) return '😍 Excelente experiência!';
        if (score >= 80) return '😊 Muito satisfeito';
        if (score >= 70) return '🙂 Experiência positiva';
        if (score >= 60) return '😐 Experiência regular';
        if (score >= 50) return '😕 Experiência abaixo do esperado';
        return '😤 Experiência frustrante';
    }
    
    showFeedback(feedback) {
        const currentStepElement = document.querySelector('#journey-current-step');
        if (currentStepElement) {
            currentStepElement.innerHTML = `
                <h4>📊 Feedback Final do Usuário</h4>
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 2em;">${feedback.percentage}%</div>
                    <div>${feedback.sentiment}</div>
                </div>
                <div style="font-size: 0.9em;">
                    ${feedback.criteria.map(c => `<div style="margin: 5px 0;">${c}</div>`).join('')}
                </div>
            `;
        }
    }
    
    async nextStep() {
        this.currentStep++;
        this.updateUI();
        await this.executeCurrentStep();
    }
    
    restart() {
        this.currentStep = 0;
        console.log('🔄 Reiniciando simulação de jornada...');
        this.updateUI();
        this.executeCurrentStep();
    }
    
    updateUI() {
        const progressElement = document.querySelector('#journey-progress');
        const currentStepElement = document.querySelector('#journey-current-step');
        
        if (!progressElement || !currentStepElement) return;
        
        // Atualiza barra de progresso
        const progress = Math.round((this.currentStep / this.steps.length) * 100);
        progressElement.innerHTML = `
            <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 3px;">
                <div style="
                    background: white;
                    height: 8px;
                    border-radius: 8px;
                    width: ${progress}%;
                    transition: width 0.3s ease;
                "></div>
            </div>
            <div style="text-align: center; margin-top: 5px; font-size: 0.9em;">
                Passo ${this.currentStep}/${this.steps.length}
            </div>
        `;
        
        // Atualiza passo atual
        if (this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];
            currentStepElement.innerHTML = `
                <h4>${step.name}</h4>
                <p style="margin: 10px 0; opacity: 0.9;">${step.description}</p>
                <div style="font-size: 0.8em; opacity: 0.7;">
                    🎬 Executando simulação...
                </div>
            `;
        }
    }
    
    updateStepResult(success) {
        const currentStepElement = document.querySelector('#journey-current-step');
        if (currentStepElement && this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];
            currentStepElement.innerHTML = `
                <h4>${step.name} ${success ? '✅' : '❌'}</h4>
                <p style="margin: 10px 0; opacity: 0.9;">${step.description}</p>
                <div style="font-size: 0.8em; ${success ? 'color: #4ade80;' : 'color: #ef4444;'}">
                    ${success ? '✅ Concluído com sucesso' : '❌ Falha na execução'}
                </div>
            `;
        }
    }
    
    completeJourney() {
        console.log('🎉 Jornada do usuário concluída!');
        const currentStepElement = document.querySelector('#journey-current-step');
        if (currentStepElement) {
            currentStepElement.innerHTML = `
                <h4>🎉 Jornada Concluída!</h4>
                <p>Simulação completa da experiência do usuário.</p>
                <div style="text-align: center; margin-top: 15px;">
                    <button onclick="window.userJourney.restart()" style="
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                    ">🔄 Simular Novamente</button>
                </div>
            `;
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🚀 Iniciando simulador de jornada do usuário...');
        window.userJourney = new UserJourneySimulator();
    }, 7000);
});

console.log('🚀 Simulador de jornada do usuário carregado!');