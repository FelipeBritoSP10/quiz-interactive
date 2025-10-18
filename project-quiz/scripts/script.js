// Captura o botão e o input
const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('usernameInput');

// Ao clicar em "Iniciar quiz"
startBtn.addEventListener('click', () => {
  const nome = usernameInput.value.trim();

  // Verifica se o usuário preencheu o nome
  if (nome === '') {
    usernameInput.classList.add('input-error');
    usernameInput.placeholder = '⚠️ Digite seu nome';
    usernameInput.focus();

    setTimeout(() => {
      usernameInput.classList.remove('input-error');
      usernameInput.placeholder = 'Digite seu nome aqui';
    }, 1500);
    return;
  }

  // Salva o nome no armazenamento local
  localStorage.setItem('username', nome);

  // Redireciona para a tela do quiz (agora dentro da pasta pages)
  window.location.href = './pages/quiz.html';
});
