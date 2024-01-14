const quizData = [
    {
      question: '1. What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: '2. What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: '3. Which country won the FIFA World Cup in 2018?',
      options: ['Brazil', 'Germany', 'France', 'Argentina'],
      answer: 'France',
    },
    {
      question: '4. Mis on jaanalind?',
      options: ['koer', 'lindy', 'hobune', 'ahv'],
      answer: 'lind',
    },
    {
      question: '5. kes on lammas?',
      options: ['loom', 'lind', 'ujuja', 'seen'],
      answer: 'loom',
    },
    // Add more questions as needed
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit');
const showAnswerButton = document.getElementById('showAnswer');
const nextButton = document.getElementById('next');
const feedbackElement = document.getElementById('feedback');
const resultElement = document.getElementById('result')

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

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
            feedbackElement.innerHTML = 'Vale! Õige vastus oli: ' + correctAnswer;
            feedbackElement.className = 'feedback incorrect';
            paneVale(currentQuestion, answer);
        }

        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    } else {
        console.log(1)
        paneVale(currentQuestion, '');
    }
}

function displayResult() {
    console.log('displayResult', incorrectAnswers)
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';

    resultElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultElement.innerHTML += `
        <p>Incorrect Answers:</p>
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
