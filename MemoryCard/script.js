// 1️⃣ Persiapkan array berisi pasangan kartu (misalnya angka 1-8, lalu gandakan agar ada pasangannya).
// 2️⃣ Acak posisi kartu biar tidak selalu di tempat yang sama.
// 3️⃣ Buat tampilan kartu yang awalnya tertutup.
// 4️⃣ Buat event klik untuk membuka kartu.
// 5️⃣ Cek apakah dua kartu yang terbuka cocok atau tidak.
// 6️⃣ Tambahkan logika supaya kartu tetap terbuka jika cocok, atau tertutup lagi jika tidak cocok.
// 7️⃣ Tambahkan kondisi menang jika semua kartu sudah terbuka.

const gameContainer = document.querySelector(".game-container");
const mulai = document.querySelector(".mulai");
const reset = document.querySelector(".muat-ulang");
const hitung = document.querySelector("#timer");
const h1Hitung = document.querySelector(".waktu");
reset.classList.add("hidden");
hitung.classList.add("hidden");
h1Hitung.classList.add("hidden");

let hitungMundur;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let waktu = 60;

const numbers = Array.from({ length: 8 }, (_, i) => i + 1);

mulai.addEventListener("click", function () {
  reset.classList.remove("hidden");
  hitung.classList.remove("hidden");
  h1Hitung.classList.remove("hidden");

  mulai.disabled = true;
  lockBoard = false; // 🔹 Baru dibuka di sini setelah pemain tekan "Mulai"

  createCards();
  timer();
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCards() {
  gameContainer.innerHTML = "";
  let pairedNumbers = [...numbers, ...numbers]; // Buat array baru setiap kali
  shuffleArray(pairedNumbers);

  pairedNumbers.forEach((num) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = num;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";

    let back = document.createElement("div");
    back.classList.add("back");
    back.textContent = num;

    cardBody.appendChild(front);
    cardBody.appendChild(back);
    card.appendChild(cardBody);
    gameContainer.appendChild(card);

    card.addEventListener("click", () => handleCardClick(card, cardBody));
  });
}

function handleCardClick(card, cardBody) {
  if (lockBoard || card === firstCard) return;
  cardBody.classList.add("card-body-animation");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      matchedPairs++;
      checkEndGame();
      resetBoard();
    } else {
      setTimeout(() => {
        firstCard.querySelector(".card-body").classList.remove("card-body-animation");
        secondCard.querySelector(".card-body").classList.remove("card-body-animation");
        resetBoard();
      }, 700);
    }
  }
}

function timer() {
  hitungMundur = setInterval(function () {
    waktu--;
    hitung.innerHTML = waktu;
    checkEndGame(); // Cek apakah waktu habis atau semua kartu cocok
  }, 1000);
}

function checkEndGame() {
  if (waktu === 0) {
    clearInterval(hitungMundur);
    lockBoard = true;
    document.getElementById("result-message").innerHTML = "Waktu habis! ⏳😵 Coba lagi ya, jangan menyerah!";
    document.getElementById("result-message").classList.remove("hidden");
    document.getElementById("result-message").classList.add("show");
    document.getElementById("result-message").classList.add("lose");
    mulai.disabled = false;
  } else if (matchedPairs === 8) {
    clearInterval(hitungMundur);
    document.getElementById("result-message").innerHTML = "🎉 Selamat! Kamu Menang! 🎉";
    document.getElementById("result-message").classList.remove("hidden");
    document.getElementById("result-message").classList.add("show");
    document.getElementById("result-message").classList.add("win");
    mulai.disabled = false;
    lockBoard = true;
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

reset.addEventListener("click", () => {
  clearInterval(hitungMundur); // 🔹 Stop timer sebelum reset
  waktu = 60; // 🔹 Reset waktu
  hitung.innerHTML = waktu; // 🔹 Perbarui tampilan timer

  gameContainer.innerHTML = ""; // 🔹 Bersihkan kartu yang lama
  firstCard = null;
  secondCard = null;
  matchedPairs = 0;

  lockBoard = true; // 🔹 Kunci permainan setelah reset
  mulai.disabled = false; // 🔹 Aktifkan kembali tombol "Mulai"

  document.getElementById("result-message").classList.add("hidden");
  document.getElementById("result-message").classList.remove("show");
  reset.classList.add("hidden");
  hitung.classList.add("hidden");
  h1Hitung.classList.add("hidden");

  // Tidak panggil createCards() atau timer() di sini, biar mulai baru yang handle
});
