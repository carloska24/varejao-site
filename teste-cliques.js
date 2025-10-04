// Teste de simulação de cliques do usuário
function testeCompletoCliques() {
    console.log('🎯 === TESTE COMPLETO DE CLIQUES ===');
    console.log('Simulando exatamente o que o usuário faz...\n');
    
    // 1. Estado inicial
    console.log('📍 1. VERIFICANDO ESTADO INICIAL');
    const navItems = document.querySelectorAll('.nav-item');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const flashGrid = document.querySelector('.flash-deals-grid');
    const btnVerTodas = document.querySelector('.btn-ver-todas-ofertas');
    
    console.log('Nav items:', navItems.length);
    console.log('Seção ofertas existe:', !!ofertasSection);
    console.log('Grid existe:', !!flashGrid);
    console.log('Botão "Ver Todas" existe:', !!btnVerTodas);
    console.log('Grid conteúdo inicial:', flashGrid?.innerHTML.length || 0, 'caracteres');
    
    // 2. Simula clique no botão "ofertas" da navegação
    console.log('\n📱 2. SIMULANDO CLIQUE NO BOTÃO "OFERTAS" DA NAVEGAÇÃO');
    const ofertasNavButton = navItems[2]; // Presumindo que ofertas é o 3º botão
    if (ofertasNavButton) {
        console.log('Texto do botão:', ofertasNavButton.textContent.trim());
        console.log('Clicando no botão ofertas...');
        
        // Simula o clique
        ofertasNavButton.click();
        
        setTimeout(() => {
            // Verifica resultado após clique
            const isActive = ofertasNavButton.classList.contains('active');
            const sectionVisible = ofertasSection && window.getComputedStyle(ofertasSection).display !== 'none';
            
            console.log('Botão ficou ativo:', isActive);
            console.log('Seção ficou visível:', sectionVisible);
            console.log('Grid conteúdo após nav:', flashGrid?.innerHTML.length || 0, 'caracteres');
            
            // 3. Simula clique no botão "Ver Todas as Ofertas"
            console.log('\n🔥 3. SIMULANDO CLIQUE EM "VER TODAS AS OFERTAS"');
            if (btnVerTodas) {
                console.log('Botão "Ver Todas" encontrado, clicando...');
                btnVerTodas.click();
                
                setTimeout(() => {
                    console.log('Grid conteúdo após "Ver Todas":', flashGrid?.innerHTML.length || 0, 'caracteres');
                    
                    // 4. Força renderização se não há conteúdo
                    if (!flashGrid || flashGrid.innerHTML.length < 50) {
                        console.log('\n⚡ 4. PROBLEMA DETECTADO: SEM CONTEÚDO');
                        console.log('Tentando forçar renderização...');
                        
                        // Verifica se os dados existem
                        console.log('flashDeals existe:', typeof flashDeals !== 'undefined');
                        console.log('flashDeals.length:', flashDeals?.length || 0);
                        console.log('marketingData existe:', typeof marketingData !== 'undefined');
                        console.log('activePromotions:', marketingData?.activePromotions?.length || 0);
                        
                        // Tenta renderizar
                        if (typeof renderFlashDeals === 'function') {
                            console.log('Executando renderFlashDeals()...');
                            renderFlashDeals();
                            
                            setTimeout(() => {
                                console.log('Grid conteúdo após renderFlashDeals:', flashGrid?.innerHTML.length || 0, 'caracteres');
                                
                                if (!flashGrid || flashGrid.innerHTML.length < 50) {
                                    console.log('\n❌ PROBLEMA CONFIRMADO: renderFlashDeals não funcionou');
                                    console.log('Executando função de força...');
                                    if (typeof forcarOfertasVisiveis === 'function') {
                                        forcarOfertasVisiveis();
                                    }
                                } else {
                                    console.log('✅ Sucesso! Ofertas renderizadas após forçar');
                                }
                            }, 500);
                        } else {
                            console.log('❌ renderFlashDeals não é uma função!');
                        }
                    } else {
                        console.log('✅ Ofertas já estão visíveis!');
                    }
                }, 300);
            } else {
                console.log('❌ Botão "Ver Todas" não encontrado!');
            }
        }, 300);
    } else {
        console.log('❌ Botão de navegação para ofertas não encontrado!');
    }
}

// Função para criar ofertas de demonstração direto no grid
function criarOfertasDemo() {
    console.log('🎨 Criando ofertas de demonstração diretamente...');
    
    const grid = document.querySelector('.flash-deals-grid');
    if (!grid) {
        console.log('❌ Grid não encontrado!');
        return false;
    }
    
    // Ofertas de demonstração
    const ofertas = [
        {
            nome: "Banana Nanica",
            preco: 3.99,
            precoOriginal: 5.50,
            desconto: 27,
            imagem: "img/products/banana-nanica.png",
            tempo: "2h 30m"
        },
        {
            nome: "Morango Premium",
            preco: 8.90,
            precoOriginal: 12.90,
            desconto: 31,
            imagem: "img/products/morango.png",
            tempo: "1h 45m"
        },
        {
            nome: "Maçã Gala",
            preco: 4.50,
            precoOriginal: 6.90,
            desconto: 35,
            imagem: "img/products/maca-gala.png",
            tempo: "3h 15m"
        }
    ];
    
    // Limpa grid e adiciona ofertas
    grid.innerHTML = '';
    
    ofertas.forEach(oferta => {
        const cardHTML = `
            <div class="flash-deal-item" style="
                background: white;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                text-align: center;
                position: relative;
                overflow: hidden;
                border: 2px solid #e74c3c;
            ">
                <div style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #e74c3c;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 0.8em;
                ">${oferta.desconto}% OFF</div>
                
                <img src="${oferta.imagem}" alt="${oferta.nome}" style="
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 15px;
                ">
                
                <h3 style="margin: 10px 0; color: #2c3e50;">${oferta.nome}</h3>
                
                <div style="margin: 15px 0;">
                    <span style="font-size: 1.5em; font-weight: bold; color: #e74c3c;">R$ ${oferta.preco.toFixed(2)}</span>
                    <span style="text-decoration: line-through; color: #888; margin-left: 10px;">R$ ${oferta.precoOriginal.toFixed(2)}</span>
                </div>
                
                <div style="color: #e74c3c; font-weight: bold; margin: 10px 0;">
                    ⏰ Termina em: ${oferta.tempo}
                </div>
                
                <button style="
                    width: 100%;
                    padding: 12px;
                    background: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: background 0.3s;
                " onmouseover="this.style.background='#219a52'" onmouseout="this.style.background='#27ae60'">
                    🛒 Comprar Agora
                </button>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
    
    console.log('✅ Ofertas de demonstração criadas:', ofertas.length);
    
    // Força visibilidade da seção
    const section = document.querySelector('#ofertas-especiais');
    if (section) {
        section.style.display = 'block';
        section.style.visibility = 'visible';
    }
    
    return true;
}

// Auto-execução para teste
console.log('🚀 Script de teste de cliques carregado!');
console.log('📋 Comandos disponíveis:');
console.log('  testeCompletoCliques() - Simula exatamente os cliques do usuário');
console.log('  criarOfertasDemo() - Cria ofertas de demonstração diretamente');

// Executa teste após 3 segundos automaticamente
setTimeout(() => {
    console.log('\n🎬 Executando teste automático em 3 segundos...');
    testeCompletoCliques();
}, 3000);