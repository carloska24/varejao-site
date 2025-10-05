(function(){
  const boot=()=>{
  // Fallback inteligente de imagem: tenta .png -> .jpg -> .jpeg antes do logo
  window.handleImgError = function(img){
    try{
      const src = img.getAttribute('src')||'';
      const m = src.match(/^(.*)\.([a-zA-Z0-9]+)(\?.*)?$/);
      if(!m){ img.onerror=null; img.src='../img/logo.svg'; return; }
      const base=m[1]; const cur=(m[2]||'').toLowerCase();
      const tried = (img.dataset.tried||'').split(',').filter(Boolean);
      if(cur && !tried.includes(cur)) tried.push(cur);
      const cand = ['png','jpg','jpeg'];
      for(const ext of cand){
        if(ext===cur) continue; if(tried.includes(ext)) continue;
        img.dataset.tried = tried.concat(ext).join(',');
        img.src = `${base}.${ext}`;
        return;
      }
    }catch(_){/* ignore */}
    img.onerror=null; img.src='../img/logo.svg';
  };
  // Dados simples
  const products=[
    {id:'frt-mrg',name:'Morango',img:'../img/products/morango.png',price:7.99,category:'frutas'},
    {id:'frt-bnn',name:'Banana',img:'../img/products/banana-prata.png',price:5.99,category:'frutas',
      variants:[
        {id:'frt-bnn-nan',name:'Nanica',img:'../img/products/banana-nanica.png',price:5.49},
        {id:'frt-bnn-pra',name:'Prata',img:'../img/products/banana-prata.png',price:5.99}
      ]
    },
    {id:'frt-mca',name:'Maçã',img:'../img/products/maca-gala.png',price:8.99,category:'frutas'},
    {id:'leg-tmt',name:'Tomate Italiano',img:'../img/products/tomate-italiano.png',price:8.50,category:'legumes'},
    {id:'leg-cen',name:'Cenoura',img:'../img/products/cenoura.jpg',price:3.99,category:'legumes'},
    {id:'vrd-brc',name:'Brócolis Ninja',img:'../img/products/brocolis-ninja.jpg',price:6.50,category:'verduras'}
  ];
  // Estado do carrinho
  let cart = JSON.parse(localStorage.getItem('cleanCart')||'[]');

  // Helpers de persistência para Ofertas
  const defaultDeals=()=>({
    deals:[
      {productId:'frt-mrg',discount:35,end:Date.now()+2*60*60*1000,orig:7.99,stock:18,maxStock:18,title:'Morango Docinho',desc:'Lote premium, doce e fresco. Ideal para sobremesas.'},
      {productId:'frt-mca',discount:30,end:Date.now()+6*60*60*1000,orig:8.99,stock:28,maxStock:28,title:'Maçã Gala Crocante',desc:'Textura crocante e sabor equilibrado para o dia a dia.'},
  {productId:'frt-bnn-pra',discount:25,end:Date.now()+3*60*60*1000,orig:5.99,stock:24,maxStock:24,title:'Banana Prata',desc:'Ideal para vitaminas e lanches.'}
    ]
  });
  const loadDeals=()=>{
    try{
      const raw=localStorage.getItem('cleanDeals');
      if(!raw) return null;
      const data=JSON.parse(raw);
      // Sanitiza datas e estoques
      if(!data||!Array.isArray(data.deals)) return null;
      return data;
    }catch{ return null; }
  };
  const saveDeals=(data)=>{ localStorage.setItem('cleanDeals',JSON.stringify(data)); };
  // Reset opcional via ?reset=1
  try{
    const usp=new URLSearchParams(location.search);
    if(usp.get('reset')==='1'){
      localStorage.removeItem('cleanCart');
      localStorage.removeItem('cleanDeals');
      cart=[];
    }
  }catch{}
  let marketing = loadDeals() || defaultDeals();
  // Migração/mesclagem com defaults para garantir estoque e metadados
  try{
    const def = defaultDeals();
    marketing.deals = (marketing.deals||[]).map(d=>{
      const base = (def.deals||[]).find(x=>x.productId===d.productId) || {};
      const stock = (typeof d.stock==='number')? d.stock : (typeof base.stock==='number'? base.stock : 0);
      const maxStock = (typeof d.maxStock==='number')? d.maxStock : (typeof base.maxStock==='number'? base.maxStock : stock);
      return {
        title: d.title??base.title,
        desc: d.desc??base.desc,
        productId: d.productId,
        discount: d.discount,
        end: d.end,
        orig: d.orig,
        stock,
        maxStock
      };
    });
    saveDeals(marketing);
  }catch{}

  // Util
  const qs=s=>document.querySelector(s);
  const qsa=s=>Array.from(document.querySelectorAll(s));
  const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const findDealForId=(id)=> (marketing.deals||[]).find(d=>d.productId===id) || null;
  const getVariantById=(vid)=>{
    for(const p of products){
      if(p.variants){
        const v=p.variants.find(v=>v.id===vid);
        if(v) return {base:p, variant:v};
      }
      if(p.id===vid) return {base:p, variant:null};
    }
    return null;
  };
  const getDisplayItem=(p, selectedVariantId)=>{
    let variant=null;
    if(p.variants){ variant = p.variants.find(v=>v.id===selectedVariantId) || p.variants[0]; }
    const item = variant ? { id: variant.id, name: `${p.name} (${variant.name})`, img: variant.img, price: variant.price } : { id: p.id, name: p.name, img: p.img, price: p.price };
    const deal = findDealForId(item.id) || findDealForId(p.id);
    const left = deal? (deal.end - Date.now()) : 0;
    const active = deal && left>0 && (deal.stock??0)>0;
    const nowPrice = active? +(deal.orig * (1-deal.discount/100)).toFixed(2) : item.price;
    const wasPrice = active? deal.orig : null;
    const pct = active? deal.discount : null;
    return { item:{...item, price: nowPrice}, deal, wasPrice, pct, active };
  };
  // Métricas locais simples
  const metrics = JSON.parse(localStorage.getItem('cleanMetrics')||'{}');
  const incMetric=(k,n=1)=>{ metrics[k]=(metrics[k]||0)+n; localStorage.setItem('cleanMetrics',JSON.stringify(metrics)); };

  // Render produtos
  const renderProducts=(list)=>{
    const el=qs('#produtos-grid');
    el.innerHTML=list.map(p=>{
      const disp = getDisplayItem(p);
      const imgSrc = disp.item.img;
      const title = p.name;
      const badge = disp.pct? `<span class="badge-discount">-${disp.pct}%</span>` : '';
      const was = disp.wasPrice? `<span class=\"was\">De ${money(disp.wasPrice)}</span>` : '';
      const variantSelect = p.variants? `<div class=\"variant-row\"><select class=\"variant-select\">${p.variants.map(v=>`<option value=\"${v.id}\">${v.name}</option>`).join('')}</select></div>` : '';
      return `
      <div class="card" data-id="${p.id}">
        <div class="card-media">
          ${badge}
          <img src="${imgSrc}" alt="${title}" class="card-img open-modal" loading="lazy" decoding="async" width="400" height="400" onerror="handleImgError(this)">
        </div>
        <div class="card-head">
          <h3 class="open-modal">${title}</h3>
          ${variantSelect}
        </div>
        <div class="price-wrap">
          <span class="now">${money(disp.item.price)}</span>
          ${was}
        </div>
        <div class="card-actions">
          <div class="qty-row small">
            <button class="qty-btn card-minus" aria-label="Diminuir quantidade">-</button>
            <span class="qty">1</span>
            <button class="qty-btn card-plus" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="btn-primary btn-icon btn-add" title="Adicionar ao carrinho" aria-label="Adicionar ao carrinho">
            <i class="fa-solid fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>`;
    }).join('');
  };

  // Render ofertas
  const renderDeals=()=>{
    const grid=qs('#ofertas-grid');
    const html=marketing.deals.map(d=>{
      const ref = getVariantById(d.productId);
      const p = ref? (ref.variant? {id: ref.variant.id, name: `${ref.base.name} (${ref.variant.name})`, img: ref.variant.img} : {id: ref.base.id, name: ref.base.name, img: ref.base.img}) : products.find(x=>x.id===d.productId);
      const price=(d.orig*(1-d.discount/100));
      const pct=d.discount;
      const left=d.end-Date.now();
      const hours=Math.floor(left/3600000);
      const minutes=Math.floor((left%3600000)/60000);
      const ended = left<=0;
      const type = ended? 'ENCERRADA' : left<30*60000? 'URGENTE' : left<2*3600000? 'ACELERE' : 'ATIVO';
      const urgentClass = (!ended && left<30*60000)? ' urgent' : '';
      const max=d.maxStock??d.stock??0;
      const stock=d.stock??0;
      const stockPct = max>0? Math.max(0, Math.min(100, Math.floor((stock/max)*100))) : 0;
      const stockColor = stockPct<30? 'linear-gradient(90deg,#ff3b3b,#ff6a00)' : stockPct<60? 'linear-gradient(90deg,#ffb300,#ff9800)' : 'linear-gradient(90deg,#2ecc71,#27ae60)';
      const disabled = ended || stock<=0;
      const btnLabel = ended? 'Encerrada' : stock<=0? 'Esgotado' : 'Garantir agora';
      return `<div class="deal${urgentClass}" data-id="${d.productId}">
        <div class="badges">
          <span class="badge-discount">-${pct}%</span>
          <span class="badge-type">${type}</span>
        </div>
  <div class="img"><img src="${p? p.img: ''}" alt="${p? p.name: 'Produto'}" loading="lazy" decoding="async" width="800" height="600" onerror="handleImgError(this)"></div>
        <div class="content">
          <h4>${d.title||(p? p.name: '')}</h4>
          <div class="desc">${d.desc||'Seleção premium fresquíssima. Aproveite enquanto dura.'}</div>
          <div class="prices"><span class="now">${money(+price)}</span><span class="was">De ${money(d.orig)}</span></div>
          <div class="stock">
            <div class="label"><i class="fa-solid fa-box"></i> Restam ${Math.max(0,stock)} unidades</div>
            <div class="bar"><div class="fill" style="width:${stockPct}%; background:${stockColor}"></div></div>
          </div>
          <div class="cta">
            <button class="btn-cta primary btn-garantir" ${disabled?'disabled':''}>${btnLabel}</button>
            <button class="btn-cta secondary btn-detalhes">Detalhes</button>
          </div>
        </div>
      </div>`;
    }).join('');
    grid.innerHTML=html;
  };

  // Timer simples
  const startCountdown=()=>{
    const h=qs('#t-h'),m=qs('#t-m'),s=qs('#t-s');
    const tick=()=>{
      // menor tempo restante entre as ofertas
      const leftMin = Math.max(0, Math.min(...marketing.deals.map(d=>d.end - Date.now())));
      const hh=Math.floor(leftMin/3600000);
      const mm=Math.floor((leftMin%3600000)/60000);
      const ss=Math.floor((leftMin%60000)/1000);
      h.textContent=String(hh).padStart(2,'0');
      m.textContent=String(mm).padStart(2,'0');
      s.textContent=String(ss).padStart(2,'0');
    };
    tick();
    setInterval(()=>{tick(); renderDeals();},1000);
  };

  // Carrinho
  const saveCart=()=>{
    localStorage.setItem('cleanCart',JSON.stringify(cart));
    updateCartBadge();
  };
  const updateCartBadge=()=>{
    const count = cart.reduce((s,i)=>s+i.qty,0);
    qs('#cart-count').textContent = count;
    qs('#cart-count').style.display = count>0?'inline-flex':'none';
  };
  const cartTotal=()=>cart.reduce((s,i)=>s+i.price*i.qty,0);
  const renderCart=()=>{
    const wrap=qs('#cart-items');
    if(!wrap) return;
    if(cart.length===0){ wrap.innerHTML='<p style="color:#777">Seu carrinho está vazio.</p>'; qs('#cart-total').textContent=money(0); return; }
    wrap.innerHTML = cart.map(i=>`
      <div class="cart-item" data-id="${i.id}">
  <img src="${i.img}" alt="${i.name}" width="56" height="56" loading="lazy" decoding="async" onerror="handleImgError(this)">
        <div style="flex:1">
          <div class="name">${i.name}</div>
          <div class="row">
            <button class="qty-btn btn-minus">-</button>
            <span class="qty">${i.qty}</span>
            <button class="qty-btn btn-plus">+</button>
            <span style="margin-left:auto">${money(i.price*i.qty)}</span>
          </div>
        </div>
        <button class="icon-btn btn-remove" aria-label="Remover"><i class="fa-solid fa-trash" style="color:#ff4757"></i></button>
      </div>
    `).join('');
    qs('#cart-total').textContent = money(cartTotal());
  };
  const addToCart=(p,qty=1)=>{
    const idx = cart.findIndex(x=>x.id===p.id);
    if(idx>=0) cart[idx].qty += qty; else cart.push({id:p.id,name:p.name,img:p.img,price:p.price,qty});
    saveCart();
    toast(`${p.name} adicionado ao carrinho`);
  };
  const removeFromCart=(id)=>{ cart = cart.filter(x=>x.id!==id); saveCart(); };

  // Modal de produto
  let modalProduct=null;
  const openModal=(p)=>{
    const deal = marketing.deals.find(d=>d.productId===p.id);
    const left = deal? (deal.end - Date.now()) : 0;
    const active = deal && left>0 && (deal.stock??0)>0;
    const priceToShow = active? +(deal.orig * (1-deal.discount/100)).toFixed(2) : p.price;
    modalProduct={...p, price: priceToShow};
  const mi=qs('#modal-img'); if(mi){ mi.setAttribute('src', p.img); mi.setAttribute('loading','eager'); mi.setAttribute('decoding','sync'); mi.setAttribute('width','160'); mi.setAttribute('height','160'); mi.onerror=()=>window.handleImgError(mi); }
  qs('#modal-title').textContent=p.name; qs('#modal-price').textContent=money(priceToShow); qs('#qty').textContent='1';
    qs('#product-modal').classList.remove('hidden');
  };
  const closeModal=()=>{ qs('#product-modal').classList.add('hidden'); modalProduct=null; };

  // Toast
  let toastTimer=null; const toast=(msg)=>{ const t=qs('#toast'); t.textContent=msg; t.classList.remove('hidden'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add('hidden'),1800); };

  // Navegação SPA
  const sections={
    inicio:['#hero','#categorias','#produtos'],
    categorias:['#categorias','#produtos'],
    ofertas:['#ofertas'],
    receitas:['#receitas'],
    perfil:['#perfil']
  };
  const showSection=(name)=>{
    qsa('.section').forEach(s=>s.classList.add('hidden'));
    (sections[name]||[]).forEach(sel=>qs(sel).classList.remove('hidden'));
    qsa('.bottom-nav .nav-item').forEach(b=>b.classList.remove('active'));
    const btn=qs(`.bottom-nav .nav-item[data-section="${name}"]`);
    if(btn) btn.classList.add('active');
  try{ window.scrollTo({top:0,behavior:'auto'}); }catch(_){ window.scrollTo(0,0); }
    if(name==='ofertas'){ renderDeals(); startCountdown(); incMetric('views_ofertas'); }
  };

  // Eventos barra inferior
  qs('.bottom-nav').addEventListener('click',(e)=>{
    const btn=e.target.closest('.nav-item');
    if(!btn) return;
    e.preventDefault(); e.stopPropagation();
    showSection(btn.dataset.section);
  });

  // Filtros de categorias
  qs('#categorias').addEventListener('click',(e)=>{
    const btn=e.target.closest('.cat');
    if(!btn) return;
    e.preventDefault(); e.stopPropagation();
    const f=btn.dataset.filter;
    if(f==='promocoes'){ showSection('ofertas'); return; }
    const list=(f==='all')?products:products.filter(p=>p.category===f);
    renderProducts(list);
  });

  // Clicks em detalhes de oferta: métrica
  qs('#ofertas').addEventListener('click',(e)=>{
    if(e.target.closest('.btn-detalhes')){
      try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.click_detalhes=(m.click_detalhes||0)+1; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
    }
  }, true);

  // Clique nas ofertas: garantir/detalhes
  qs('#ofertas').addEventListener('click',(e)=>{
    const dealEl = e.target.closest('.deal');
    if(!dealEl) return;
    const pid = dealEl.dataset.id;
    const deal = marketing.deals.find(d=>d.productId===pid);
    if(!deal) return;
    const prod = products.find(p=>p.id===pid);
    if(!prod) return;
    if(e.target.closest('.btn-garantir')){
      e.preventDefault(); e.stopPropagation();
      const left = deal.end - Date.now();
      if(left<=0 || (deal.stock??0)<=0) return;
      const promoPrice = +(deal.orig * (1-deal.discount/100)).toFixed(2);
      // Item exclusivo de oferta para não conflitar com preço cheio
      const promoItem = { id: prod.id+':deal', name: prod.name+' (Oferta)', img: prod.img, price: promoPrice };
      addToCart(promoItem,1);
      // Decrementa estoque e persiste
      deal.stock = Math.max(0,(deal.stock??0)-1);
      saveDeals(marketing);
      renderDeals();
      // Métrica
      try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.cta_garantir=(m.cta_garantir||0)+1; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
    }
    if(e.target.closest('.btn-detalhes')){
      e.preventDefault(); e.stopPropagation();
      // Reaproveita modal de produto para mostrar detalhes da oferta
      const left = Math.max(0, deal.end - Date.now());
      const hh=Math.floor(left/3600000);
      const mm=Math.floor((left%3600000)/60000);
      const ss=Math.floor((left%60000)/1000);
      const promoPrice = +(deal.orig * (1-deal.discount/100)).toFixed(2);
      const temp = { ...prod, price: promoPrice };
      openModal(temp);
      // Atualiza descrição no modal (simples)
      const info = document.querySelector('.modal-info');
      if(info){
        const extra = document.createElement('div');
        extra.style.fontSize='12px';
        extra.style.color='#666';
        extra.style.marginTop='4px';
        extra.textContent = (deal.desc||'Oferta por tempo limitado')+` • Termina em ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
        // Evita duplicar
        const prev = info.querySelector('.deal-extra');
        if(prev) prev.remove();
        extra.className='deal-extra';
        info.appendChild(extra);
      }
    }
  });

  // Clique nos cards (quantidade/Adicionar/abrir modal)
  qs('#produtos').addEventListener('click',(e)=>{
    const card=e.target.closest('.card'); if(!card) return;
    const p=products.find(x=>x.id===card.dataset.id); if(!p) return;
    const qtyEl = card.querySelector('.qty');
    if(e.target.closest('.card-plus')){
      const q = Math.min(99, (+qtyEl.textContent||1)+1);
      qtyEl.textContent = String(q);
      return;
    }
    if(e.target.closest('.card-minus')){
      const q = Math.max(1, (+qtyEl.textContent||1)-1);
      qtyEl.textContent = String(q);
      return;
    }
    if(e.target.closest('.btn-add')){
      const q = Math.max(1, +qtyEl.textContent||1);
      const sel = card.querySelector('.variant-select');
      const disp = getDisplayItem(p, sel? sel.value: undefined);
      const item = disp.item;
      const deal = disp.deal;
      if(disp.active){
        const promoItem = { id: item.id+':deal', name: item.name+' (Oferta)', img: item.img, price: item.price };
        addToCart(promoItem, q);
        if(deal){ deal.stock = Math.max(0,(deal.stock??0)-q); saveDeals(marketing); renderDeals(); }
        try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.add_promo=(m.add_promo||0)+q; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
      }else{
        addToCart(item, q);
        try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.add_regular=(m.add_regular||0)+q; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
      }
      // microfeedback: desabilita brevemente e aplica uma animação leve
      const btn=e.target.closest('.btn-add');
      btn.classList.add('added');
      btn.disabled=true;
      setTimeout(()=>{ btn.classList.remove('added'); btn.disabled=false; },900);
      return;
    }
    if(e.target.closest('.open-modal')){
      const sel = card.querySelector('.variant-select');
      const disp = getDisplayItem(p, sel? sel.value: undefined);
      openModal(disp.item);
    }
  });

  // Mudança de variante atualiza imagem e preço do card
  qs('#produtos').addEventListener('change',(e)=>{
    const sel = e.target.closest('.variant-select'); if(!sel) return;
    const card = e.target.closest('.card'); if(!card) return;
    const p=products.find(x=>x.id===card.dataset.id); if(!p) return;
    const disp = getDisplayItem(p, sel.value);
    const img = card.querySelector('.card-img'); if(img) img.src = disp.item.img;
    const now = card.querySelector('.price-wrap .now'); if(now) now.textContent = money(disp.item.price);
    const was = card.querySelector('.price-wrap .was');
    if(disp.wasPrice){ if(was) { was.textContent = 'De '+money(disp.wasPrice); } else { const wrap=card.querySelector('.price-wrap'); wrap.insertAdjacentHTML('beforeend', `<span class="was">De ${money(disp.wasPrice)}</span>`);} }
    else { if(was) was.remove(); }
    const badge = card.querySelector('.badge-discount');
    if(disp.pct){ if(badge){ badge.textContent = `-${disp.pct}%`; } else { const media=card.querySelector('.card-media'); media.insertAdjacentHTML('afterbegin', `<span class="badge-discount">-${disp.pct}%</span>`);} }
    else { if(badge) badge.remove(); }
  });

  // Modal events
  qs('#modal-close').addEventListener('click',closeModal);
  qs('#product-modal').addEventListener('click',(e)=>{ if(e.target.classList.contains('modal-backdrop')) closeModal(); });
  qs('#qty-minus').addEventListener('click',()=>{ const q=Math.max(1, +qs('#qty').textContent-1); qs('#qty').textContent=String(q); });
  qs('#qty-plus').addEventListener('click',()=>{ const q=+qs('#qty').textContent+1; qs('#qty').textContent=String(q); });
  qs('#modal-add').addEventListener('click',()=>{
    if(!modalProduct) return; const q=+qs('#qty').textContent;
    // Checa oferta ativa
    const deal = marketing.deals.find(d=>d.productId===modalProduct.id);
    const left = deal? (deal.end - Date.now()) : 0;
    const active = deal && left>0 && (deal.stock??0)>0;
    if(active){
      const promoItem = { id: modalProduct.id+':deal', name: modalProduct.name+' (Oferta)', img: modalProduct.img, price: modalProduct.price };
      addToCart(promoItem,q);
      deal.stock = Math.max(0,(deal.stock??0)-q);
      saveDeals(marketing);
      renderDeals();
      try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.add_promo=(m.add_promo||0)+q; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
    }else{
      addToCart(modalProduct,q);
      try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.add_regular=(m.add_regular||0)+q; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{}
    }
    closeModal();
  });

  // Cart panel
  const openCart=()=>{ renderCart(); qs('#cart-panel').classList.remove('hidden'); };
  const closeCart=()=>{ qs('#cart-panel').classList.add('hidden'); };
  qs('#btn-cart').addEventListener('click',openCart);
  qs('#cart-close').addEventListener('click',closeCart);
  qs('#cart-clear').addEventListener('click',()=>{ cart=[]; saveCart(); renderCart(); });
  qs('#cart-checkout').addEventListener('click',()=>{ if(cart.length===0){ toast('Carrinho vazio'); return; } toast('Checkout indisponível (demo)'); });
  qs('#cart-items').addEventListener('click',(e)=>{
    const row=e.target.closest('.cart-item'); if(!row) return;
    const id=row.dataset.id; const item=cart.find(x=>x.id===id); if(!item) return;
    if(e.target.closest('.btn-minus')){ item.qty=Math.max(1,item.qty-1); }
    if(e.target.closest('.btn-plus')){ item.qty=item.qty+1; }
    if(e.target.closest('.btn-remove')){ removeFromCart(id); }
    saveCart(); renderCart();
  });

  // Inicialização
  renderProducts(products);
  showSection('inicio');
  updateCartBadge();
  // Notificações simples
  const btnNotify=qs('#btn-notify');
  if(btnNotify){ btnNotify.addEventListener('click',()=>{ toast('Você receberá alertas das melhores ofertas 🔔'); try{ const m=JSON.parse(localStorage.getItem('cleanMetrics')||'{}'); m.notify_click=(m.notify_click||0)+1; localStorage.setItem('cleanMetrics',JSON.stringify(m)); }catch{} }); }
  };
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }
})();
