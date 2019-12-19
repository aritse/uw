const questions = [
  {
    title: "Which of the following is an advantage of using JavaScript?",
    choices: ["Less server interaction", "Immediate feedback to the visitors", "Increased interactivity", "All of the above"],
    answer: "All of the above"
  },
  {
    title: "Which of the following type of variable is visible everywhere in your JavaScript code?",
    choices: ["global variable", "local variable", "Both of the above", "None of the above"],
    answer: "global variable"
  },
  {
    title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    choices: ["last()", "put()", "push()", "None of the above"],
    answer: "push()"
  },
  {
    title: "Which of the following code creates an object?",
    choices: ["var book = Object();", "var book = new Object();", "var book = new OBJECT();", "var book = new Book();"],
    answer: "var book = new Object();"
  },
  {
    title: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
    choices: ["toSource()", "valueOf()", "toString()", "None of the above"],
    answer: "toSource()"
  },
  {
    title:
      "Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?",
    choices: ["concat()", "match()", "replace()", "search()"],
    answer: "replace()"
  },
  {
    title: "Which of the following function of String object creates a string to be   ed as bold as if it were in a <b> tag?",
    choices: ["anchor()", "big()", "blink()", "bold()"],
    answer: "bold()"
  },
  {
    title: "Which of the following function of String object causes a string to be displayed as a superscript, as if it were in a <sup> tag?",
    choices: ["sup()", "small()", "strike()", "sub()"],
    answer: "sup()"
  },
  {
    title: "Which of the following function of Array object joins all elements of an array into a string?",
    choices: ["concat()", "join()", "pop()", "map()"],
    answer: "join()"
  },
  {
    title: "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?",
    choices: ["reverse()", "shift()", "slice()", "some()"],
    answer: "some()"
  }
];
const numOfQuestions = questions.length;
const secPerQuestion = 15;
const timeLimit = secPerQuestion * numOfQuestions;

var score;
var current;
var correct;
var interval;
var secondsLeft;

function renderHeader() {
  const highscores = document.createElement("a");
  highscores.setAttribute("id", "highscores");
  highscores.addEventListener("click", viewHighscores);
  highscores.textContent = "Highscores";

  const points = document.createElement("span");
  points.setAttribute("id", "points");
  points.textContent = "Correct: 0";

  const time = document.createElement("span");
  time.setAttribute("id", "time");
  time.textContent = "Time: 0";

  const header = document.createElement("div");
  header.setAttribute("id", "header");
  header.appendChild(highscores);
  header.appendChild(points);
  header.appendChild(time);

  document.body.appendChild(header);
}

function renderWelcome() {
  const title = document.createElement("h1");
  title.textContent = "Coding Quiz Challenge";

  const instruction = document.createElement("p");
  instruction.textContent = "Answer the following questions within the time limit. Keep in mind that incorrect answers will penalize your score.";

  const start = document.createElement("button");
  start.setAttribute("id", "start");
  start.addEventListener("click", startQuiz);
  start.textContent = "Start";

  const welcome = document.createElement("div");
  welcome.setAttribute("id", "welcome");

  welcome.appendChild(title);
  welcome.appendChild(instruction);
  welcome.appendChild(start);

  document.body.appendChild(welcome);
}

function renderStartPage() {
  document.body.innerHTML = "";
  renderHeader();
  renderWelcome();
}

function initializeGlobals() {
  score = 0;
  current = 0;
  correct = 0;
  secondsLeft = timeLimit;
}

function createElements() {
  const progress = document.createElement("p");
  progress.setAttribute("id", "progress");

  const title = document.createElement("h2");
  title.setAttribute("id", "title");

  const choices = document.createElement("div");
  choices.addEventListener("click", nextQuestion);
  for (let i = 0; i < 4; i++) {
    const choice = document.createElement("button");
    choice.setAttribute("id", "button" + i);
    choices.appendChild(choice);
  }

  const question = document.createElement("div");
  question.setAttribute("id", "question");
  question.appendChild(progress);
  question.appendChild(title);
  question.appendChild(choices);

  document.body.appendChild(question);
}

