let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-btn");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-btn");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// question and answer array

const quizArray = [
  {
    id: "0",
    question: "What is the meaning of CSS?",
    options: [
      "Counter Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheet",
      "Central Style Sheets",
    ],
    correct: "Cascading Style Sheet",
  },

  {
    id: "1",
    question: "What is the meaning of HTML?",
    options: [
      "Hyper Transfer Markup Language",
      "Hyper Text Makeup Language",
      "Hyper Text Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correct: "Hyper Text Markup Language",
  },

  {
    id: "2",
    question: "Who is the father of computer?",
    options: ["Henry Sy", "Henry Babage", "Charles Luce", "Charles Babage"],
    correct: "Charles Babage",
  },

  {
    id: "3",
    question: "Which of the following is a dynamically typed language?",
    options: ["Java", "JavaScript", "C#", "Python"],
    correct: "JavaScript",
  },

  {
    id: "4",
    question:
      "What is the purpose of media queries in CSS for responsive design?",
    options: [
      "To include external media files",
      "To target specific device characteristics",
      "To create animations",
      "To define variables",
    ],
    correct: "To target specific device characteristics",
  },
];

//restart the quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//next button

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//this is for the timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  //Hide other quiz cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display the current question cards
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation

function quizCreator() {
  //randomly sort the questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate the quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question ";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;

    quizContainer.appendChild(div);
  }
}

// cheker function to check if the answer is correct or wrong
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if the users answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all option
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when the user click the start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
