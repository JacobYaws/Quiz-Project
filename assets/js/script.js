const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const beginningTextElement = document.getElementById('start-text');
const containerElement = document.getElementById('container');
const endTextElement = document.getElementById('end-screen');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart')
const endHeader = document.getElementById('end-header');
const scores = document.getElementById('high-scores');
const finalScore = document.getElementById('final-score');
const timer = document.getElementById('timer')

let shuffledQuestions, currentQuestionIndex;
let p = document.createElement("p");
let gameEnd = false;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})


var score
var time

function setTime() {
    var timerInterval = setInterval(function() {
      time--;
      timer.textContent = 'Time: ' + time
  
      if(time <= 0) {
        clearInterval(timerInterval);
        timer.textContent = 'Time: 0';
        endGame();
      } if (gameEnd) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    beginningTextElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    gameEnd = false;
    time = 75;
    timer.textContent = 'Time: ' + time;
    setTime();
    setNextQuestion();   
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
};

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (correct) {
        score += 10;
        console.log(score);
    } else {
        time -= 15;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
    } else {  
       gameEnd = true; 
       endGame();  
    }
};

    function endGame () {
        endTextElement.classList.remove('hide');
        finalScore.classList.remove('hide');
        finalScore.innerText = "Your final score is "+ score + " points." ;
        questionContainerElement.classList.add('hide');
        submitButton.addEventListener('click', highScores);
}


function highScores() {
    console.log("click");
    scores.classList.remove('hide');
    endTextElement.classList.add('hide');
    restartButton.addEventListener('click', newGame);
}

function newGame () {
    beginningTextElement.classList.remove('hide');
    startButton.classList.remove('hide');
    scores.classList.add('hide');
    endTextElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    finalScore.classList.add('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 4 + 4?',
        answers: [
           { text: '4', correct: false},
           { text: '16', correct: false},
           { text: '8', correct: true},
           { text: '44', correct: false},
        ],
    },
    {
        question: 'What is 2 x 4?',
        answers: [
           { text: '8', correct: true},
           { text: '6', correct: false},
           { text: '10', correct: false},
           { text: '24', correct: false},
        ],
    }
];