function loadQuestion() {
  if (current >= numOfQuestions) {
    doneQuiz();
    return;
  }

  const progress = document.querySelector("#progress");
  progress.textContent = "Question" + (current + 1) + "of" + numOfQuestions;

  document.querySelector("#title").textContent = questions[current].title;

  for (let i = 0; i < 4; i++) {
    const choice = document.querySelector("#button" + i);
    choice.textContent = questions[current].choices[i];
  }
}

function startQuiz(event) {
  event.preventDefault();
  initializeGlobals();

  const time = document.querySelector("#time");
  time.textContent = "Time:" + secondsLeft;

  const welcome = document.querySelector("#welcome");
  welcome.parentNode.removeChild(welcome);

  createElements();
  loadQuestion();
  interval = setInterval(countDown, 1000);
}

function clearLocalStorage(event) {
  event.preventDefault();
  localStorage.clear();
  this.disabled = true;
}

function viewHighscores(event) {
  event.preventDefault();
  document.body.innerHTML = "";

  const goback = document.createElement("button");
  goback.setAttribute("id", "goback");
  goback.addEventListener("click", renderStartPage);
  goback.textContent = "Go Back";

  const clear = document.createElement("button");
  clear.setAttribute("id", "clear");
  clear.addEventListener("click", clearLocalStorage);
  clear.textContent = "Clear";

  const students = Object.keys(localStorage).filter(key => key.startsWith("Score:"));
  if (students.length == 0) {
    const h3 = document.createElement("h3");
    h3.textContent = "There is no data";
    document.body.appendChild(h3);
    clear.disabled = true;
  } else {
    for (let i = 0; i < students.length; i++) {
      const input = document.createElement("input");
      const score = localStorage.getItem(students[i]);
      input.value = students[i].split(":")[1] + score;
      document.body.appendChild(input);
    }
  }

  document.body.appendChild(goback);
  document.body.appendChild(clear);
}

function nextQuestion(event) {
  event.preventDefault();
  if (event.target.matches("button")) {
    if (this.textContent == questions[current].answer) {
      secondsLeft += secPerQuestion;
      status.textContent = "Correct";
      correct++;
    } else {
      secondsLeft -= secPerQuestion;
      status.textContent = "Wrong";
    }
    current++;
    loadQuestion();
  }
}

function countDown() {
  const timerDisplay = document.querySelector("#time");
  if (secondsLeft > 0) {
    secondsLeft--;
    timerDisplay.textContent = "Time: " + secondsLeft;
  } else {
    doneQuiz();
  }
}

function saveScore(event) {
  event.preventDefault();
  const initials = document.querySelector("#initials").value;
  localStorage.setItem("Score:" + initials, score);
  renderStartPage();
}

function doneQuiz() {
  clearInterval(interval);

  const question = document.querySelector("#question");
  question.parentNode.removeChild(question);

  const done = document.createElement("h2");
  done.textContent = "All Done";

  score = calculateScore();
  const grade = document.createElement("h4");
  grade.textContent = "Your score is" + score;

  const label = document.createElement("label");
  label.textContent = "Enter your initials:";

  const initials = document.createElement("input");
  initials.setAttribute("id", "initials");

  const submit = document.createElement("button");
  submit.addEventListener("click", saveScore);
  submit.textContent = "Submit";

  const over = document.createElement("div");
  over.setAttribute("id", "over");

  over.appendChild(done);
  over.appendChild(grade);
  over.appendChild(label);
  over.appendChild(initials);
  over.appendChild(submit);

  document.body.appendChild(over);
}

function calculateScore() {
  return correct > 0 ? correct * secPerQuestion + secondsLeft : 0;
}

renderStartPage();
