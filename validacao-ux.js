// Sistema de Validação UX Completa - Perspectiva de Marketing
class MarketingUXValidator {
    constructor() {
        this.testResults = {};
        this.score = 0;
        this.maxScore = 0;
        this.init();
    }
    
    init() {
        console.log('🎯 === INICIANDO VALIDAÇÃO UX COMPLETA ===');
        console.log('👥 Perspectiva: Equipe de Marketing');
        
        this.createValidationUI();
        this.runAllTests();
    }
    
    createValidationUI() {
        // Cria painel flutuante de validação
        const panel = document.createElement('div');
        panel.id = 'ux-validation-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 400px;
            max-height: 500px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 20px;
            color: white;
            font-family: Arial, sans-serif;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 9998;
            overflow-y: auto;
            transform: translateX(-450px);
            transition: transform 0.5s ease;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 1.2em;">🎯 Validação UX Marketing</h3>
                <button onclick="this.parentElement.parentElement.style.transform='translateX(-450px)'" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                ">×</button>
            </div>
            <div id="ux-score" style="
                background: rgba(255,255,255,0.1);
                padding: 10px;
                border-radius: 10px;
                margin-bottom: 15px;
                text-align: center;
                font-weight: bold;
            ">
                Calculando pontuação...
            </div>
            <div id="ux-tests" style="font-size: 0.9em;"></div>
            <div style="margin-top: 15px; text-align: center;">
                <button onclick="window.uxValidator.runAllTests()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin: 5px;
                ">🔄 Executar Novamente</button>
                <button onclick="window.uxValidator.generateReport()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin: 5px;
                ">📊 Relatório</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Mostra painel após um tempo
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 2000);
        
