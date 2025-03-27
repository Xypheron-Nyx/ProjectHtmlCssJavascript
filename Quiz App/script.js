// soal
import { quizQuestions } from "./module/soal.js";

// ambil element mulai
const startBtn = document.getElementById("start");

// difficulty button
const diffButton = document.getElementById("difficulty-buttons");

// ambil container app
const container = document.getElementById("container");

// level, questions, options, currentIndex quest element
const levelEl = document.getElementById("level");
const questionEl = document.getElementById("question");
const optionsEl = Array.from(document.querySelectorAll(".option-btn"));
const currentQuest = document.getElementById("current-question");
const totalQuest = document.getElementById("total-questions");

// currentIndex variabel
let currentIndex = 0;

// kumpulan pertanyaan sesuai level, sama aja kayak filteredQuestions tapi ini untuk global
let currentQuestions;

// total benar
let totallyCorrect = [];
let goodAnswer = [];

// variabel timer
let modeTimer;
let minutes = 0;
let seconds;
let min;
let sec;
const targetTime = new Date().getTime() + 1 * 60 * 1000; // Waktu target dalam milidetik

// Start button event = untuk masuk ke pemilihan mode kesulitan
startBtn.addEventListener("click", function () {
  showDifficultySelection();
});

// Function untuk menampilkan pilihan kesulitan
function showDifficultySelection() {
  startBtn.classList.add("hidden");
  diffButton.classList.remove("hidden");
  setTimeout(() => {
    diffButton.classList.remove("opacity-0", "translate-y-10", "blur-md");
  });
}

// Difficulty button event = untuk masuk ke quiz
diffButton.addEventListener("click", function (e) {
  let mode = e.target.dataset.level;
  let filteredQuestions = getQuestionsByLevel(mode);
  modeTimer = mode;
  startQuiz(filteredQuestions);
});

// filter mode
function getQuestionsByLevel(level) {
  return quizQuestions.filter((q) => q.level === level);
}

// Function untuk memulai kuis setelah memilih kesulitan
function startQuiz(filteredQuestions) {
  startAnimation();
  currentIndex = 0;
  currentQuestions = filteredQuestions;
  shuffle(currentQuestions);
  currentQuestions.forEach((currentQuestion) => shuffle(currentQuestion.pilihan));
  showQuestion(currentQuestions[currentIndex]);
  startCountdown();
  console.log(currentQuestions);
}

// function startAnimation
function startAnimation() {
  diffButton.classList.add("hidden");
  container.classList.remove("hidden");
  setTimeout(() => {
    container.classList.remove("opacity-0", "translate-y-10", "blur-md");
  }, 10);
}

// function shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// function showQuestion
function showQuestion(currentQuestion) {
  levelEl.textContent = currentQuestion.level;
  questionEl.textContent = currentQuestion.soal;
  optionsEl.forEach((btn, index) => {
    btn.textContent = currentQuestion.pilihan[index];
  });
  currentQuest.textContent = currentIndex + 1;
  totalQuest.textContent = currentQuestions.length;
}

// function tangkapPilihan
optionsEl.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    totallyCorrect.push(e.target.textContent);
    nextQuestion();
  });
});

// function pindah soal
function nextQuestion() {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    showQuestion(currentQuestions[currentIndex]);
  } else {
    alert("Kuis selesai!");
    checkAnswer();
    optionsEl.forEach((btn) => btn.setAttribute("disabled", "true"));
  }
}

// function cek jawaban
function checkAnswer() {
  totallyCorrect.forEach((g, i) => {
    if (g === currentQuestions[i].jawaban) {
      goodAnswer.push(g);
    }
  });
}

// function display timer
function updateDisplay() {
  let formattedTime = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  document.getElementById("displayTimer").textContent = formattedTime;
}

// function tangkap mode
function startCountdown() {
  if (modeTimer === "Easy") {
    minutes = 1;
  } else if (modeTimer === "Medium") {
    minutes = 5;
  } else if (modeTimer === "Hard") {
    minutes = 10;
  }

  seconds = minutes * 6; // Konversi menit ke total detik

  let interval = setInterval(() => {
    min = Math.floor(seconds / 60);
    sec = seconds % 60;
    updateDisplay();

    if (seconds === 0) {
      clearInterval(interval);
      alert("Waktu habis!");
      optionsEl.forEach((btn) => btn.setAttribute("disabled", "true"));
    }

    seconds--; // Langsung kurangi detik
  }, 1000);
}
