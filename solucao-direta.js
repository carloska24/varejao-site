// Solução DIRETA para ofertas funcionarem
function mostrarTodasOfertas() {
    console.log('🎯 Função mostrarTodasOfertas() chamada');
    
    // Força a seção ofertas a aparecer
    const ofertasSection = document.querySelector('#ofertas-especiais');
    if (ofertasSection) {
        ofertasSection.style.display = 'block';
        ofertasSection.style.visibility = 'visible';
        ofertasSection.style.opacity = '1';
        ofertasSection.style.position = 'relative';
        ofertasSection.style.zIndex = '10';
        
        console.log('✅ Seção ofertas forçada a aparecer');
        
        // Esconde outras seções
        esconderOutrasSecoes();
        
        // Destaca o botão ofertas na navegação
        destacarBotaoOfertas();
        
        // Scroll para a seção
        ofertasSection.scrollIntoView({ behavior: 'smooth' });
        
        return true;
    } else {
        console.log('❌ Seção ofertas não encontrada');
        return false;
    }
}

function esconderOutrasSecoes() {
    // Esconde produtos
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) productGrid.style.display = 'none';
    
    // Esconde categorias
    const categories = document.querySelector('.categories');
    if (categories) categories.style.display = 'none';
    
    // Esconde outras seções
    const sections = document.querySelectorAll('section:not(#ofertas-especiais)');
    sections.forEach(section => {
        if (section.id !== 'ofertas-especiais') {
            section.style.display = 'none';
        }
    });
    
    console.log('📦 Outras seções escondidas');
}

function destacarBotaoOfertas() {
    // Remove destaque de todos os botões
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Destaca o botão ofertas (assumindo que é o 3º)
    if (navItems[2]) {
        navItems[2].classList.add('active');
        console.log('🎯 Botão ofertas destacado');
    }
}

// Substitui a navegação quebrada por uma que funciona
function navegacaoSimples(secao) {
    console.log('🧭 Navegação simples para:', secao);
    
    switch(secao) {
        case 'inicio':
            mostrarInicio();
            break;
        case 'categorias':
            mostrarCategorias();
            break;
        case 'ofertas':
            mostrarTodasOfertas();
            break;
        default:
            console.log('Seção desconhecida:', secao);
    }
}

function mostrarInicio() {
    // Esconde ofertas
    const ofertas = document.querySelector('#ofertas-especiais');
    if (ofertas) ofertas.style.display = 'none';
    
    // Mostra produtos
    const produtos = document.querySelector('.product-grid');
    if (produtos) produtos.style.display = 'grid';
    
    // Mostra categorias
    const categorias = document.querySelector('.categories');
    if (categorias) categorias.style.display = 'block';
    
    // Destaca botão início
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    if (navItems[0]) navItems[0].classList.add('active');
    
    console.log('🏠 Início mostrado');
}

function mostrarCategorias() {
    // Esconde ofertas
    const ofertas = document.querySelector('#ofertas-especiais');
    if (ofertas) ofertas.style.display = 'none';
    
    // Esconde produtos
    const produtos = document.querySelector('.product-grid');
    if (produtos) produtos.style.display = 'none';
    
    // Mostra categorias
    const categorias = document.querySelector('.categories');
    if (categorias) categorias.style.display = 'block';
    
    // Destaca botão categorias
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    if (navItems[1]) navItems[1].classList.add('active');
    
    console.log('📂 Categorias mostradas');
}

// Substitui os event listeners quebrados
function instalarNavegacaoFuncionando() {
    console.log('🔧 Instalando navegação que funciona...');
    
    // Remove listeners antigos e adiciona novos
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        // Remove listeners antigos
        item.removeEventListener('click', navegacaoAntiga);
        
        // Adiciona listener que funciona
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const secoes = ['inicio', 'categorias', 'ofertas', 'receitas', 'perfil'];
            const secao = secoes[index];
            
            console.log(`🖱️ Clique no botão ${index}: ${secao}`);
            
            if (secao) {
                navegacaoSimples(secao);
            }
        });
    });
    
    // Também adiciona ao botão "Ver Todas as Ofertas"
    const btnVerTodas = document.querySelector('.btn-ver-todas-ofertas');
    if (btnVerTodas) {
        btnVerTodas.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔥 Clique em Ver Todas as Ofertas');
            mostrarTodasOfertas();
        });
    }
    
    console.log('✅ Navegação funcionando instalada!');
}

// Auto-instalação
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Solução direta carregando...');
    
    // Aguarda um pouco para ter certeza que tudo carregou
    setTimeout(() => {
        instalarNavegacaoFuncionando();
        
        // Testa se as ofertas estão visíveis por padrão
        const ofertas = document.querySelector('#ofertas-especiais');
        if (ofertas && window.getComputedStyle(ofertas).display !== 'none') {
            console.log('✅ Ofertas já visíveis por padrão');
        } else {
            console.log('⚠️ Ofertas não visíveis, mas sistema pronto para mostrar');
        }
        
        console.log('🎯 Sistema pronto! Clique em "Ofertas" na navegação');
    }, 1000);
});

// Funções globais para debug
window.mostrarTodasOfertas = mostrarTodasOfertas;
window.navegacaoSimples = navegacaoSimples;
window.instalarNavegacaoFuncionando = instalarNavegacaoFuncionando;

console.log('💪 Solução direta de ofertas carregada!');
console.log('📋 Comandos disponíveis:');
console.log('  mostrarTodasOfertas() - Força ofertas visíveis');
console.log('  navegacaoSimples("ofertas") - Navega diretamente');
console.log('  instalarNavegacaoFuncionando() - Reinstala navegação');