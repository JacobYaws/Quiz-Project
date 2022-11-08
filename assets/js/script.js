// These are all of the global declarations for the script. These will be used for the functions further down. 

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
var inputText = document.getElementById('inputText');
const ul = document.getElementById('ul');
var score
var time
let shuffledQuestions, currentQuestionIndex;
let p = document.createElement("p");
let gameEnd = false;

// This event listeners is used for the start button and, when clicked, will call the startGame function.  

startButton.addEventListener('click', startGame);




// This function is used for the timer on the page. Whenver the game starts, the timer will be set to an amount specified in the next function, and will decrease by one second every second. 
// If the time reaches 0, the user will be brought to the end of the quiz, regardless if they answered all of the questions. It will also stop the timer from counting down after the quiz is over.

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

// This function will start the quiz. It will hide the start button and the text on the start screen, and reveal the question and answer buttons. The timer for the quiz will be started from 75 and will call the function above to start the countdown. The score will also
// be set to 0 so if the user takes the quiz multiple times, they will not be able to add on to any scores from previous attempts.

function startGame() {
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

// This function is used to set the questions after the start or answer buttons are pressed. It calls the resetState function which clears the container of any elements from before, and calls the showQuestion funciton which will present a new question and answers in the container.

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// This function is used to show the question in the container. It uses the questions array (further below) to change the question and answers each time the quiz progresses. For the answers, another function is called to pull the text and correct: status for each possible answer for the question.
// It also creates individual buttons for each answer. There is also an "if" loop to 

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

//

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (correct) {
        score += 10;
    } else {
        time -= 15;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
    } else {  
       gameEnd = true; 
       endGame();  
    }
};

//

    function endGame () {
        endTextElement.classList.remove('hide');
        finalScore.classList.remove('hide');
        finalScore.innerText = "Your final score is "+ score + " points." ;
        questionContainerElement.classList.add('hide');
        submitButton.addEventListener('click', highScores);
        
        
}

//

function highScores() {
    console.log("click");
    scores.classList.remove('hide');
    endTextElement.classList.add('hide');
    localStorage.setItem(inputText.value, JSON.stringify(score));
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        JSON.parse(localStorage.getItem(localStorage.key (i)));
        console.log(localStorage.key (i));
        console.log(localStorage.getItem(localStorage.key (i)));
        let liElement = document.createElement('li'); 
        liElement.innerText = localStorage.key (i) + " : " + localStorage.getItem(localStorage.key (i));
        ul.append(liElement);   
        var localStorageContents = JSON.parse(localStorage.getItem(localStorage.key (i)))
        console.log(localStorageContents);
        console.log(typeof(localStorageContents));
    }  
   
//    

    restartButton.addEventListener('click', newGame);  
}

//

function newGame () {
    beginningTextElement.classList.remove('hide');
    startButton.classList.remove('hide');
    scores.classList.add('hide');
    endTextElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    finalScore.classList.add('hide');
    inputText.value = "";
}

//

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
};

//

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

//

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
