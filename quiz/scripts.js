const questions = [ // array chamado questions
    {
      question: "Qual é a capital do Brasil?", // uma string da pergunta
      choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"], // um array de strings
      answer: "Brasília", // uma string da resposta certa
    },
    {
      question: "Qual é a capital da Argentina?",
      choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
      answer: "Buenos Aires",
    },
    {
      question: "Qual é a capital da França?",
      choices: ["Roma", "Madri", "Paris", "Londres"],
      answer: "Paris",
    },
    {
      question: "Qual é a capital da Espanha?",
      choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
      answer: "Madri",
    },
    {
      question: "Qual é a capital da Itália?",
      choices: ["Veneza", "Milão", "Roma", "Nápoles"],
      answer: "Roma",
    },
    {
      question: "Qual é a capital do Canadá?",
      choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      answer: "Ottawa",
    },
    {
      question: "Qual é a capital dos Estados Unidos?",
      choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
      answer: "Washington D.C.",
    },
    {
      question: "Qual é a capital do Reino Unido?",
      choices: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
      answer: "Londres",
    },
  ];

  // document representa o documento html, conteúdo, carregado em uma página da web
const questionElement = document.querySelector("#question"); // acessa o elemento html que tenha o atributo id = question
const choiceElements = document.querySelectorAll(".choice");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");

let currentQuestion = 0; // pergunta atual, current question data = dados da pergunta atual
let score = 0; // pontuação
let wrong = 0; // erros
let answerChosen = false; // resposta escolhida

function loadQuestion() { // carregar pergunta
    const currentQuestionData = questions[currentQuestion] // pega os dados da pergunta atual do jogo
    questionElement.innerText = currentQuestionData.question; // mostra o texto da pergunta na tela
    
    const choices = shuffleArray(currentQuestionData.choices); // pega as opções de resposta da pergunta e usa a função que embaralha as respostas

    for(let i = 0; i < choiceElements.length; i++) { // mostra as opções de resposta já embaralhadas nos lugares da tela a serem escolhidos tal resposta
        choiceElements[i].innerText = choices[i];
    }

    answerChosen = false; // determina que a resposta para a pergunta ainda não foi escolhida
}

function shuffleArray(array) { // embaralhar as opções de respostas

    let currentIndex = array.length; // índice do elemento atual para ser embaralhado
    let temporaryValue;
    let randomIndex;

    // O loop abaixo vai continuar até que todos os elementos do array tenham sido embaralhados.
    while(0 !== currentIndex) {
        // Escolhe um índice aleatório dentro do intervalo não embaralhado.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Troca o elemento atual (no índice currentIndex) com o elemento aleatório escolhido.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array; // retorna o array embaralhado
}

function checkAnswer(evento) { // escolher uma resposta com o evento de clique em uma das opções de resposta

    if(answerChosen) return; // verifica se alguma resposta já foi escolhida, se escolhida, não retorna nada, para não responder duas vezes a mesma pergunta

    answerChosen = true; // marca que alguma resposta já foi escolhida, para não escolher outra resposta da pergunta

    // se a respota escolhida é igual a resposta correta da pergunta atual
    if (evento.target.innerText === questions[currentQuestion].answer) {
        score++;
        scoreElement.innerText = `Pontuação ${score}`; // pontuação atualizada
        alert("Correto!");
    } else {
        wrong++;
        wrongElement.innerText = `Erros: ${wrong}`; // erros atualizados
        alert(`Errado! A resposta correta é: ${questions[currentQuestion].answer}`);
    }
}

choiceElements.forEach((btn) => { // percorre cada elemento do choiceElements, os botões de resposta, adicionando uma ação de clique para cada resposta (btn). Ao clicar em um botão de resposta, a função checkAnswer verifica a resposta
    btn.addEventListener("click", checkAnswer);
});

// o parenteses é uma função sem nome (sem function), onde é executada após o evento do click, logo callback
nextButton.addEventListener("click", () => { // adiciona um ouvinte de eventos ao elemento nextButton usando esse método do addEventListener, no caso ouvir/perceber o evento de quando clica no botão nextButton
    if (!answerChosen) {// verifica se uma resposta foi escolhida para a pergunta atual.
        // se não
        alert("Por favor, resposta a pergunta!")
        return;
    }

    // se sim, o jogo avança, passando para a próxima pergunta, caso haja
    currentQuestion++;

    // se não tiver mais perguntas
    if (currentQuestion < questions.length) {
        loadQuestion(); // carrega a próxima pergunta e suas opções
    } else {
        alert(`Fim de jogo! Você acertou ${score} de ${questions.length} perguntas.`);
    restartQuiz();
    }
});

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerText = `Pontuação: 0`;
    wrongElement.innerText = `Erros: 0`;
    loadQuestion();
}

loadQuestion();

