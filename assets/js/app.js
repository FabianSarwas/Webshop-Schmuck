
(function(){
  const CURRENCY = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'});

  function getCart(){
    try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
  }
  function cartCount(){
    return getCart().reduce((a,i)=>a+i.qty,0);
  }
  function updateCartBadge(){
    const el = document.getElementById('cartCount');
    if(el) el.textContent = cartCount();
  }
  function addToCart(prod, variant){
    const cart = getCart();
    const key = prod.sku + '|' + (variant||'');
    const found = cart.find(i => i.key === key);
    if(found){
      found.qty += 1;
    } else {
      cart.push({ key, id: prod.id, sku: prod.sku, name: prod.name, price: prod.preis_eur, mwst: prod.mwst_satz, variant: variant||'', qty: 1 });
    }
    saveCart(cart);
  }
  function removeFromCart(key){
    saveCart(getCart().filter(i => i.key !== key));
  }
  function setQty(key, qty){
    const cart = getCart();
    const it = cart.find(i=>i.key===key);
    if(it){
      it.qty = Math.max(1, parseInt(qty||1,10));
      saveCart(cart);
    }
  }

  function renderProducts(){
    const grid = document.getElementById('productGrid');
    if(!grid || !window.PRODUCTS){ return; }
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const cat = (document.getElementById('filterCategory')?.value || '');
    const sort = (document.getElementById('sortBy')?.value || 'name_asc');

    let list = window.PRODUCTS.slice().filter(p => p.verfuegbar);
    if(cat) list = list.filter(p => p.kategorie === cat);
    if(q){
      list = list.filter(p =>
        (p.name||'').toLowerCase().includes(q) ||
        (p.beschreibung||'').toLowerCase().includes(q) ||
        (p.material||'').toLowerCase().includes(q) ||
        (p.farbe||'').toLowerCase().includes(q) ||
        (p.tags||[]).join(' ').toLowerCase().includes(q)
      );
    }

    const sorters = {
      'name_asc': (a,b)=>a.name.localeCompare(b.name,'de'),
      'name_desc': (a,b)=>b.name.localeCompare(a.name,'de'),
      'price_asc': (a,b)=>a.preis_eur-b.preis_eur,
      'price_desc': (a,b)=>b.preis_eur-a.preis_eur,
    };
    list.sort(sorters[sort] || sorters.name_asc);

    grid.innerHTML = list.map(p => {
      const img = (p.bilder && p.bilder[0]) || '';
      const variantSel = (p.varianten && p.varianten.length) ?
        `<select class="form-select form-select-sm mb-2" data-variant="${p.sku}">
           ${p.varianten.map(v=>`<option>${v}</option>`).join('')}
         </select>` : '';
      return `<div class="col">
        <div class="card h-100">
          ${img ? `<img src="${img}" class="card-img-top" alt="${p.name}">` : ''}
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <p class="text-muted mb-1">${p.kategorie} • ${p.material}${p.stein? ' • '+p.stein : ''}</p>
            <div class="mt-auto">
              ${variantSel}
              <div class="d-flex justify-content-between align-items-center">
                <strong>${CURRENCY.format(p.preis_eur)}</strong>
                <button class="btn btn-sm btn-primary" data-add="${p.sku}">In den Warenkorb</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    grid.addEventListener('click', function(ev){
      const btn = ev.target.closest('[data-add]');
      if(!btn) return;
      const sku = btn.getAttribute('data-add');
      const prod = window.PRODUCTS.find(p=>p.sku===sku);
      let variant = '';
      if(prod && prod.varianten && prod.varianten.length){
        const sel = grid.querySelector(`select[data-variant="${sku}"]`);
        if(sel) variant = sel.value;
      }
      if(prod){
        addToCart(prod, variant);
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        btn.textContent = 'Hinzugefügt';
        setTimeout(()=>{
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-success');
          btn.textContent = 'In den Warenkorb';
        }, 900);
      }
    });
  }

  function wireShopFilters(){
    const ids = ['searchInput','filterCategory','sortBy'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if(el){
        el.addEventListener('input', renderProducts);
        el.addEventListener('change', renderProducts);
      }
    });
    const hash = new URL(window.location.href).hash;
    if(hash && hash.includes('kategorie=')){
      const val = decodeURIComponent(hash.split('kategorie=')[1]);
      const sel = document.getElementById('filterCategory');
      if(sel){ sel.value = val; }
    }
    renderProducts();
  }

  function renderCart(){
    const tbody = document.getElementById('cartTableBody');
    if(!tbody) return;
    const cart = getCart();
    const rows = cart.map(i => {
      const subtotal = i.qty * i.price;
      return `<tr data-key="${i.key}">
        <td><div class="fw-medium">${i.name}</div><div class="text-muted small">${i.sku}</div></td>
        <td>${i.variant || '-'}</td>
        <td class="text-end">${CURRENCY.format(i.price)}</td>
        <td class="text-center">
          <div class="input-group input-group-sm">
            <button class="btn btn-outline-secondary" data-dec>−</button>
            <input class="form-control text-center" style="max-width:60px" value="${i.qty}" data-qty>
            <button class="btn btn-outline-secondary" data-inc>+</button>
          </div>
        </td>
        <td class="text-end">${CURRENCY.format(subtotal)}</td>
        <td class="text-end"><button class="btn btn-sm btn-link text-danger" data-remove>Entfernen</button></td>
      </tr>`;
    }).join('');
    tbody.innerHTML = rows || `<tr><td colspan="6" class="text-center text-muted py-4">Dein Warenkorb ist leer.</td></tr>`;

    let subtotal = 0;
    cart.forEach(i => subtotal += i.qty * i.price);
    const vat = cart.reduce((acc,i)=> acc + (i.qty * i.price) * ( (i.mwst||0.19) / (1+(i.mwst||0.19)) ), 0);
    const total = subtotal;
    const fmt = x => CURRENCY.format(Math.max(0,x));
    const elS = document.getElementById('sumSubtotal');
    const elV = document.getElementById('sumVat');
    const elT = document.getElementById('sumTotal');
    if(elS) elS.textContent = fmt(subtotal - vat);
    if(elV) elV.textContent = fmt(vat);
    if(elT) elT.textContent = fmt(total);

    tbody.addEventListener('click', function(ev){
      const tr = ev.target.closest('tr');
      if(!tr) return;
      const key = tr.getAttribute('data-key');
      if(ev.target.matches('[data-inc]')){
        const cart = getCart();
        const it = cart.find(i=>i.key===key);
        if(it){ it.qty+=1; saveCart(cart); renderCart(); }
      }
      if(ev.target.matches('[data-dec]')){
        const cart = getCart();
        const it = cart.find(i=>i.key===key);
        if(it){ it.qty=Math.max(1,it.qty-1); saveCart(cart); renderCart(); }
      }
      if(ev.target.matches('[data-remove]')){
        removeFromCart(key);
        renderCart();
      }
    });
    tbody.addEventListener('change', function(ev){
      const input = ev.target.closest('[data-qty]');
      if(!input) return;
      const tr = ev.target.closest('tr');
      const key = tr.getAttribute('data-key');
      setQty(key, parseInt(input.value||1,10));
      renderCart();
    });

    const btn = document.getElementById('btnCheckout');
    if(btn){
      btn.onclick = function(){
        alert('Vielen Dank! (Beispiel) Hier würde der Kassenprozess starten.');
      };
    }
  }

  document.addEventListener('DOMContentLoaded', updateCartBadge);
  window.initShop = function(){ updateCartBadge(); wireShopFilters(); };
  window.initCheckout = function(){ updateCartBadge(); renderCart(); };
})();
