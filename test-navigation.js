// Script de teste para validar navegação das ofertas relâmpago
console.log('🧪 Iniciando testes de navegação...');

// Teste 1: Verificar se o botão "Ver Todas as Ofertas" existe
const testOfertasButton = () => {
    const btn = document.querySelector('.btn-ver-todas-ofertas');
    console.log('✅ Botão "Ver Todas as Ofertas" encontrado:', !!btn);
    return !!btn;
};

// Teste 2: Simular clique no botão
const testButtonClick = () => {
    const btn = document.querySelector('.btn-ver-todas-ofertas');
    if (btn) {
        console.log('🔄 Simulando clique no botão...');
        btn.click();
        
        // Verifica se a seção de ofertas foi carregada
        setTimeout(() => {
            const ofertasSection = document.querySelector('#ofertas-especiais');
            const isVisible = ofertasSection && ofertasSection.style.display !== 'none';
            console.log('✅ Seção de ofertas visível após clique:', isVisible);
            
            // Verifica se as ofertas foram renderizadas
            const flashDeals = document.querySelectorAll('.flash-deal-card');
            console.log('📊 Número de ofertas renderizadas:', flashDeals.length);
            
            return isVisible && flashDeals.length > 0;
        }, 500);
    }
    return false;
};

// Teste 3: Verificar timers em tempo real
const testRealTimeTimers = () => {
    const timers = document.querySelectorAll('.urgency-timer[data-end-time]');
    console.log('⏱️ Timers de ofertas encontrados:', timers.length);
    
    timers.forEach((timer, index) => {
        const endTime = parseInt(timer.dataset.endTime);
        const timeLeft = endTime - Date.now();
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        console.log(`Timer ${index + 1}: ${hoursLeft}h restantes`);
    });
    
    return timers.length > 0;
};

// Teste 4: Verificar categorias alinhadas
const testCategoryAlignment = () => {
    const categories = document.querySelectorAll('.category-item');
    console.log('📂 Categorias encontradas:', categories.length);
    
    // Verifica se todas têm a mesma altura
    if (categories.length > 0) {
        const firstHeight = categories[0].offsetHeight;
        const allSameHeight = Array.from(categories).every(cat => 
            Math.abs(cat.offsetHeight - firstHeight) <= 2 // tolerância de 2px
        );
        console.log('📏 Todas as categorias têm altura similar:', allSameHeight);
        return allSameHeight;
    }
    return false;
};

// Teste 5: Verificar ofertas premium
const testPremiumOffers = () => {
    const premiumButtons = document.querySelectorAll('.btn-add-flash-deal.premium');
    console.log('🌟 Botões premium encontrados:', premiumButtons.length);
    
    const urgentOffers = document.querySelectorAll('.flash-deal-card.urgent-ending');
    console.log('🚨 Ofertas urgentes encontradas:', urgentOffers.length);
    
    return premiumButtons.length > 0;
};

// Executar todos os testes
const runAllTests = () => {
    console.log('🎯 === RELATÓRIO DE TESTES ===');
    
    const results = {
        botaoOfertas: testOfertasButton(),
        navegacao: testButtonClick(),
        timers: testRealTimeTimers(),
        categorias: testCategoryAlignment(),
        ofertasPremium: testPremiumOffers()
    };
    
    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    console.log(`📊 Resultado: ${passed}/${total} testes passaram`);
    console.log('📋 Detalhes:', results);
    
    if (passed === total) {
        console.log('🎉 Todos os testes passaram! Sistema funcionando perfeitamente.');
    } else {
        console.log('⚠️ Alguns testes falharam. Verificar implementação.');
    }
    
    return results;
};

// Auto-executar após o DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Exportar função para uso manual
window.testNavigation = runAllTests;
console.log('💡 Use testNavigation() no console para executar os testes manualmente.');