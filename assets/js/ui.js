
(function(){
  const htmlHeader = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <a class="navbar-brand" href="index.html">Edelherz</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Navigation umschalten">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="index.html">Start</a></li>
          <li class="nav-item"><a class="nav-link" href="willkommen.html">Über&nbsp;uns</a></li>
          <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="checkout.html">Warenkorb</a></li>
          <li class="nav-item"><a class="nav-link" href="seitenindex.html">Index</a></li>
        </ul>
        <div class="d-flex align-items-center gap-2">
          <a href="checkout.html" class="btn btn-outline-primary">Warenkorb <span class="badge bg-primary ms-1" id="cartCount">0</span></a>
          <a href="register.html" class="btn btn-primary" id="btnRegister">Registrieren</a>
          <div class="dropdown d-none" id="userMenu">
            <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="userBtn">Konto</button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header" id="helloUser">Hallo</h6></li>
              <li><a class="dropdown-item" href="shop.html">Zum Shop</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item" id="btnLogout">Abmelden</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>`;

  const htmlFooter = `
  <footer class="border-top mt-5 py-4 small bg-light">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <div>© ${new Date().getFullYear()} Edelherz</div>
      <div class="text-muted">Made with Bootstrap 5 • Demo-Store</div>
    </div>
  </footer>`;

  function inject(id, html){
    const spot = document.getElementById(id);
    if(spot) { spot.innerHTML = html; }
    else {
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.prepend(div);
    }
  }

  function currentUser(){
    try { return JSON.parse(localStorage.getItem('currentUser')||'null'); } catch(e){ return null; }
  }

  function refreshUserUI(){
    const user = currentUser();
    const btnReg = document.getElementById('btnRegister');
    const userMenu = document.getElementById('userMenu');
    const hello = document.getElementById('helloUser');
    const userBtn = document.getElementById('userBtn');
    if(user){
      if(btnReg) btnReg.classList.add('d-none');
      if(userMenu) userMenu.classList.remove('d-none');
      if(hello) hello.textContent = `Hallo, ${user.firstName}`;
      if(userBtn) userBtn.textContent = user.firstName;
      const logout = document.getElementById('btnLogout');
      if(logout){
        logout.onclick = function(){
          localStorage.removeItem('currentUser');
          refreshUserUI();
          location.href = 'index.html';
        };
      }
    } else {
      if(btnReg) btnReg.classList.remove('d-none');
      if(userMenu) userMenu.classList.add('d-none');
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    inject('app-header', htmlHeader);
    inject('app-footer', htmlFooter);
    refreshUserUI();
  });
})();