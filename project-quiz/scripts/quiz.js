const nome = localStorage.getItem('username');
const saudacao = document.getElementById('saudacao');
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const confirmBtn = document.getElementById("confirm");
const counter = document.getElementById("question-counter");
const resultadoEl = document.getElementById("result");
const mensagemFinal = document.getElementById("finalMessage");
const quizContent = document.getElementById("quiz-content");
const timeEl = document.getElementById("time");

saudacao.textContent = nome ? `Boa sorte, ${nome}! 🚀` : 'Bem-vindo ao Quiz!';

// Perguntas
const questions = [
  {
    title: "Questão 01",
    text: "Qual é a principal função da linguagem HTML?",
    options: ["Criar estilos para páginas web", "Adicionar interatividade com scripts", "Estruturar o conteúdo de páginas web", "Armazenar dados em bancos de dados"],
    correct: "Estruturar o conteúdo de páginas web"
  },
  {
    title: "Questão 02",
    text: "Qual das tags a seguir é usada para iniciar uma página HTML corretamente?",
    options: ["<start>", "<body>", "<begin>", "<!DOCTYPE html>"],
    correct: "<!DOCTYPE html>"
  },
  {
    title: "Questão 03",
    text: "Em qual parte da estrutura HTML são colocadas as informações como título da página e links para estilos (CSS)?",
    options: ["<footer>", "<body>", "<head>", "<section>"],
    correct: "<head>"
  },
  {
    title: "Questão 04",
    text: "Qual é a principal função do JavaScript no desenvolvimento web?",
    options: ["Definir o layout da página", "Criar o conteúdo HTML", "Adicionar interatividade à página", "Armazenar dados no banco de dados"],
    correct: "Adicionar interatividade à página"
  },
  {
    title: "Questão 05",
    text: "Em qual das linguagens abaixo se manipula o DOM (Document Object Model)?",
    options: ["HTML", "CSS", " JavaScript", "SQL"],
    correct: "JavaScript"
  },
  {
    title: "Questão 06",
    text: "6. Qual método é usado para adicionar um item ao final de um array em JavaScript?",
    options: ["add()", "insert()", "append()", "push()"],
    correct: "push()"
  },
  {
    title: "Questão 07",
    text: "7. Qual linguagem é usada para estilizar páginas HTML?",
    options: ["HTML", "JavaScript", "CSS", "SQL"],
    correct: "CSS"
  },
  {
    title: "Questão 08",
    text: "Como se seleciona uma classe em CSS?",
    options: ["#minhaClasse", ".minhaClasse", "<minhaClasse>", "*minhaClasse"],
    correct: ".minhaClasse"
  },
  {
    title: "Questão 09",
    text: "Qual parte do Box Model CSS representa o espaço entre o conteúdo e a borda?",
    options: ["margin", "padding", "border", "content"],
    correct: "padding"
  },
  {
    title: "Questão 10",
    text: "Qual seletor CSS seleciona um elemento pelo seu ID?",
    options: ["#meuID", ".meuID", "$meuID", "*meuID"],
    correct: "#meuID"
  },
  {
    title: "Questão 11",
    text: "Qual propriedade define a posição de um elemento como fixa na página?",
    options: ["position: static", "position: relative", "position: fixed", "position: absolute"],
    correct: "position: fixed"
  },
  {
    title: "Questão 12",
    text: "O que é o JSON, frequentemente usado com JavaScript?",
    options: ["Um banco de dados", "Uma linguagem de programação", "Um formato de troca de dados", "Um framework de JavaScript"],
    correct: "Um formato de troca de dados"
  },
  {
    title: "Questão 13",
    text: "Qual das opções é um pseudoelemento CSS válido?",
    options: ["::before", ":after", "::hover", ":first-child"],
    correct: "::before"
  },
  {
    title: "Questão 14",
    text: "O que significa HTML semântico?",
    options: ["HTML usado apenas para imagens", "HTML que funciona apenas em dispositivos móveis", "HTML com tags que indicam o significado do conteúdo", "HTML com erros propositais"],
    correct: "HTML com tags que indicam o significado do conteúdo"
  },
  {
    title: "Questão 15",
    text: "Qual propriedade define a posição de um elemento como fixa na página?",
    options: ["position: static", "position: relative", "position: fixed", "position: absolute"],
    correct: "position: fixed"
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let timer;

// Mostrar pergunta
function loadQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestion];
  questionTitle.textContent = q.title;
  questionText.textContent = q.text;
  counter.textContent = `Questão ${currentQuestion + 1} de ${questions.length} - Desenv. Web`;

  answersContainer.innerHTML = ""; 
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("answer");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option === q.correct));
    answersContainer.appendChild(btn);
  });

  selectedAnswer = null;
  confirmBtn.disabled = true;

  // Ativa a transição
  setTimeout(() => quizContent.classList.add("show"), 50);
}

function selectAnswer(btn, correct) {
  document.querySelectorAll(".answer").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedAnswer = { btn, correct };
  confirmBtn.disabled = false;
}

confirmBtn.addEventListener("click", () => {
  if (!selectedAnswer) return;

  document.querySelectorAll(".answer").forEach(b => b.disabled = true);

  if (selectedAnswer.correct) {
    selectedAnswer.btn.classList.add("correct");
    score++;
  } else {
    selectedAnswer.btn.classList.add("wrong");
  }

  // Faz o fade-out antes de carregar a próxima
  quizContent.classList.remove("show");

  setTimeout(() => {
    clearInterval(timer);
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      mostrarResultado();
    }
  }, 600);
});

function mostrarResultado() {
  saudacao.style.display = "none";
  quizContent.style.display = "none";
  resultadoEl.style.display = "block";
  counter.style.display = "none";
  timeEl.style.display = "none";
  timerContainer.style.display = "none"; 

  localStorage.setItem("quizScore", score); // para usar na prox pag
  let mensagem;
  if (score === questions.length) {
    mensagem = `🎉 Parabéns, ${nome || 'jogador'}! Você acertou todas as perguntas!`;
  } else if (score <= 5) {
    mensagem = `${nome || 'jogador'}! Você acertou apenas ${score} de ${questions.length}. Estude mais!`;
  } else {
    mensagem = `📚 ${nome || 'jogador'}, você acertou ${score} de ${questions.length}. Tente novamente!`;
  }

  mensagemFinal.textContent = mensagem;
}

// Timer (2 minutos)
function startTimer() {
  let time = 120;

  timer = setInterval(() => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timeEl.textContent = `${minutes}:${seconds}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      alert("⏰ Tempo esgotado!");
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        mostrarResultado();
      }
    }
  }, 1000);
}

// Inicia o quiz
loadQuestion();