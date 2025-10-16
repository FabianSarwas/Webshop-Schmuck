
(function(){
  function bufferToHex(buffer){
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('');
  }
  async function sha256(text){
    const enc = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', enc);
    return bufferToHex(hash);
  }
  function getUsers(){
    try { return JSON.parse(localStorage.getItem('users')||'[]'); } catch(e){ return []; }
  }
  function saveUsers(list){
    localStorage.setItem('users', JSON.stringify(list));
  }
  function emailTaken(email){
    const users = getUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  async function registerUser(form){
    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = (data.firstName||'').trim();
    const lastName = (data.lastName||'').trim();
    const email = (data.email||'').trim();
    const password = data.password||'';
    const confirm = data.confirm||'';
    const accept = !!data.accept;

    const err = form.querySelector('.form-error');
    const ok = form.querySelector('.form-ok');
    if(err) err.classList.add('d-none');
    if(ok) ok.classList.add('d-none');

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!firstName || !lastName) return showError('Bitte Vor- und Nachname angeben.');
    if(!emailRe.test(email)) return showError('Bitte eine gültige E-Mail angeben.');
    if(password.length < 8 || !/\d/.test(password)) return showError('Passwort mindestens 8 Zeichen und eine Zahl.');
    if(password !== confirm) return showError('Passwörter stimmen nicht überein.');
    if(!accept) return showError('Bitte AGB/Datenschutz akzeptieren.');
    if(emailTaken(email)) return showError('Diese E-Mail ist bereits registriert.');

    const hash = await sha256(password);
    const users = getUsers();
    const user = {
      id: Date.now(),
      firstName, lastName, email,
      passwordHash: hash,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify({ id:user.id, firstName, lastName, email }));
    if(ok){
      ok.textContent = 'Registrierung erfolgreich!';
      ok.classList.remove('d-none');
    }
    setTimeout(()=>{
      window.location.href = 'shop.html';
    }, 600);
    function showError(msg){
      if(err){
        err.textContent = msg;
        err.classList.remove('d-none');
      } else {
        alert(msg);
      }
      return false;
    }
  }

  function wireForm(id){
    const form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      registerUser(form);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    wireForm('registerForm');     // on index.html
    wireForm('registerFormPage'); // on register.html
  });
})();
