let quizData = [
    {
        question: "Which one of the following is not a prime number?",
        options: ["31","61","71","91"],
        correct: "91",
    },
    {
        question: "(112 x 5^4) = ?",
        options: ["67000","70000","76500","77200"],
        correct: "70000",
    },
    {
        question: "It is being given that (2^32 + 1) is completely divisible by a whole number. Which of the following numbers is completely divisible by this number?",
        options: ["(2^16+1)","(2^16- 1)","(7 x 2^23)","(2^96 + 1)"],
        correct: "(2^96 + 1)",
    },
    {
        question: "What least number must be added to 1056, so that the sum is completely divisible by 23 ?",
        options: ["2","3","18","21"],
        correct: "2",
    },
    {
        question: "1397 x 1397 = ?",
        options: ["1951609","1981709","18362619","None of these"],
        correct: "1951609",
    },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;
let timerInterval;

const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random()-0.5);
}

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct){
        score++;
        e.target.classList.add("correct");
    }else{
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`,userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
        o.classList.add("disabled");
    });
};

const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = `Time Left: 10 seconds`;
    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2,"0")} seconds`;
        secondsLeft--;

        if(secondsLeft < 3) {
            timerDisplay.classList.add("danger")
        }

        if(secondsLeft < 0){
            clearInterval(timerInterval);
            displayNextQuestion();
        }
    }, 1000);

    
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
        questionNumber + 1
    }/${MAX_QUESTIONS} </span>${quizData[questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) =>{
            checkAnswer(e);
        });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display="none";
    quizContainer.style.display="block";
    };

const displayQuizResult = () => {
    quizResult.style.display="flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML="";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i< MAX_QUESTIONS; i++){
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizData[i].question
        }</div>
        <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
        <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

createQuestion();

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1){
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();

};

nextBtn.addEventListener("click", displayNextQuestion)