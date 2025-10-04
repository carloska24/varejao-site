// Debug completo e melhorado do sistema de ofertas
function debugOfertasCompleto() {
    console.log('🚀 === DEBUG COMPLETO DE OFERTAS ===');
    
    // 1. Verifica dados
    console.log('\n📊 1. VERIFICAÇÃO DE DADOS:');
    console.log('flashDeals existe:', typeof flashDeals !== 'undefined');
    console.log('flashDeals conteúdo:', flashDeals?.length || 0, 'ofertas');
    console.log('marketingData existe:', typeof marketingData !== 'undefined');
    console.log('marketingData.activePromotions:', marketingData?.activePromotions?.length || 0, 'ofertas');
    
    if (flashDeals?.length > 0) {
        console.log('✅ Primeira oferta de exemplo:', flashDeals[0]);
    }
    
    // 2. Verifica funções
    console.log('\n⚙️ 2. VERIFICAÇÃO DE FUNÇÕES:');
    console.log('renderFlashDeals existe:', typeof renderFlashDeals !== 'undefined');
    console.log('loadMarketingData existe:', typeof loadMarketingData !== 'undefined');
    console.log('navigateToSection existe:', typeof navigateToSection !== 'undefined');
    
    // 3. Verifica elementos DOM
    console.log('\n🎯 3. VERIFICAÇÃO DE ELEMENTOS DOM:');
    const flashDealsGrid = document.querySelector('.flash-deals-grid');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const flashDealsSection = document.querySelector('.flash-deals');
    
    console.log('Grid de ofertas (.flash-deals-grid):', {
        found: !!flashDealsGrid,
        visible: flashDealsGrid ? window.getComputedStyle(flashDealsGrid).display : 'N/A',
        hasContent: flashDealsGrid ? flashDealsGrid.innerHTML.length > 50 : false,
        contentPreview: flashDealsGrid ? flashDealsGrid.innerHTML.substring(0, 100) + '...' : 'N/A'
    });
    
    console.log('Seção ofertas especiais (#ofertas-especiais):', {
        found: !!ofertasSection,
        visible: ofertasSection ? window.getComputedStyle(ofertasSection).display : 'N/A',
        id: ofertasSection?.id,
        className: ofertasSection?.className
    });
    
    console.log('Seção flash deals (.flash-deals):', {
        found: !!flashDealsSection,
        visible: flashDealsSection ? window.getComputedStyle(flashDealsSection).display : 'N/A',
        id: flashDealsSection?.id,
        className: flashDealsSection?.className
    });
    
    // 4. Testa renderização manual
    console.log('\n🔧 4. TESTE DE RENDERIZAÇÃO MANUAL:');
    if (typeof renderFlashDeals === 'function') {
        try {
            renderFlashDeals();
            console.log('✅ renderFlashDeals() executado com sucesso');
            
            // Verifica novamente após renderização
            setTimeout(() => {
                const gridAfter = document.querySelector('.flash-deals-grid');
                console.log('📊 Grid após renderização:', {
                    hasContent: gridAfter ? gridAfter.innerHTML.length > 50 : false,
                    childCount: gridAfter ? gridAfter.children.length : 0
                });
            }, 500);
            
        } catch (error) {
            console.error('❌ Erro ao executar renderFlashDeals():', error);
        }
    } else {
        console.error('❌ renderFlashDeals não é uma função!');
    }
    
    // 5. Teste de navegação
    console.log('\n🧭 5. TESTE DE NAVEGAÇÃO:');
    if (typeof navigateToSection === 'function') {
        console.log('Testando navegação para ofertas...');
        navigateToSection('ofertas');
    }
    
    return {
        flashDeals: flashDeals?.length || 0,
        marketingData: marketingData?.activePromotions?.length || 0,
        functions: {
            renderFlashDeals: typeof renderFlashDeals,
            loadMarketingData: typeof loadMarketingData,
            navigateToSection: typeof navigateToSection
        },
        elements: {
            grid: !!flashDealsGrid,
            ofertas: !!ofertasSection,
            flashDeals: !!flashDealsSection
        }
    };
}

