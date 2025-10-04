// Diagnóstico profundo do problema de navegação
console.log('🔬 DIAGNÓSTICO PROFUNDO INICIADO');

// Função para log detalhado
const logDetalhado = (titulo, dados) => {
    console.log(`\n=== ${titulo} ===`);
    if (typeof dados === 'object') {
        Object.entries(dados).forEach(([key, value]) => {
            console.log(`${key}:`, value);
        });
    } else {
        console.log(dados);
    }
    console.log('================\n');
};

// Função de diagnóstico completo
window.diagnosticoCompleto = () => {
    console.clear();
    console.log('🔬 === DIAGNÓSTICO COMPLETO ===');
    
    // 1. Verificar todos os elementos
    const navItems = document.querySelectorAll('.nav-item');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const flashDealsSection = document.querySelector('.flash-deals');
    const verTodasBtn = document.querySelector('.btn-ver-todas-ofertas');
    
    logDetalhado('ELEMENTOS ENCONTRADOS', {
        'Nav Items': navItems.length,
        'Ofertas Section (#ofertas-especiais)': !!ofertasSection,
        'Flash Deals Section (.flash-deals)': !!flashDealsSection,
        'Ver Todas Button': !!verTodasBtn
    });
    
    // 2. Verificar event listeners
    const ofertasNavBtn = navItems[2];
    if (ofertasNavBtn) {
        // Clonar elemento para verificar listeners
        const clone = ofertasNavBtn.cloneNode(true);
        const hasListeners = ofertasNavBtn !== clone;
        
        logDetalhado('BOTÃO OFERTAS (NAVEGAÇÃO)', {
            'Texto': ofertasNavBtn.textContent.trim(),
            'Classes': ofertasNavBtn.className,
            'Tem Listeners': hasListeners,
            'Index': Array.from(navItems).indexOf(ofertasNavBtn)
        });
    }
    
    // 3. Verificar seção de ofertas detalhadamente
    const targetSection = ofertasSection || flashDealsSection;
    if (targetSection) {
        const computedStyle = getComputedStyle(targetSection);
        
        logDetalhado('SEÇÃO DE OFERTAS', {
            'ID': targetSection.id,
            'Classes': targetSection.className,
            'Display (style)': targetSection.style.display || 'não definido',
            'Display (computed)': computedStyle.display,
            'Visibility': computedStyle.visibility,
            'Opacity': computedStyle.opacity,
            'Position': computedStyle.position,
            'Z-Index': computedStyle.zIndex,
            'Parent': targetSection.parentElement?.tagName,
            'Offset Parent': !!targetSection.offsetParent
        });
    }
    
    // 4. Testar função navigateToSection
    if (typeof navigateToSection === 'function') {
        console.log('✅ Função navigateToSection existe');
        
        // Teste seco
        console.log('🧪 Testando navigateToSection("ofertas")...');
        try {
            navigateToSection('ofertas');
            console.log('✅ Função executou sem erros');
        } catch (error) {
            console.error('❌ Erro ao executar função:', error);
        }
    } else {
        console.error('❌ Função navigateToSection não existe!');
    }
    
    // 5. Verificar se há outros elementos escondendo a seção
    const allSections = document.querySelectorAll('section');
    console.log('\n📋 TODAS AS SEÇÕES:');
    allSections.forEach((section, index) => {
        const style = getComputedStyle(section);
        console.log(`${index}: ${section.tagName}#${section.id}.${section.className} - display: ${style.display}`);
    });
    
    // 6. Forçar exibição para teste
    console.log('\n🔧 FORÇANDO EXIBIÇÃO PARA TESTE...');
    if (targetSection) {
        // Primeiro esconder tudo
        allSections.forEach(s => {
            if (s.style) s.style.display = 'none';
        });
        
        // Mostrar só a seção de ofertas
        targetSection.style.display = 'block';
        targetSection.style.visibility = 'visible';
        targetSection.style.opacity = '1';
        targetSection.style.position = 'relative';
        targetSection.style.zIndex = '1';
        
        // Ativar navegação
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[2]) navItems[2].classList.add('active');
        
        console.log('✅ Seção de ofertas forçada a ser visível');
        console.log('✅ Navegação ativada');
        
        // Verificar resultado
        setTimeout(() => {
            const isVisible = getComputedStyle(targetSection).display !== 'none';
            const isActive = navItems[2]?.classList.contains('active');
            
            console.log('\n📊 RESULTADO DO TESTE:');
            console.log('Seção visível:', isVisible);
            console.log('Navegação ativa:', isActive);
            
            if (isVisible && isActive) {
                console.log('🎉 SUCESSO! A seção pode ser exibida!');
            } else {
                console.log('❌ AINDA HÁ PROBLEMAS!');
            }
        }, 100);
    }
};

// Auto-executar após carregamento
setTimeout(() => {
    diagnosticoCompleto();
}, 3000);

console.log('💡 Use diagnosticoCompleto() para executar o diagnóstico completo!');