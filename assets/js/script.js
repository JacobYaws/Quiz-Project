// These are all of the global declarations for the script. These will be used for the functions further down. 

const startButtonElement = document.getElementById('start-btn');
const nextButtonElement = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const beginningTextElement = document.getElementById('start-text');
const containerElement = document.getElementById('container');
const endTextElement = document.getElementById('end-screen');
const submitButtonElement = document.getElementById('submit-btn');
const restartButtonElement = document.getElementById('restart')
const endHeaderElement = document.getElementById('end-header');
const scoresElement = document.getElementById('high-scores');
const finalScoreElement = document.getElementById('final-score');
const timerElement = document.getElementById('timer')
var inputTextElement = document.getElementById('inputText');
const ulElement = document.getElementById('ul');
var score
var time
let shuffledQuestions, currentQuestionIndex;
let p = document.createElement("p");
let gameEnd = false;

// This event listeners is used for the start button and, when clicked, will call the startGame function.  

startButtonElement.addEventListener('click', startGame);




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
    startButtonElement.classList.add('hide');
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

// This function is used to show the question in the container. It uses the questions array (further below) to change the question and answers each time the quiz progresses. For the answers, an arrow function created to pull the text and "correct:" status for each possible answer for the question.
// It also creates individual buttons for each answer. There is also an "if" statement to validate if the answer selected is the correct answer. Once an answer button is clicked, the "selectAnswer" function will be called.

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

// This function is used to prevent the answer buttons from the HTML from populating in the container whenever the quiz is started or a question is answered, that way only the question and answers show in the container.

function resetState() {
    nextButtonElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// This function is used for when an answer is selected. If the selected answer is correct, the body of the page will be set to green and, if wrong, the body of the page will be set to red.
// There is also an array created from each answer button that will set the "correct" status. If the answer is correct, 10 points will be added. If the answer is wrong, 15 seconds will be deducted. 
// The last if-else statement determines if the quiz will keep populating questions or not. If the question answered is below the total question list length, a new question will be populated. Otherwise, the quiz will end, and the user will be brought to the score submission screen.

function selectAnswer(event) {
    const selectedButtonElement = event.target;
    const correct = selectedButtonElement.dataset.correct;
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

// This function will show the final screen of the quiz. It will show the user their score and a textbox where they can add their initials to submit for the highscores page. Once the "submit" button is clicked, the user will be taken to the highscores page.

    function endGame () {
        endTextElement.classList.remove('hide');
        finalScoreElement.classList.remove('hide');
        finalScoreElement.innerText = "Your final score is "+ score + " points." ;
        questionContainerElement.classList.add('hide');
        submitButtonElement.addEventListener('click', highScores);
        
        
}

// This function shows the highscores for the quiz. The scores for this page are set and pulled from the localstorage of the browser. The "ul" element is removed to prevent any unnecessary elements from showing on the page. Then, for each unique text input from the score submission, a unique key will be generated
// that has the value (score) assigned with it. This key and value will then be pulled from the localstorage and displayed as a list item in the container.

function highScores() {
    
    scoresElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    localStorage.setItem(inputTextElement.value, JSON.stringify(score));
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild)
    }
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        JSON.parse(localStorage.getItem(localStorage.key (i)));
        let liElement = document.createElement('li'); 
        liElement.innerText = localStorage.key (i) + " : " + localStorage.getItem(localStorage.key (i));
        ulElement.append(liElement);   
    }  
   
// This event listener will call the newGame function anytime the restart button is clicked.   

    restartButtonElement.addEventListener('click', newGame);  
}

// This function will bring the user back to the original screen to start the quiz again, identical to if they would refresh the page.

function newGame () {
    beginningTextElement.classList.remove('hide');
    startButtonElement.classList.remove('hide');
    scoresElement.classList.add('hide');
    endTextElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    finalScoreElement.classList.add('hide');
    inputTextElement.value = "";
}

// These functions will call the clear the status, then reset and reassign the status of each answer button.

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

// This array stores the questions and answers, as well as the inner text and correct statuses for the answer buttons.

const questions = [
    {
        question: 'What year was the very first model of the iPhone released?',
        answers: [
           { text: '2010', correct: false},
           { text: '2007', correct: true},
           { text: '2006', correct: false},
           { text: '2009', correct: false},
        ],
    },
    {
        question: 'What was Twitter’s original name?',
        answers: [
           { text: 'twttr', correct: true},
           { text: 'tweeter', correct: false},
           { text: 'twister', correct: false},
           { text: 'twang', correct: false},
        ],
    },
    {
        question: 'What part of the atom has no electric charge?',
        answers: [
           { text: 'Proton', correct: false},
           { text: 'Muon', correct: false},
           { text: 'Electron', correct: false},
           { text: 'Neutron', correct: true},
        ],
    },
    {
        question: 'Which planet is the hottest in the solar system?',
        answers: [
           { text: 'Sun', correct: false},
           { text: 'Mercury', correct: false},
           { text: 'Venus', correct: true},
           { text: 'Earth', correct: false},
        ],
    }
];
