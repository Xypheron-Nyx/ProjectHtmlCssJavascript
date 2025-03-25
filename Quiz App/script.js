// soal
import { quizQuestions } from "./soal.js"; // Harus pakai "./" untuk file lokal

// ambil element mulai
const startBtn = document.getElementById("start");

// diffictuly button
const diffButton = document.getElementById("difficulty-buttons");

// ambil container app
const container = document.getElementById("container");

// level,questions,options element
const levelEl = document.getElementById("level");
const questionEl = document.getElementById("question");
const optionsEl = Array.from(document.querySelectorAll(".option-btn"));

// Start button event = untuk masuk ke pemilihan mode kesulitan
startBtn.addEventListener("click", function () {
  showDifficultySelection();
});

// Difficulty button event = untuk masuk ke quiz
diffButton.addEventListener("click", function (e) {
  let mode = e.target.dataset.level;
  let filteredQuestions = getQuestionsByLevel(mode);
  startQuiz(filteredQuestions);
});

// Function untuk menampilkan pilihan kesulitan
function showDifficultySelection() {
  startBtn.classList.add("hidden");
  diffButton.classList.remove("hidden");
  setTimeout(() => {
    diffButton.classList.remove("opacity-0", "translate-y-10", "blur-md");
  });
}

// filter mode
function getQuestionsByLevel(level) {
  return quizQuestions.filter((q) => q.level === level);
}

// Function untuk memulai kuis setelah memilih kesulitan
function startQuiz(question) {
  diffButton.classList.add("hidden");
  container.classList.remove("hidden");
  setTimeout(() => {
    container.classList.remove("opacity-0", "translate-y-10", "blur-md");
  }, 10);
  // Fungsi untuk mengacak array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // Acak pertanyaan
  shuffle(question);
  // Acak pilihan di setiap pertanyaan
  question.forEach((ques) => shuffle(ques.pilihan));

  question.map((ques) => {
    levelEl.textContent = ques.level;
    questionEl.textContent = ques.soal;
    optionsEl.map((btn, index) => {
      btn.textContent = ques.pilihan[index];
    });
  });
}
