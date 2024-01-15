
//kysimused
const quizData = [
    {
      question: '1. Mis on Eesti suurim rändrahn?',
      options: ['Ehalkivi', 'Maarjakivi', 'Maakivi', 'Kajakivi'],
      answer: 'Ehalkivi',
    },

    {
      question: '2. Kus asub Eesti pikum rippsild?',
      options: ['Kundas', 'Võrus', 'Tartus', 'Tallinnas'],
      answer: 'Võrus',
    },
    {
      question: '3. Nimetage Eesti pikum jõgi?',
      options: ['Emajõgi', 'Pirita jõgi', 'Võhandu jõgi', 'Kasari jõgi'],
      answer: 'Võhandu jõgi',
    },
    

];
//elemendid

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit');
const showAnswerButton = document.getElementById('showAnswer');
const nextButton = document.getElementById('next');
const feedbackElement = document.getElementById('feedback');
const resultElement = document.getElementById('result')

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

//kysimustiku kuvamine

function displayQuestion() {




    const questionData = quizData[currentQuestion];

    const questionElement = document.getElementById('question');
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    const shuffledOptions = [...questionData.options];

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('li');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }
}

function paneVale(currentQuestion, answer) {
    const correctAnswer = quizData[currentQuestion].answer;
    incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: correctAnswer,
    });
}

//vastuse kuvamine

function checkAnswer(ev) {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (selectedOption) {
        const answer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].answer;

        if (answer === correctAnswer) {
            feedbackElement.textContent = 'Õige!';
            feedbackElement.className = 'feedback correct';
            score++;
        } else {
            feedbackElement.innerHTML = 'Vale! Õige vastus on: ' + correctAnswer;
            feedbackElement.className = 'feedback incorrect';
            paneVale(currentQuestion, answer);
        }

        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    } else {

        paneVale(currentQuestion, '');
    }
}

// tulemuste kuvamine

function displayResult() {
    
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    resultElement.style.display ='block'

    resultElement.innerHTML = `Teie tulemus on ${score} , kõikidest ${quizData.length} küsimustest!`;

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Küsimus:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Teie vastus:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Õige vastus:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultElement.innerHTML += `
        <p>Valed vastused:</p>
        ${incorrectAnswersHtml}
    `;
}

let answerChecked = false;
submitButton.addEventListener('click', function () {
    checkAnswer();
    answerChecked = true;
    if (currentQuestion >= quizData.length - 1) {
        displayResult(); // koige lopus
    }
});

nextButton.addEventListener('click', function() {
    if(! answerChecked) {
        checkAnswer();
    };
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        displayResult();
    }
    answerChecked = false;
});

document.addEventListener('DOMContentLoaded', function () {
    displayQuestion();
});
