// Captura elementos
const nomeSpan = document.querySelector("header h1 span");
const nivelSpan = document.querySelector("header h2 span");
const resultadoSection = document.querySelector("main section");
const botaoReiniciar = document.getElementById("btn-reiniciar");
const ctx = document.getElementById("chart");

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
const erros = questions.length - score;
let nivel;
if (porcentagem === 100) nivel = "Excelente 💪";
else if (porcentagem >= 70) nivel = "Muito bom 🚀";
else if (porcentagem >= 40) nivel = "Regular 🧠";
else nivel = "Precisa melhorar 📚";

nivelSpan.textContent = nivel;

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Acertos", "Erros"],
    backgroundColor: [
        "#ff00eaff", // New color for Acertos (bright green)
        "#000000ff"  // New color for Erros (orange-red)
      ],
    datasets: [{
      data: [score, erros],
      backgroundColor: [
        "#4CAF50",
        "#ff0000ff" 
      ],
      hoverOffset: 4
    }]
  },
  options: {
    cutout: "50%", // opcional
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          color: "#fff",
          padding: 20,
          boxWidth: 20,
          boxHeight: 20
        } 
       },
      tooltip: { enabled: true }
    }
  },
  plugins: [{
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();
      const fontSize = (height / 180).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const text = `${Math.round((score / questions.length) * 100)}%`;
      ctx.fillText(text, width / 2, height / 2 - 5); 
      ctx.restore();
    }
  }]
});

// Monta resumo das questões com palpite separado
resultadoSection.innerHTML = `<h2>Você acertou ${score} de ${questions.length} perguntas</h2>`;

questions.forEach((q, i) => {
  const userAnswer = userAnswers[i] !== null && userAnswers[i] !== undefined ? q.options[userAnswers[i]] : "Não respondida";
  const acertou = userAnswer === q.correct;

  const questaoDiv = document.createElement("div");
  questaoDiv.classList.add("questao", acertou ? "acertou" : "errou");

  questaoDiv.innerHTML = `
    <h3>${q.title}</h3>
    <p>${q.text}</p>
    <p>Seu palpite: ${acertou ? "✅" : "❌"} ${userAnswer}</p>
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
  
  // Redireciona para a página do quiz
  window.location.href = "./quiz.html";
});
