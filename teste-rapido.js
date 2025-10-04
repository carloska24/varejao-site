// Teste rápido do sistema de ofertas
console.log('🚀 === TESTE RÁPIDO DO SISTEMA ===');

// 1. Verifica se os elementos fundamentais existem
console.log('\n🔍 Verificando elementos...');
const navItems = document.querySelectorAll('.nav-item');
console.log('Nav items encontrados:', navItems.length);

const ofertasSection = document.querySelector('#ofertas-especiais');
console.log('Seção ofertas encontrada:', !!ofertasSection);

const flashDealsGrid = document.querySelector('.flash-deals-grid');
console.log('Grid de ofertas encontrado:', !!flashDealsGrid);

// 2. Testa navegação para ofertas
console.log('\n🧭 Testando navegação...');
if (typeof navigateToSection === 'function') {
    console.log('Navegando para ofertas...');
    navigateToSection('ofertas');
    
    setTimeout(() => {
        const ofertasActive = document.querySelector('#ofertas-especiais');
        const isVisible = ofertasActive && window.getComputedStyle(ofertasActive).display !== 'none';
        console.log('Seção ofertas visível após navegação:', isVisible);
        
        // 3. Força renderização das ofertas
        console.log('\n🔥 Forçando renderização...');
        if (typeof renderFlashDeals === 'function') {
            renderFlashDeals();
            console.log('renderFlashDeals executado');
        }
        
        // 4. Verifica conteúdo após renderização
        setTimeout(() => {
            const grid = document.querySelector('.flash-deals-grid');
            const hasContent = grid && grid.innerHTML.length > 50;
            console.log('Grid tem conteúdo:', hasContent);
            
            if (!hasContent) {
                console.log('⚠️ Sem conteúdo, executando força de ofertas...');
                if (typeof forcarOfertasVisiveis === 'function') {
                    forcarOfertasVisiveis();
                } else {
                    console.log('❌ Função forcarOfertasVisiveis não disponível');
                }
            }
        }, 500);
    }, 300);
} else {
    console.log('❌ Função navigateToSection não encontrada');
}

// 5. Testa se consegue destacar navegação
setTimeout(() => {
    console.log('\n🎯 Verificando destaque da navegação...');
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        console.log('✅ Item ativo encontrado:', activeNav.textContent.trim());
    } else {
        console.log('⚠️ Nenhum item de navegação destacado');
    }
}, 1000);