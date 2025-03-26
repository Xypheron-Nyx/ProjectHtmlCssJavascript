// soal
import { quizQuestions } from "./soal.js"; // Harus pakai "./" untuk file lokal

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
let currentQuestions = [];

// total benar
let totallyCorrect = [];
let goodAnswer = [];

// variabel timer
let modeTimer;
let timer;
let isRunning = false;
let seconds = 0,
  minutes = 0;
const targetTime = new Date().getTime() + 1 * 60 * 1000; // Waktu target dalam milidetik
console.log(targetTime);

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
  startQuiz(filteredQuestions);
  modeTimer = mode;
});

// filter mode
function getQuestionsByLevel(level) {
  return quizQuestions.filter((q) => q.level === level);
}

// Function untuk memulai kuis setelah memilih kesulitan
function startQuiz(filteredQuestions) {
  startAnimation();
  currentIndex = 0;
  // simpan pertanyaan ke currentQuestions
  currentQuestions = filteredQuestions;
  // Acak pertanyaan
  shuffle(currentQuestions);
  // Acak pilihan di setiap pertanyaan
  currentQuestions.forEach((currentQuestion) => shuffle(currentQuestion.pilihan));
  // tampilkan soal pertama
  showQuestion(currentQuestions[currentIndex]); // Tampilkan soal pertama
  startTimer(modeTimer);
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
    btn.textContent = currentQuestion.pilihan[index]; // Perbarui teks tombol
  });

  // Update nomor soal
  currentQuest.textContent = currentIndex + 1;
  totalQuest.textContent = currentQuestions.length;
}

// function tangkapPilihan
optionsEl.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    totallyCorrect.push(e.target.textContent);
    console.log(totallyCorrect);
    nextQuestion();
  });
});

// function pindah soal
function nextQuestion() {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++; // Naik ke soal berikutnya
    showQuestion(currentQuestions[currentIndex]); // Tampilkan soal baru
  } else {
    alert("Kuis selesai!");
    checkAnswer();
    optionsEl.forEach((btn) => btn.setAttribute("disabled", "true"));
    console.log(goodAnswer);
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
  let formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("displayTimer").textContent = formattedTime;
}

// function start timer
function startTimer(mode) {
  if (!isRunning) {
    isRunning = true;

    if (mode === "Easy") {
      minutes = 2;
    } else if (mode === "Medium") {
      minutes = 5;
    } else if (mode === "Hard") {
      minutes = 10;
    }

    seconds = 0; // Set detik ke 59 agar tidak langsung habis!

    // Hapus interval sebelumnya jika ada
    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(updateCountdown, 1000);
  }
}

function updateCountdown() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    isRunning = false;
    console.log("Waktu habis!");
    return;
  }

  if (seconds > 0) {
    seconds--; // Kurangi detik dulu
  } else {
    if (minutes > 0) {
      minutes--; // Kurangi menit jika masih ada
      seconds = 59; // Reset detik ke 59
    }
  }

  updateDisplay(); // Pastikan tampilan diperbarui setiap detik
}

function resetTimer() {
  clearInterval(timer); // Langsung clear tanpa panggil stopTimer()
  isRunning = false;
  document.getElementById("startBtn").disabled = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
}