// Força criação de ofertas visíveis
function forcarOfertasVisiveis() {
    console.log('🎯 === FORÇANDO OFERTAS VISÍVEIS ===');
    
    // Dados de ofertas garantidos
    const ofertasGarantidas = [
        {
            id: 'força1',
            nome: "🔥 Banana Nanica Premium",
            preco: 3.99,
            precoOriginal: 5.50,
            desconto: 27,
            imagem: "img/products/banana-nanica.png",
            categoria: "frutas",
            tempoRestante: "2h 30m",
            quantidade: 150
        },
        {
            id: 'força2',
            nome: "🍓 Morango Premium Selecionado",
            preco: 8.90,
            precoOriginal: 12.90,
            desconto: 31,
            imagem: "img/products/morango.png",
            categoria: "frutas",
            tempoRestante: "1h 45m",
            quantidade: 75
        },
        {
            id: 'força3',
            nome: "🍎 Maçã Gala Extra",
            preco: 4.50,
            precoOriginal: 6.90,
            desconto: 35,
            imagem: "img/products/maca-gala.png",
            categoria: "frutas",
            tempoRestante: "3h 15m",
            quantidade: 200
        }
    ];
    
    // Força criação da seção se não existir
    let ofertasSection = document.querySelector('#ofertas-especiais');
    if (!ofertasSection) {
        console.log('⚠️ Seção de ofertas não encontrada, criando...');
        ofertasSection = document.createElement('section');
        ofertasSection.id = 'ofertas-especiais';
        ofertasSection.className = 'content-section';
        ofertasSection.style.cssText = 'display: block; padding: 20px;';
        
        // Adiciona ao main ou body
        const container = document.querySelector('main') || document.body;
        container.appendChild(ofertasSection);
    }
    
    // Força criação do grid se não existir
    let grid = document.querySelector('.flash-deals-grid');
    if (!grid) {
        console.log('⚠️ Grid não encontrado, criando um novo...');
        grid = document.createElement('div');
        grid.className = 'flash-deals-grid';
        grid.style.cssText = `
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            padding: 25px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 15px;
            margin: 20px auto;
            max-width: 1200px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        `;
        ofertasSection.appendChild(grid);
        console.log('✅ Grid criado e adicionado!');
    }
    
    // Adiciona título se não existir
    if (!ofertasSection.querySelector('h2')) {
        const titulo = document.createElement('h2');
        titulo.style.cssText = `
            text-align: center;
            color: #e74c3c;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        `;
        titulo.innerHTML = '🔥 OFERTAS RELÂMPAGO ATIVAS';
        ofertasSection.insertBefore(titulo, grid);
    }
    
    // Força visibilidade da seção
    ofertasSection.style.display = 'block';
    ofertasSection.style.visibility = 'visible';
    ofertasSection.style.opacity = '1';
    
    // Renderiza ofertas com estilo aprimorado
    grid.innerHTML = '';
    ofertasGarantidas.forEach((offer, index) => {
        const offerHTML = `
            <div class="flash-deal-card-premium" style="
                background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
                border-radius: 20px;
                padding: 20px;
                box-shadow: 0 15px 35px rgba(231, 76, 60, 0.15);
                border: 3px solid #e74c3c;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                animation: slideInUp ${0.5 + index * 0.2}s ease-out;
            ">
                <!-- Badge de desconto -->
                <div style="
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #e74c3c;
                    color: white;
                    padding: 8px 15px;
                    border-radius: 15px;
                    font-weight: bold;
                    font-size: 0.9em;
                    box-shadow: 0 3px 10px rgba(231, 76, 60, 0.4);
                ">
                    ${offer.desconto}% OFF
                </div>
                
                <!-- Imagem do produto -->
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${offer.imagem}" alt="${offer.nome}" style="
                        width: 100%;
                        max-width: 200px;
                        height: 180px;
                        object-fit: cover;
                        border-radius: 15px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                        transition: transform 0.3s ease;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                
                <!-- Nome do produto -->
                <h3 style="
                    margin: 15px 0;
                    color: #2c3e50;
                    font-size: 1.3em;
                    text-align: center;
                    font-weight: bold;
                ">${offer.nome}</h3>
                
                <!-- Preços -->
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    margin: 15px 0;
                    flex-wrap: wrap;
                ">
                    <span style="
                        font-size: 1.8em;
                        font-weight: bold;
                        color: #e74c3c;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                    ">R$ ${offer.preco.toFixed(2)}</span>
                    <span style="
                        text-decoration: line-through;
                        color: #7f8c8d;
                        font-size: 1.1em;
                    ">R$ ${offer.precoOriginal.toFixed(2)}</span>
                </div>
                
                <!-- Informações adicionais -->
                <div style="
                    background: #f8f9fa;
                    padding: 12px;
                    border-radius: 10px;
                    margin: 15px 0;
                    border-left: 4px solid #e74c3c;
                ">
                    <div style="
                        color: #e74c3c;
                        font-size: 0.95em;
                        margin: 5px 0;
                        font-weight: 600;
                    ">
                        ⏰ Termina em: <strong>${offer.tempoRestante}</strong>
                    </div>
                    <div style="
                        color: #27ae60;
                        font-size: 0.95em;
                        margin: 5px 0;
                        font-weight: 600;
                    ">
                        📦 <strong>${offer.quantidade}</strong> unidades disponíveis
                    </div>
                </div>
                
                <!-- Botão de compra -->
                <button style="
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(145deg, #27ae60 0%, #219a52 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: bold;
                    font-size: 1.1em;
                    cursor: pointer;
                    margin-top: 15px;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                " onmouseover="
                    this.style.background='linear-gradient(145deg, #219a52 0%, #1e8449 100%)';
                    this.style.transform='translateY(-2px)';
                    this.style.boxShadow='0 8px 25px rgba(39, 174, 96, 0.4)';
                " onmouseout="
                    this.style.background='linear-gradient(145deg, #27ae60 0%, #219a52 100%)';
                    this.style.transform='translateY(0)';
                    this.style.boxShadow='0 5px 15px rgba(39, 174, 96, 0.3)';
                " onclick="
                    this.innerHTML='✅ ADICIONADO!';
                    this.style.background='linear-gradient(145deg, #2ecc71 0%, #27ae60 100%)';
                    setTimeout(() => {
                        this.innerHTML='🛒 COMPRAR AGORA';
                        this.style.background='linear-gradient(145deg, #27ae60 0%, #219a52 100%)';
                    }, 2000);
                ">
                    🛒 COMPRAR AGORA
                </button>
            </div>
        `;
        grid.innerHTML += offerHTML;
    });
    
    // Adiciona CSS de animação
    if (!document.querySelector('#ofertas-animations')) {
        const style = document.createElement('style');
        style.id = 'ofertas-animations';
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .flash-deal-card-premium:hover {
                transform: translateY(-10px) !important;
                box-shadow: 0 25px 50px rgba(231, 76, 60, 0.2) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Adiciona indicador de sucesso
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(145deg, #27ae60 0%, #219a52 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        animation: pulse 2s infinite;
        font-size: 1.1em;
    `;
    indicator.innerHTML = '✅ OFERTAS FORÇADAS ATIVAS!';
    document.body.appendChild(indicator);
    
    // Força navegação para a seção
    if (typeof navigateToSection === 'function') {
        navigateToSection('ofertas');
    }
    
    // Remove indicador após 8 segundos
    setTimeout(() => {
        indicator.style.animation = 'fadeOut 1s ease-out';
        setTimeout(() => indicator.remove(), 1000);
    }, 8000);
    
    console.log('✅ Ofertas forçadas criadas com sucesso!');
    console.log('📊 Total de ofertas renderizadas:', ofertasGarantidas.length);
    
    return {
        section: ofertasSection,
        grid: grid,
        offers: ofertasGarantidas.length,
        success: true
    };
}

// Execução automática e comandos disponíveis
if (typeof window !== 'undefined') {
    console.log('\n🎯 === SISTEMA DE DEBUG DE OFERTAS CARREGADO ===');
    console.log('📋 Comandos disponíveis:');
    console.log('  debugOfertasCompleto() - Debug completo do sistema');
    console.log('  forcarOfertasVisiveis() - Força criação e exibição das ofertas');
    console.log('\n💡 Dica: Use forcarOfertasVisiveis() para garantir que as ofertas apareçam!');
    
    // Auto-debug após 2 segundos
    setTimeout(() => {
        console.log('\n🚀 Executando debug automático...');
        debugOfertasCompleto();
    }, 2000);
}