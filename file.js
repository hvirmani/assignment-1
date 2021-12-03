let questions = [
  {
    question: "what colour is green",
    options: ["red", "blue", "green", "brown"],
    answer: "green",
  },
  {
    question: "what is the full form of HTML",
    options: [
      "high markup language",
      "hyper text mockup language",
      "hyper text markup language",
      "none of the above",
    ],
    answer: "hyper text markup language",
  },
  {
    question: "html is programming language",
    options: ["yes", "no"],
    answer: "no",
  },
  {
    question: "There are no array in js",
    options: ["yes", "no", "strictly no", "maybe"],
    answer: "no",
  },
];
let score = 0;
let currentQuestion = 0;
let questionTitle = document.getElementById("question");
let list = document.getElementById("options");
let submit = document.getElementById("submit");
let next = document.getElementById("next");
let resultTitle = document.getElementById("result");
let question_container = document.getElementById("question_container");
let result_container = document.getElementById("result_container");
let answer_key = document.getElementById("answer_key");
let answer_heading = document.getElementById("answer_heading");
let heading = document.getElementById("heading");
let restart = document.getElementById("restart");
let createQuestion = () => {
  next.style.display = "none";
  submit.style.display = "block";
  let newQuestion = questions[currentQuestion];
  questionTitle.innerHTML = newQuestion.question;
  newQuestion.options.forEach((option) => {
    let list_item = document.createElement("li");
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "option");
    input.setAttribute("value", option);
    label.innerHTML = option;
    list_item.appendChild(input);
    list_item.appendChild(label);
    list.appendChild(list_item);
  });
};
let checkAnswer = () => {
  let question = questions[currentQuestion];
  let ans = -1;
  let options = document.getElementsByName("option");
  options.forEach((option, index) => {
    if (option.checked) {
      ans = index;
    }
  });
  if (ans == -1) {
    return -1;
  }
  if (options[ans].value == question.answer) {
    return 1;
  }
  return 0;
};
let restartQuiz = () => {
  question_container.style.display = "block";
  result_container.style.display = "none";
  answer_heading.style.display = "none";
  score = 0;
  currentQuestion = 0;
  questionTitle.innerHTML = "";
  options.innerHTML = "";
  heading.innerHTML = "Quiz";
  answer_key.innerHTML = "";
  createQuestion();
};
let createResult = () => {
  heading.innerHTML = `Score: ${score}`;
  answer_heading.style.display = "block";
  questions.forEach((question) => {
    let list_item = document.createElement("li");
    list_item.innerHTML = `${question.question} - ${question.answer}`;
    answer_key.appendChild(list_item);
  });
};
let submitQuestion = () => {
  let k = checkAnswer();
  if (k == 1) {
    score++;
    resultTitle.setAttribute("class", "alert alert-success");
    resultTitle.innerHTML = "Correct";
  } else if (k == 0) {
    resultTitle.setAttribute("class", "alert alert-danger");
    resultTitle.innerHTML = "Incorrect";
  } else {
    alert("Please select an option");
    resultTitle.style.visibility = "hidden";
    resultTitle.setAttribute("class", "alert alert-danger");
    return;
  }
  resultTitle.style.visibility = "visible";
  submit.style.display = "none";
  next.style.display = "block";
};
let nextQuestion = () => {
  questionTitle.innerHTML = "";
  options.innerHTML = "";
  resultTitle.style.visibility = "hidden";
  currentQuestion++;
  if (questions[currentQuestion]) {
    createQuestion();
  } else {
    question_container.style.display = "none";
    result_container.style.display = "block";
    createResult();
  }
};
createQuestion();
submit.addEventListener("click", submitQuestion);
next.addEventListener("click", nextQuestion);
restart.addEventListener("click", restartQuiz);
