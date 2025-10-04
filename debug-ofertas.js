// Debug específico para ofertas relâmpago
console.log('🔥 DEBUG OFERTAS RELÂMPAGO CARREGADO');

// Função para testar renderização das ofertas
window.debugOfertas = () => {
    console.clear();
    console.log('🔥 === DEBUG OFERTAS RELÂMPAGO ===');
    
    // 1. Verificar dados das ofertas
    console.log('📊 Verificando dados das ofertas...');
    if (typeof marketingData !== 'undefined') {
        console.log('✅ marketingData existe');
        console.log('📈 Total de promoções ativas:', marketingData.activePromotions?.length || 0);
        
        if (marketingData.activePromotions && marketingData.activePromotions.length > 0) {
            console.log('📋 Ofertas ativas:');
            marketingData.activePromotions.forEach((deal, index) => {
                const timeLeft = deal.endTime - Date.now();
                const isValid = timeLeft > 0 && deal.stock > 0;
                console.log(`  ${index + 1}. ${deal.title} (${deal.productId}) - Válida: ${isValid}`);
                console.log(`     Stock: ${deal.stock}/${deal.maxStock} | Tempo: ${Math.floor(timeLeft/1000/60)} min`);
            });
        } else {
            console.log('❌ Nenhuma oferta ativa encontrada!');
        }
    } else {
        console.log('❌ marketingData não existe!');
    }
    
    // 2. Verificar container das ofertas
    const flashDealsGrid = document.querySelector('.flash-deals-grid');
    console.log('🎯 Container ofertas (.flash-deals-grid):', !!flashDealsGrid);
    
    if (flashDealsGrid) {
        console.log('📐 Container HTML:', flashDealsGrid.innerHTML.length > 0 ? 'TEM CONTEÚDO' : 'VAZIO');
        console.log('👁️ Container visível:', getComputedStyle(flashDealsGrid).display !== 'none');
    }
    
    // 3. Verificar função renderFlashDeals
    if (typeof renderFlashDeals === 'function') {
        console.log('✅ Função renderFlashDeals existe');
        
        // Executar renderização
        console.log('🔄 Executando renderFlashDeals...');
        try {
            renderFlashDeals();
            
            // Verificar resultado
            setTimeout(() => {
                const content = flashDealsGrid ? flashDealsGrid.innerHTML : '';
                console.log('📊 Resultado da renderização:');
                console.log('  Conteúdo gerado:', content.length > 0 ? 'SIM' : 'NÃO');
                console.log('  Tamanho do HTML:', content.length, 'caracteres');
                
                if (content.length > 0) {
                    const dealCards = document.querySelectorAll('.flash-deal-card');
                    console.log('🎴 Cards de ofertas criados:', dealCards.length);
                } else {
                    console.log('❌ Nenhum conteúdo foi gerado!');
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Erro ao executar renderFlashDeals:', error);
        }
    } else {
        console.log('❌ Função renderFlashDeals não existe!');
    }
    
    // 4. Verificar produtos base
    if (typeof products !== 'undefined') {
        console.log('✅ Array de produtos existe');
        console.log('📦 Total de produtos:', products.length);
        
        // Verificar se os produtos das ofertas existem
        if (marketingData?.activePromotions) {
            console.log('🔍 Verificando produtos das ofertas:');
            marketingData.activePromotions.forEach(deal => {
                const product = products.find(p => p.id === deal.productId);
                console.log(`  ${deal.productId}: ${product ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO'}`);
                if (product) {
                    console.log(`    Nome: ${product.name} | Preço: R$ ${product.price}`);
                }
            });
        }
    } else {
        console.log('❌ Array de produtos não existe!');
    }
};

// Função para forçar criação de ofertas de teste
window.criarOfertasTeste = () => {
    console.log('🧪 Criando ofertas de teste...');
    
    // Ofertas simples para teste
    const ofertasTeste = [
        {
            productId: 'frt-mrg',
            discount: 50,
            type: 'flash',
            endTime: Date.now() + (24 * 60 * 60 * 1000),
            stock: 10,
            maxStock: 20,
            views: 0,
            conversions: 0,
            originalPrice: 7.99,
            title: "MORANGO SUPER OFERTA",
            description: "Teste de oferta"
        },
        {
            productId: 'frt-bnn',
            discount: 40,
            type: 'limited',
            endTime: Date.now() + (12 * 60 * 60 * 1000),
            stock: 5,
            maxStock: 10,
            views: 0,
            conversions: 0,
            originalPrice: 5.99,
            title: "BANANA PROMOÇÃO",
            description: "Teste de oferta 2"
        }
    ];
    
    // Atualizar marketingData
    if (typeof marketingData !== 'undefined') {
        marketingData.activePromotions = ofertasTeste;
        console.log('✅ Ofertas de teste criadas');
        
        // Renderizar
        if (typeof renderFlashDeals === 'function') {
            renderFlashDeals();
            console.log('✅ Renderização executada');
        }
    } else {
        console.log('❌ marketingData não existe!');
    }
};

// Função para mostrar seção de ofertas com debug visual
window.mostrarOfertasComDebug = () => {
    console.log('👁️ Forçando exibição da seção de ofertas...');
    
    // Encontrar seção
    const ofertasSection = document.querySelector('#ofertas-especiais') || document.querySelector('.flash-deals');
    
    if (ofertasSection) {
        // Esconder tudo
        const sections = document.querySelectorAll('section, .main-content');
        sections.forEach(s => {
            if (s.style) s.style.display = 'none';
        });
        
        // Mostrar ofertas
        ofertasSection.style.display = 'block';
        ofertasSection.style.visibility = 'visible';
        ofertasSection.style.opacity = '1';
        
        // Destacar visualmente
        ofertasSection.style.border = '3px solid red';
        ofertasSection.style.backgroundColor = '#fff3cd';
        
        console.log('✅ Seção de ofertas forçada a aparecer');
        
        // Executar debug após exibir
        setTimeout(() => {
            debugOfertas();
        }, 500);
        
        // Remover destaque após 3 segundos
        setTimeout(() => {
            ofertasSection.style.border = '';
            ofertasSection.style.backgroundColor = '';
        }, 3000);
        
    } else {
        console.log('❌ Seção de ofertas não encontrada!');
    }
};

// Auto-executar debug
setTimeout(() => {
    console.log('🤖 Executando debug automático das ofertas...');
    debugOfertas();
}, 3000);

console.log('💡 Comandos disponíveis:');
console.log('- debugOfertas() - Debug completo das ofertas');
console.log('- criarOfertasTeste() - Criar ofertas de teste');
console.log('- mostrarOfertasComDebug() - Mostrar seção com debug visual');