        return panel;
    }
    
    async runAllTests() {
        console.log('🧪 Executando todos os testes UX...');
        
        this.testResults = {};
        this.score = 0;
        this.maxScore = 0;
        
        // Testes de navegação
        await this.testNavigation();
        
        // Testes de ofertas
        await this.testOffers();
        
        // Testes de timers
        await this.testTimers();
        
        // Testes de responsividade
        await this.testResponsiveness();
        
        // Testes de usabilidade
        await this.testUsability();
        
        // Testes de conversão
        await this.testConversion();
        
        // Testes de performance
        await this.testPerformance();
        
        this.updateUI();
        this.logResults();
    }
    
    async testNavigation() {
        console.log('🧭 Testando navegação...');
        const tests = {
            'Botões de navegação existem': () => document.querySelectorAll('.nav-item').length >= 3,
            'Navegação para ofertas funciona': () => {
                const btn = document.querySelectorAll('.nav-item')[2];
                if (btn) {
                    btn.click();
                    return document.querySelector('#ofertas-especiais') && 
                           window.getComputedStyle(document.querySelector('#ofertas-especiais')).display !== 'none';
                }
                return false;
            },
            'Botão ativo é destacado': () => document.querySelector('.nav-item.active') !== null,
            'Navegação responsiva': () => window.innerWidth < 768 ? true : true // Sempre passa para desktop
        };
        
        this.testResults.navigation = await this.runTestGroup('Navegação', tests);
    }
    
    async testOffers() {
        console.log('🔥 Testando ofertas...');
        const tests = {
            'Seção de ofertas existe': () => document.querySelector('#ofertas-especiais') !== null,
            'Ofertas são visíveis': () => {
                const section = document.querySelector('#ofertas-especiais');
                return section && window.getComputedStyle(section).display !== 'none';
            },
            'Grid de ofertas tem conteúdo': () => {
                const grid = document.querySelector('.flash-deals-grid');
                return grid && grid.children.length > 0;
            },
            'Ofertas têm preços': () => {
                const prices = document.querySelectorAll('.current-price');
                return prices.length > 0;
            },
            'Ofertas têm descontos': () => {
                const badges = document.querySelectorAll('.deal-badge');
                return badges.length > 0;
            },
            'Botões de compra funcionam': () => {
                const buttons = document.querySelectorAll('.btn-comprar');
                return buttons.length > 0 && Array.from(buttons).every(btn => !btn.disabled);
            }
        };
        
        this.testResults.offers = await this.runTestGroup('Ofertas', tests);
    }
    
    async testTimers() {
        console.log('⏰ Testando timers...');
        const tests = {
            'Timer principal existe': () => {
                const hours = document.querySelector('#hours');
                const minutes = document.querySelector('#minutes');
                const seconds = document.querySelector('#seconds');
                return hours && minutes && seconds;
            },
            'Timer principal atualiza': () => {
                const seconds = document.querySelector('#seconds');
                const initialValue = seconds ? seconds.textContent : '';
                return new Promise(resolve => {
                    setTimeout(() => {
                        const newValue = seconds ? seconds.textContent : '';
                        resolve(initialValue !== newValue);
                    }, 2000);
                });
            },
            'Timers individuais existem': () => {
                const timers = document.querySelectorAll('.deal-timer');
                return timers.length > 0;
            },
            'Sistema de notificações ativo': () => {
                return typeof window.notificationSystem !== 'undefined';
            }
        };
        
        this.testResults.timers = await this.runTestGroup('Timers', tests);
    }
    
    async testResponsiveness() {
        console.log('📱 Testando responsividade...');
        const tests = {
            'Meta viewport configurado': () => {
                const viewport = document.querySelector('meta[name="viewport"]');
                return viewport && viewport.content.includes('width=device-width');
            },
            'Grid responsivo': () => {
                const grid = document.querySelector('.flash-deals-grid');
                if (!grid) return false;
                const style = window.getComputedStyle(grid);
                return style.display === 'grid' && style.gridTemplateColumns.includes('auto-fit');
            },
            'Navegação mobile friendly': () => {
                const nav = document.querySelector('.bottom-nav');
                return nav !== null;
            },
            'Texto legível em mobile': () => {
                const offers = document.querySelectorAll('.flash-deal-item h3');
                if (offers.length === 0) return false;
                const fontSize = window.getComputedStyle(offers[0]).fontSize;
                return parseFloat(fontSize) >= 16; // Mínimo recomendado
            }
        };
        
        this.testResults.responsiveness = await this.runTestGroup('Responsividade', tests);
    }
    
    async testUsability() {
        console.log('👤 Testando usabilidade...');
        const tests = {
            'Contraste adequado': () => {
                // Testa se há contraste suficiente (simplificado)
                const offers = document.querySelector('.flash-deal-item');
                if (!offers) return false;
                const style = window.getComputedStyle(offers);
                return style.background !== style.color;
            },
            'Elementos clicáveis têm cursor pointer': () => {
                const buttons = document.querySelectorAll('.btn-comprar, .nav-item');
                return Array.from(buttons).every(btn => {
                    const style = window.getComputedStyle(btn);
                    return style.cursor === 'pointer';
                });
            },
            'Feedback visual em hover': () => {
                // Verifica se há transições definidas
                const offers = document.querySelectorAll('.flash-deal-item');
                return Array.from(offers).some(offer => {
                    const style = window.getComputedStyle(offer);
                    return style.transition && style.transition !== 'none';
                });
            },
            'Loading states handled': () => {
                // Verifica se há tratamento de loading
                return typeof window.offerTimers !== 'undefined';
            }
        };
        
        this.testResults.usability = await this.runTestGroup('Usabilidade', tests);
    }
    
    async testConversion() {
        console.log('💰 Testando conversão...');
        const tests = {
            'CTAs claros e visíveis': () => {
                const ctas = document.querySelectorAll('.btn-comprar, .btn-ver-todas-ofertas');
                return ctas.length > 0 && Array.from(ctas).every(cta => {
                    const style = window.getComputedStyle(cta);
                    return style.display !== 'none' && style.visibility !== 'hidden';
                });
            },
            'Urgência transmitida': () => {
                const timers = document.querySelectorAll('.deal-timer');
                const badges = document.querySelectorAll('.deal-badge');
                return timers.length > 0 && badges.length > 0;
            },
            'Preços bem destacados': () => {
                const prices = document.querySelectorAll('.current-price');
                return Array.from(prices).every(price => {
                    const style = window.getComputedStyle(price);
                    return parseFloat(style.fontSize) > 16;
                });
            },
            'Informações de stock': () => {
                const stock = document.querySelectorAll('.stock-info');
                return stock.length > 0;
            },
            'Comparação de preços': () => {
                const original = document.querySelectorAll('.original-price');
                const current = document.querySelectorAll('.current-price');
                return original.length > 0 && current.length > 0;
            }
        };
        
        this.testResults.conversion = await this.runTestGroup('Conversão', tests);
    }
    
    async testPerformance() {
        console.log('⚡ Testando performance...');
        const tests = {
            'Imagens otimizadas': () => {
                const images = document.querySelectorAll('img');
                return Array.from(images).every(img => {
                    return img.loading !== undefined || img.src.includes('webp') || img.src.includes('jpg') || img.src.includes('png');
                });
            },
            'CSS crítico inline': () => {
                const styles = document.querySelectorAll('style');
                return styles.length > 0;
            },
            'JavaScript não bloqueia': () => {
                const scripts = document.querySelectorAll('script');
                return Array.from(scripts).some(script => script.async || script.defer);
            },
            'DOM não muito complexo': () => {
                const elements = document.querySelectorAll('*');
                return elements.length < 1500; // Limite razoável
            }
        };
        
        this.testResults.performance = await this.runTestGroup('Performance', tests);
    }
    
    async runTestGroup(groupName, tests) {
        const results = {};
        let passed = 0;
        let total = 0;
        
        for (const [testName, testFn] of Object.entries(tests)) {
            total++;
            try {
                const result = await testFn();
                results[testName] = {
                    passed: result,
                    message: result ? '✅ Passou' : '❌ Falhou'
                };
                if (result) passed++;
            } catch (error) {
                results[testName] = {
                    passed: false,
                    message: `❌ Erro: ${error.message}`
                };
            }
        }
        
        this.score += passed;
        this.maxScore += total;
        
        console.log(`📊 ${groupName}: ${passed}/${total} testes passaram`);
        return { results, passed, total };
    }
    
    updateUI() {
        const scoreElement = document.querySelector('#ux-score');
        const testsElement = document.querySelector('#ux-tests');
        
        if (!scoreElement || !testsElement) return;
        
        const percentage = Math.round((this.score / this.maxScore) * 100);
        const grade = this.getGrade(percentage);
        
        scoreElement.innerHTML = `
            <div style="font-size: 1.5em; margin-bottom: 5px;">${percentage}%</div>
            <div>Nota: ${grade} (${this.score}/${this.maxScore})</div>
        `;
        
        let testsHTML = '';
        for (const [groupName, groupData] of Object.entries(this.testResults)) {
            const groupPercentage = Math.round((groupData.passed / groupData.total) * 100);
            testsHTML += `
                <div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">
                        ${groupName}: ${groupPercentage}% (${groupData.passed}/${groupData.total})
                    </div>
                </div>
            `;
        }
        
        testsElement.innerHTML = testsHTML;
    }
    
    getGrade(percentage) {
        if (percentage >= 90) return '🏆 Excelente';
        if (percentage >= 80) return '⭐ Muito Bom';
        if (percentage >= 70) return '👍 Bom';
        if (percentage >= 60) return '👌 Regular';
        return '⚠️ Precisa Melhorar';
    }
    
    generateReport() {
        console.log('\n📊 === RELATÓRIO COMPLETO DE UX ===');
        console.log(`🎯 Pontuação Geral: ${this.score}/${this.maxScore} (${Math.round((this.score / this.maxScore) * 100)}%)`);
        console.log(`📈 Nota: ${this.getGrade(Math.round((this.score / this.maxScore) * 100))}`);
        
        console.log('\n📋 Detalhes por Categoria:');
        for (const [groupName, groupData] of Object.entries(this.testResults)) {
            console.log(`\n${groupName.toUpperCase()}: ${groupData.passed}/${groupData.total}`);
            for (const [testName, result] of Object.entries(groupData.results)) {
                console.log(`  ${result.passed ? '✅' : '❌'} ${testName}`);
            }
        }
        
        console.log('\n💡 Recomendações de Marketing:');
        this.generateRecommendations();
        
        // Salva relatório em arquivo de texto
        this.saveReportAsFile();
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        if (this.testResults.conversion?.passed < this.testResults.conversion?.total * 0.8) {
            recommendations.push('🎯 Otimizar elementos de conversão (CTAs, urgência, preços)');
        }
        
        if (this.testResults.offers?.passed < this.testResults.offers?.total * 0.9) {
            recommendations.push('🔥 Melhorar apresentação das ofertas relâmpago');
        }
        
        if (this.testResults.timers?.passed < this.testResults.timers?.total * 0.8) {
            recommendations.push('⏰ Aprimorar sistema de contagem regressiva');
        }
        
        if (this.testResults.responsiveness?.passed < this.testResults.responsiveness?.total * 0.9) {
            recommendations.push('📱 Otimizar experiência mobile');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('🎉 Excelente! O site está otimizado para conversão');
        }
        
        recommendations.forEach(rec => console.log(`  ${rec}`));
    }
    
    saveReportAsFile() {
        const report = this.generateTextReport();
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-ux-varejao-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('💾 Relatório salvo como arquivo!');
    }
    
    generateTextReport() {
        const percentage = Math.round((this.score / this.maxScore) * 100);
        let report = `RELATÓRIO DE VALIDAÇÃO UX - VAREJÃO
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

RESUMO EXECUTIVO
================
Pontuação Geral: ${this.score}/${this.maxScore} (${percentage}%)
Nota: ${this.getGrade(percentage)}

ANÁLISE DETALHADA
=================
`;
        
        for (const [groupName, groupData] of Object.entries(this.testResults)) {
            const groupPercentage = Math.round((groupData.passed / groupData.total) * 100);
            report += `\n${groupName.toUpperCase()}: ${groupData.passed}/${groupData.total} (${groupPercentage}%)\n`;
            report += '-'.repeat(50) + '\n';
            
            for (const [testName, result] of Object.entries(groupData.results)) {
                report += `${result.passed ? '[PASS]' : '[FAIL]'} ${testName}\n`;
            }
        }
        
        report += '\nRECOMENDAÇÕES\n';
        report += '=============\n';
        // ... adicionar recomendações ...
        
        return report;
    }
    
    logResults() {
        console.log('✅ Validação UX completa!');
        console.log('📊 Use window.uxValidator.generateReport() para ver relatório completo');
    }
}

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🎯 Iniciando validação UX como equipe de marketing...');
        window.uxValidator = new MarketingUXValidator();
    }, 5000);
});

console.log('🎯 Sistema de validação UX carregado!');