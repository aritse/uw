const questions = [
  { title: "0+1", choices: ["9", "1", "3", "4"], answer: "1" },
  { title: "0+2", choices: ["6", "2", "4"], answer: "2" },
  { title: "0+3", choices: ["8", "2", "3", "4"], answer: "3" },
  { title: "0+4", choices: ["0", "2", "3", "4"], answer: "4" },
  { title: "1+1", choices: ["7", "2", "3", "4", "9"], answer: "2" },
  { title: "1+2", choices: ["1", "6", "3", "4"], answer: "3" },
  { title: "1+3=4", choices: ["true", "false"], answer: "true" },
  { title: "1+4", choices: ["1", "5", "3", "4"], answer: "5" },
  { title: "2+1=9", choices: ["true", "false"], answer: "false" },
  { title: "2+2", choices: ["1", "9", "3", "4"], answer: "4" },
  { title: "3+4", choices: ["1", "2", "7", "4"], answer: "7" }
];

const secPerQuestion = 15;
const numOfQuestions = questions.length;
var secondsLeft;
var questionIndex;

// DOM elements
const timerDisplay = document.querySelector("#timer-display");
const questionNumber = document.querySelector("#question-number");
const student = document.querySelector("#student-id");
const startButton = document.querySelector("#start-button");
const questionDiv = document.querySelector("#question-div");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const answerStatus = document.querySelector("#answer-status");
var correctAnswer;
var totalScore;
var numberOfCorrect;
var interval;
var studentId;

startButton.addEventListener("click", startQuiz);
questionDiv.addEventListener("click", nextQuestion);

function startQuiz(event) {
  secondsLeft = numOfQuestions * secPerQuestion;
  questionIndex = 0;
  totalScore = 0;
  numberOfCorrect = 0;
  event.preventDefault();
  studentId = student.value;
  startButton.style.visibility = "hidden";
  student.style.visibility = "hidden";
  loadQuestion();
  interval = setInterval(countDown, 1000);
}

function loadQuestion() {
  if (questionIndex < numOfQuestions) {
    const question = questions[questionIndex];
    questionNumber.textContent = "Question " + (questionIndex + 1) + " of " + numOfQuestions;
    questionTitle.textContent = question.title;
    correctAnswer = question.answer;
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("class", "choice-button");
      button.textContent = choice;
      li.setAttribute("class", "choice-li");
      li.appendChild(button);
      choices.appendChild(li);
    }
    questionIndex++;
  } else {
    doneQuiz();
  }
}

function nextQuestion(event) {
  const target = event.target;
  if (target.matches("button")) {
    if (target.textContent === correctAnswer) {
      secondsLeft += secPerQuestion;
      answerStatus.textContent = "Correct";
      numberOfCorrect++;
    } else {
      secondsLeft -= secPerQuestion;
      answerStatus.textContent = "Incorrect";
    }
    choices.innerHTML = "";
    loadQuestion();
  }
}

function countDown() {
  if (secondsLeft > 0) {
    secondsLeft--;
    timerDisplay.textContent = secondsLeft;
  }

  if (secondsLeft <= 0) {
    doneQuiz();
  }
}

function calculateScore() {
  return numberOfCorrect === 0 ? 0 : numberOfCorrect * secPerQuestion + secondsLeft;
}

function doneQuiz() {
  clearInterval(interval);
  totalScore = calculateScore();
  alert("Student #" + studentId + " scored " + totalScore + ". Correct: " + numberOfCorrect);
  localStorage.setItem(studentId, totalScore);
  student.style.visibility = "visible";
  startButton.style.visibility = "visible";
}
