const nome = localStorage.getItem("username");
const saudacao = document.getElementById("saudacao");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const confirmBtn = document.getElementById("confirm");
const counter = document.getElementById("question-counter");
const timeEl = document.getElementById("time");

saudacao.textContent = nome ? `Boa sorte, ${nome}! 🚀` : "Bem-vindo ao Quiz!";

const questions = [
  {
    title: "Questão 01",
    text: "Qual é a principal função da linguagem HTML?",
    options: ["Criar estilos para páginas web", "Adicionar interatividade com scripts", "Estruturar o conteúdo de páginas web", "Armazenar dados em bancos de dados"],
    correct: "Estruturar o conteúdo de páginas web"
  },
  {
    title: "Questão 02",
    text: "O que significa a sigla CSS no desenvolvimento web?",
    options: ["Computer Style Syntax", "Creative Styling System", "Cascading Style Sheets", "Content Structure Script"],
    correct: "Cascading Style Sheets"
  },
  {
    title: "Questão 03",
    text: "Qual propriedade é usada para alterar a fonte de um elemento?",
    options: ["font-size", "font-weight", "font-family", "text-color"],
    correct: "font-family"
  },
  {
    title: "Questão 04",
    text: "Qual é a principal função do JavaScript no desenvolvimento web?",
    options: ["Definir o layout da página", "Criar o conteúdo HTML", "Adicionar interatividade à página", "Armazenar dados no banco de dados"],
    correct: "Adicionar interatividade à página"
  },
  {
    title: "Questão 05",
    text: "Qual atributo HTML é usado para especificar o texto alternativo de uma imagem?",
    options: ["src", "alt", " text", "title"],
    correct: "alt"
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
    text: "Em JavaScript, qual palavra-chave cria uma variável que não pode ser reatribuída?",
    options: ["var", "let", "const", "static"],
    correct: "const"
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let timer;
let userAnswers = []; // Salva índice da opção selecionada

function loadQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestion];
  questionTitle.textContent = q.title;
  questionText.textContent = q.text;
  counter.textContent = `Questão ${currentQuestion + 1} de ${questions.length} - Desenv. Web`;

  answersContainer.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("answer");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, index));
    answersContainer.appendChild(btn);
  });

  selectedAnswer = null;
  confirmBtn.disabled = true;
}

function selectAnswer(btn, index) {
  document.querySelectorAll(".answer").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedAnswer = index;
  confirmBtn.disabled = false;
}

confirmBtn.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  const q = questions[currentQuestion];
  userAnswers[currentQuestion] = selectedAnswer; // Salva índice da opção

  document.querySelectorAll(".answer").forEach((b, i) => {
    b.disabled = true;
    if (i === selectedAnswer && i === q.options.indexOf(q.correct)) b.classList.add("correct");
    else if (i === selectedAnswer) b.classList.add("wrong");
    else if (i === q.options.indexOf(q.correct)) b.classList.add("correct");
  });

  if (selectedAnswer === q.options.indexOf(q.correct)) score++;

  setTimeout(() => {
    clearInterval(timer);
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else {
      localStorage.setItem("quizScore", score);
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      localStorage.setItem("questions", JSON.stringify(questions));
      localStorage.setItem("quizFinished", true);
      window.location.href = "./result.html";
    }
  }, 600);
});

function startTimer() {
  let time = 120;
  timer = setInterval(() => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timeEl.textContent = `${minutes}:${seconds}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      currentQuestion++;
      if (currentQuestion < questions.length) loadQuestion();
      else {
        localStorage.setItem("quizScore", score);
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        localStorage.setItem("questions", JSON.stringify(questions));
        localStorage.setItem("quizFinished", true);
        window.location.href = "./result.html";
      }
    }
  }, 1000);
}

loadQuestion();
