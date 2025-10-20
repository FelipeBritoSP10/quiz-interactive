// Captura elementos
const nomeSpan = document.querySelector("header h1 span");
const nivelSpan = document.querySelector("header h2 span");
const resultadoSection = document.querySelector("main section");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Recupera dados do localStorage
const nome = localStorage.getItem("username") || "Jogador";
const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
const questions = JSON.parse(localStorage.getItem("questions")) || [];

// Exibe nome do jogador
nomeSpan.textContent = nome;

// Calcula acertos
let score = 0;
userAnswers.forEach((index, i) => {
  if (index !== null && questions[i].options[index] === questions[i].correct) score++;
});

// Define nível
const porcentagem = (score / questions.length) * 100;
let nivel;
if (porcentagem === 100) nivel = "Excelente 💪";
else if (porcentagem >= 70) nivel = "Muito bom 🚀";
else if (porcentagem >= 40) nivel = "Regular 🧠";
else nivel = "Precisa melhorar 📚";

nivelSpan.textContent = nivel;

// Monta resumo das questões com palpite separado
resultadoSection.innerHTML = `<h2>Você acertou ${score} de ${questions.length} perguntas</h2>`;

questions.forEach((q, i) => {
  const userAnswer = userAnswers[i] !== null && userAnswers[i] !== undefined ? q.options[userAnswers[i]] : "Não respondida";
  const acertou = userAnswer === q.correct;

  const questaoDiv = document.createElement("div");
  questaoDiv.classList.add("questao");
  questaoDiv.classList.add(acertou ? "acertou" : "errou");

  questaoDiv.innerHTML = `
    <h3>${q.title}</h3>
    <p>${q.text}</p>
    <p>Seu palpite: ${acertou ? "✅ " : "❌ "} ${userAnswer}</p>
    ${!acertou ? `<p>Resposta correta: ${q.correct}</p>` : ""}
  `;

  resultadoSection.appendChild(questaoDiv);
});

// Botão reiniciar
botaoReiniciar.addEventListener("click", () => {
  localStorage.removeItem("quizScore");
  localStorage.removeItem("userAnswers");
  localStorage.removeItem("questions");
  localStorage.removeItem("quizFinished");
  window.location.href = "./index.html";
});
