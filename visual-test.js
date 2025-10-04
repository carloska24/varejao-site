// Script de demonstração visual dos problemas de navegação
console.log('🎯 INICIANDO DEMONSTRAÇÃO DE NAVEGAÇÃO');

// Função para destacar visualmente onde estamos clicando
const highlightElement = (element, color = 'red') => {
    if (element) {
        element.style.border = `3px solid ${color}`;
        element.style.boxShadow = `0 0 10px ${color}`;
        setTimeout(() => {
            element.style.border = '';
            element.style.boxShadow = '';
        }, 2000);
    }
};

// Função para mostrar status visual na tela
const showStatus = (message, type = 'info') => {
    const statusDiv = document.createElement('div');
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#4444ff'};
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        font-size: 14px;
    `;
    statusDiv.textContent = message;
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        document.body.removeChild(statusDiv);
    }, 3000);
    
    console.log(`📢 ${message}`);
};

// Função para demonstrar o problema
window.demonstrarProblema = () => {
    console.log('🔍 === DEMONSTRAÇÃO DO PROBLEMA ===');
    
    // 1. Verificar elementos
    const navItems = document.querySelectorAll('.nav-item');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const verTodasBtn = document.querySelector('.btn-ver-todas-ofertas');
    
    showStatus(`Nav items: ${navItems.length}`, 'info');
    showStatus(`Seção ofertas: ${!!ofertasSection}`, ofertasSection ? 'success' : 'error');
    showStatus(`Botão Ver Todas: ${!!verTodasBtn}`, verTodasBtn ? 'success' : 'error');
    
    // 2. Testar clique no botão "Ofertas" da navegação
    console.log('🎯 Testando clique no botão Ofertas...');
    const ofertasNavBtn = navItems[2]; // Terceiro botão
    
    if (ofertasNavBtn) {
        highlightElement(ofertasNavBtn, 'blue');
        showStatus('Clicando em: Ofertas (nav inferior)', 'info');
        
        // Estado antes do clique
        const beforeClick = {
            navActive: ofertasNavBtn.classList.contains('active'),
            sectionVisible: ofertasSection ? getComputedStyle(ofertasSection).display !== 'none' : false
        };
        
        console.log('Estado ANTES do clique:', beforeClick);
        
        // Clique
        ofertasNavBtn.click();
        
        // Estado depois do clique
        setTimeout(() => {
            const afterClick = {
                navActive: ofertasNavBtn.classList.contains('active'),
                sectionVisible: ofertasSection ? getComputedStyle(ofertasSection).display !== 'none' : false
            };
            
            console.log('Estado DEPOIS do clique:', afterClick);
            
            if (afterClick.navActive && afterClick.sectionVisible) {
                showStatus('✅ NAVEGAÇÃO FUNCIONOU!', 'success');
            } else {
                showStatus('❌ NAVEGAÇÃO FALHOU!', 'error');
                
                if (!afterClick.navActive) {
                    showStatus('Botão não ficou ativo', 'error');
                }
                if (!afterClick.sectionVisible) {
                    showStatus('Seção não ficou visível', 'error');
                }
            }
        }, 500);
    } else {
        showStatus('❌ Botão Ofertas não encontrado!', 'error');
    }
    
    // 3. Testar botão "Ver Todas as Ofertas" após 3 segundos
    setTimeout(() => {
        console.log('🔘 Testando botão "Ver Todas as Ofertas"...');
        
        if (verTodasBtn) {
            highlightElement(verTodasBtn, 'orange');
            showStatus('Clicando em: Ver Todas as Ofertas', 'info');
            
            verTodasBtn.click();
            
            setTimeout(() => {
                const sectionVisible = ofertasSection ? getComputedStyle(ofertasSection).display !== 'none' : false;
                const navActive = navItems[2] ? navItems[2].classList.contains('active') : false;
                
                if (sectionVisible && navActive) {
                    showStatus('✅ BOTÃO VER TODAS FUNCIONOU!', 'success');
                } else {
                    showStatus('❌ BOTÃO VER TODAS FALHOU!', 'error');
                }
            }, 500);
        } else {
            showStatus('❌ Botão Ver Todas não encontrado!', 'error');
        }
    }, 3000);
};

// Função para mostrar informações de debug na tela
window.mostrarDebugNaTela = () => {
    const debugDiv = document.createElement('div');
    debugDiv.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        font-family: monospace;
        font-size: 12px;
        max-width: 300px;
    `;
    
    const navItems = document.querySelectorAll('.nav-item');
    const ofertasSection = document.querySelector('#ofertas-especiais');
    const verTodasBtn = document.querySelector('.btn-ver-todas-ofertas');
    
    debugDiv.innerHTML = `
        <strong>🔍 DEBUG INFO</strong><br>
        Nav Items: ${navItems.length}<br>
        Ofertas Section: ${!!ofertasSection}<br>
        Ver Todas Btn: ${!!verTodasBtn}<br>
        <br>
        <button onclick="demonstrarProblema()" style="background:#4CAF50;color:white;border:none;padding:5px;border-radius:3px;cursor:pointer;">
            🎯 DEMONSTRAR PROBLEMA
        </button>
        <button onclick="document.body.removeChild(this.parentElement)" style="background:#f44336;color:white;border:none;padding:5px;border-radius:3px;cursor:pointer;margin-left:5px;">
            ❌ FECHAR
        </button>
    `;
    
    document.body.appendChild(debugDiv);
};

// Auto-executar após carregamento
setTimeout(() => {
    mostrarDebugNaTela();
    console.log('💡 Use demonstrarProblema() para ver o problema em ação!');
}, 2000);