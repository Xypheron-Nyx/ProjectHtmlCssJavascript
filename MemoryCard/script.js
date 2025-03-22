// 1️⃣ Persiapkan array berisi pasangan kartu (misalnya angka 1-8, lalu gandakan agar ada pasangannya).
// 2️⃣ Acak posisi kartu biar tidak selalu di tempat yang sama.
// 3️⃣ Buat tampilan kartu yang awalnya tertutup.
// 4️⃣ Buat event klik untuk membuka kartu.
// 5️⃣ Cek apakah dua kartu yang terbuka cocok atau tidak.
// 6️⃣ Tambahkan logika supaya kartu tetap terbuka jika cocok, atau tertutup lagi jika tidak cocok.
// 7️⃣ Tambahkan kondisi menang jika semua kartu sudah terbuka.

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  const reset = document.querySelector(".muat-ulang");
  let numbers = Array.from({ length: 8 }, (_, i) => i + 1);
  let pairedNumbers = [...numbers, ...numbers];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createCards() {
    gameContainer.innerHTML = ""; // Kosongkan kontainer sebelum buat ulang kartu
    shuffleArray(pairedNumbers); // Acak ulang kartu

    pairedNumbers.forEach((num) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = num;

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let front = document.createElement("div");
      front.classList.add("front");
      front.textContent = "?"; // Sisi tertutup

      let back = document.createElement("div");
      back.classList.add("back");
      back.textContent = num; // Angka tersembunyi

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
        checkWin();
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

  function checkWin() {
    if (matchedPairs === 8) {
      setTimeout(() => {
        document.getElementById("win-message").classList.remove("hidden");
        document.getElementById("win-message").classList.add("show");
      }, 500);
    }
  }

  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  reset.addEventListener("click", () => {
    gameContainer.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    document.getElementById("win-message").classList.add("hidden");
    document.getElementById("win-message").classList.remove("show");
    createCards();
  });

  createCards(); // Mulai game pertama kali
});
