// Teste específico para o bug de navegação de ofertas
function testeNavegacaoOfertas() {
    console.log('🐛 === TESTE ESPECÍFICO: BUG DE NAVEGAÇÃO ===');
    
    // 1. Estado inicial
    console.log('\n📍 1. VERIFICANDO ESTADO INICIAL');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const flashDealsSection = document.querySelector('.flash-deals');
    
    console.log('Seção #ofertas-especiais:', {
        found: !!ofertasSection,
        display: ofertasSection ? window.getComputedStyle(ofertasSection).display : 'N/A',
        visibility: ofertasSection ? window.getComputedStyle(ofertasSection).visibility : 'N/A'
    });
    
    console.log('Seção .flash-deals:', {
        found: !!flashDealsSection,
        display: flashDealsSection ? window.getComputedStyle(flashDealsSection).display : 'N/A',
        sameElement: ofertasSection === flashDealsSection
    });
    
    // 2. Testa findSections()
    console.log('\n🔍 2. TESTANDO findSections()');
    if (typeof findSections === 'function') {
        const sections = findSections();
        console.log('Resultado de findSections():', sections);
        console.log('Seção ofertas encontrada:', !!sections.ofertas);
        console.log('Elemento ofertas:', sections.ofertas);
    } else {
        console.log('❌ findSections não é uma função!');
    }
    
    // 3. Testa navegação direta
    console.log('\n🧭 3. TESTANDO NAVEGAÇÃO DIRETA');
    if (typeof navigateToSection === 'function') {
        console.log('Chamando navigateToSection("ofertas")...');
        navigateToSection('ofertas');
        
        // Verifica resultado após 500ms
        setTimeout(() => {
            const ofertasAfter = document.querySelector('#ofertas-especiais');
            console.log('\n📊 RESULTADO APÓS NAVEGAÇÃO:');
            console.log('Display:', ofertasAfter ? window.getComputedStyle(ofertasAfter).display : 'N/A');
            console.log('Visibility:', ofertasAfter ? window.getComputedStyle(ofertasAfter).visibility : 'N/A');
            console.log('Opacity:', ofertasAfter ? window.getComputedStyle(ofertasAfter).opacity : 'N/A');
            
            const isVisible = ofertasAfter && 
                window.getComputedStyle(ofertasAfter).display !== 'none' &&
                window.getComputedStyle(ofertasAfter).visibility !== 'hidden';
                
            if (isVisible) {
                console.log('✅ SUCESSO: Seção ofertas está visível!');
                
                // Verifica se tem conteúdo
                const grid = document.querySelector('.flash-deals-grid');
                const hasContent = grid && grid.innerHTML.length > 50;
                console.log('Grid tem conteúdo:', hasContent);
                
                if (!hasContent) {
                    console.log('⚠️ Seção visível mas sem conteúdo, forçando ofertas...');
                    if (typeof criarOfertasDemo === 'function') {
                        criarOfertasDemo();
                    }
                }
            } else {
                console.log('❌ FALHA: Seção ofertas NÃO está visível!');
                console.log('🔧 Tentando correção manual...');
                
                // Correção manual
                if (ofertasAfter) {
                    ofertasAfter.style.display = 'block !important';
                    ofertasAfter.style.visibility = 'visible !important';
                    ofertasAfter.style.opacity = '1 !important';
                    ofertasAfter.style.zIndex = '10';
                    
                    console.log('🛠️ Estilos forçados aplicados');
                    
                    // Testa novamente
                    setTimeout(() => {
                        const finalCheck = window.getComputedStyle(ofertasAfter).display;
                        console.log('✅ Display final após correção:', finalCheck);
                    }, 200);
                }
            }
        }, 500);
    } else {
        console.log('❌ navigateToSection não é uma função!');
    }
}

// Teste de força bruta - garante que a seção apareça
function forcaOfertasVisivel() {
    console.log('💪 === FORÇA BRUTA: OFERTAS VISÍVEL ===');
    
    const ofertas = document.querySelector('#ofertas-especiais');
    if (ofertas) {
        // Remove todos os estilos que podem estar escondendo
        ofertas.style.display = 'block';
        ofertas.style.visibility = 'visible';
        ofertas.style.opacity = '1';
        ofertas.style.position = 'relative';
        ofertas.style.zIndex = '10';
        ofertas.style.left = '0';
        ofertas.style.top = '0';
        ofertas.style.transform = 'none';
        
        // Esconde outras seções
        const todasSections = document.querySelectorAll('section');
        todasSections.forEach(section => {
            if (section !== ofertas) {
                section.style.display = 'none';
            }
        });
        
        // Esconde divs principais
        const productGrid = document.querySelector('.product-grid');
        const categories = document.querySelector('.categories');
        if (productGrid) productGrid.style.display = 'none';
        if (categories) categories.style.display = 'none';
        
        console.log('✅ Ofertas forçadas a ficarem visíveis!');
        
        // Força conteúdo se não existe
        const grid = document.querySelector('.flash-deals-grid');
        if (!grid || grid.innerHTML.length < 50) {
            console.log('🎨 Criando conteúdo...');
            if (typeof criarOfertasDemo === 'function') {
                criarOfertasDemo();
            }
        }
        
        return true;
    } else {
        console.log('❌ Seção ofertas não encontrada!');
        return false;
    }
}

console.log('🧪 Teste de navegação de ofertas carregado!');
console.log('📋 Comandos:');
console.log('  testeNavegacaoOfertas() - Testa o bug específico');
console.log('  forcaOfertasVisivel() - Força ofertas visível (solução emergencial)');

// Auto-execução após 5 segundos
setTimeout(() => {
    console.log('\n🎬 Executando teste de navegação automático...');
    testeNavegacaoOfertas();
}, 5000);