// Espera o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os cards de produto
    const productCards = document.querySelectorAll('.product-card');

    // Para cada card de produto, adiciona a lógica dos botões
    productCards.forEach(card => {
        const minusButton = card.querySelector('.quantity-btn:first-child');
        const plusButton = card.querySelector('.quantity-btn:last-child');
        const quantitySpan = card.querySelector('.quantity');
        const addToCartButton = card.querySelector('.add-to-cart-btn');

        let quantity = 1;

        // Evento de clique no botão de diminuir (-)
        minusButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });

        // Evento de clique no botão de aumentar (+)
        plusButton.addEventListener('click', () => {
            quantity++;
            quantitySpan.textContent = quantity;
        });

        // Evento de clique no botão de adicionar ao carrinho
        addToCartButton.addEventListener('click', () => {
            const productName = card.querySelector('h3').textContent;
            alert(`${quantity} unidade(s) de ${productName} adicionada(s) ao carrinho!`);
            // Aqui você pode adicionar uma lógica mais complexa no futuro
        });
    });

    // --- LÓGICA DO FILTRO DE CATEGORIAS ---

    // Seleciona todos os botões de filtro de categoria
    const filterButtons = document.querySelectorAll('.category-item');
    // Seleciona todos os cards de produto
    const allProductCards = document.querySelectorAll('.product-card');

    // Adiciona um evento de clique para cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active-category' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active-category'));
            // Adiciona a classe 'active-category' apenas ao botão clicado
            button.classList.add('active-category');

            // Pega o valor do filtro do atributo 'data-filter'
            const filter = button.dataset.filter;

            // Itera sobre cada card de produto para mostrar ou esconder
            allProductCards.forEach(card => {
                // Se o filtro for 'all' ou se a categoria do card corresponder ao filtro
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hide'); // Mostra o card
                } else {
                    card.classList.add('hide'); // Esconde o card
                }
            });
        });
    });

    // --- LÓGICA DO MENU LATERAL (SIDENAV) ---

    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidenav = document.querySelector('.sidenav');
    const overlay = document.querySelector('.overlay');

    const openMenu = () => {
        sidenav.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        sidenav.classList.remove('open');
        overlay.classList.remove('active');
    };

    openMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // --- LÓGICA DOS LINKS DO MENU ---

    const menuLinkInicio = document.getElementById('menu-link-inicio');
    const menuLinkOfertas = document.getElementById('menu-link-ofertas');
    const menuLinkConta = document.getElementById('menu-link-conta');
    const ofertasSection = document.getElementById('ofertas-section');

    // Link "Início"
    menuLinkInicio.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMenu();
    });

    // Link "Ofertas"
    menuLinkOfertas.addEventListener('click', (e) => {
        e.preventDefault();
        ofertasSection.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    });

    // Link "Minha Conta"
    menuLinkConta.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Funcionalidade "Minha Conta" será implementada em breve!');
        closeMenu();
    });
});