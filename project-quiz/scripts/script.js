const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('usernameInput'); 

startBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim(); 

  if (username === '') {
    usernameInput.classList.add('input-error');
    usernameInput.placeholder = 'Digite seu nome';
    usernameInput.focus();

    setTimeout(() => {
      usernameInput.classList.remove('input-error');
      usernameInput.placeholder = 'Digite seu nome';
    }, 1000);
    return;
  }

  alert(`Bem-vindo, ${username}! Prepare-se para testar seus conhecimentos! 🚀`);

});
