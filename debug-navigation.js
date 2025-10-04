// Script de debug atualizado para navegação das ofertas
console.log('🔧 Script de Debug v2.0 Carregado!');

// Função para testar navegação das ofertas
window.debugOffers = () => {
    console.log('🔍 === DEBUG NAVEGAÇÃO OFERTAS V2 ===');
    
    // 1. Verificar elementos de navegação
    const navItems = document.querySelectorAll('.nav-item');
    console.log('📱 Nav Items encontrados:', navItems.length);
    
    navItems.forEach((item, index) => {
        const isActive = item.classList.contains('active');
        console.log(`Nav ${index}: "${item.textContent.trim()}" (ativo: ${isActive})`);
    });
    
    // 2. Verificar seção de ofertas
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const flashDealsSection = document.querySelector('.flash-deals');
    
    console.log('📍 Seções de ofertas:');
    console.log('  #ofertas-especiais:', !!ofertasSection);
    console.log('  .flash-deals:', !!flashDealsSection);
    
    const targetSection = ofertasSection || flashDealsSection;
    if (targetSection) {
        console.log('Detalhes da seção:', {
            id: targetSection.id,
            className: targetSection.className,
            display: getComputedStyle(targetSection).display,
            visibility: getComputedStyle(targetSection).visibility,
            visible: targetSection.offsetParent !== null
        });
    }
    
    // 3. Verificar botão "Ver Todas as Ofertas"
    const verTodasBtn = document.querySelector('.btn-ver-todas-ofertas');
    console.log('🔘 Botão "Ver Todas as Ofertas":', !!verTodasBtn);
    
    // 4. Testar clique no botão ofertas da navegação inferior
    const ofertasNavBtn = navItems[2]; // Deveria ser o terceiro botão
    if (ofertasNavBtn) {
        console.log('🎯 Testando clique no botão ofertas da navegação...');
        console.log('Texto do botão:', ofertasNavBtn.textContent);
        
        // Simular clique
        ofertasNavBtn.click();
        
        setTimeout(() => {
            const isVisible = targetSection && getComputedStyle(targetSection).display !== 'none';
            const isActive = ofertasNavBtn.classList.contains('active');
            
            console.log('Resultados do teste:');
            console.log('  ✅ Seção ofertas visível:', isVisible);
            console.log('  ✅ Botão navegação ativo:', isActive);
            
            if (isVisible && isActive) {
                console.log('🎉 SUCESSO! Navegação funcionando perfeitamente!');
            } else {
                console.log('❌ PROBLEMA! Algo não funcionou:');
                if (!isVisible) console.log('   - Seção não ficou visível');
                if (!isActive) console.log('   - Botão não ficou ativo');
            }
        }, 500);
    }
    
    return { navItems, targetSection, verTodasBtn, ofertasNavBtn };
};

// Função para testar botão "Ver Todas as Ofertas"
window.testVerTodasOfertas = () => {
    console.log('🔘 === TESTE BOTÃO VER TODAS AS OFERTAS ===');
    
    const btn = document.querySelector('.btn-ver-todas-ofertas');
    if (btn) {
        console.log('Botão encontrado, simulando clique...');
        btn.click();
        
        setTimeout(() => {
            const ofertasSection = document.querySelector('#ofertas-especiais') || document.querySelector('.flash-deals');
            const navItems = document.querySelectorAll('.nav-item');
            
            const isVisible = ofertasSection && getComputedStyle(ofertasSection).display !== 'none';
            const isNavActive = navItems[2] && navItems[2].classList.contains('active');
            
            console.log('Resultado do teste:');
            console.log('  ✅ Seção ofertas visível:', isVisible);
            console.log('  ✅ Navegação ativa:', isNavActive);
            
            if (isVisible && isNavActive) {
                console.log('🎉 BOTÃO FUNCIONANDO!');
            } else {
                console.log('❌ BOTÃO COM PROBLEMA!');
            }
        }, 300);
    } else {
        console.log('❌ Botão "Ver Todas as Ofertas" não encontrado!');
    }
};

// Função para forçar navegação para ofertas (emergência)
window.forceShowOffers = () => {
    console.log('🚀 Forçando exibição de ofertas...');
    
    // Primeiro, esconder tudo
    const sections = document.querySelectorAll('section, .main-content, .product-grid');
    sections.forEach(section => {
        if (section.style) section.style.display = 'none';
    });
    
    // Encontrar e mostrar seção de ofertas
    const ofertasSection = document.querySelector('#ofertas-especiais') || document.querySelector('.flash-deals');
    if (ofertasSection) {
        ofertasSection.style.display = 'block';
        ofertasSection.style.visibility = 'visible';
        ofertasSection.style.opacity = '1';
        
        // Ativar navegação
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[2]) navItems[2].classList.add('active');
        
        console.log('✅ Ofertas forçadas a aparecer!');
        
        // Tentar renderizar ofertas
        if (typeof renderFlashDeals === 'function') {
            renderFlashDeals();
        }
        
        return true;
    } else {
        console.log('❌ Seção de ofertas não encontrada!');
        return false;
    }
};

// Auto-executar debug após carregamento
setTimeout(() => {
    console.log('🤖 Executando debug automático em 2 segundos...');
    debugOffers();
}, 2000);

console.log('💡 Comandos de debug disponíveis:');
console.log('- debugOffers() - Debug completo da navegação');
console.log('- testVerTodasOfertas() - Testa botão Ver Todas as Ofertas');
console.log('- forceShowOffers() - Força exibição das ofertas');