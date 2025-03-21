// 1️⃣ Persiapkan array berisi pasangan kartu (misalnya angka 1-8, lalu gandakan agar ada pasangannya).
// 2️⃣ Acak posisi kartu biar tidak selalu di tempat yang sama.
// 3️⃣ Buat tampilan kartu yang awalnya tertutup.
// 4️⃣ Buat event klik untuk membuka kartu.
// 5️⃣ Cek apakah dua kartu yang terbuka cocok atau tidak.
// 6️⃣ Tambahkan logika supaya kartu tetap terbuka jika cocok, atau tertutup lagi jika tidak cocok.
// 7️⃣ Tambahkan kondisi menang jika semua kartu sudah terbuka.

document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  let numbers = Array.from({ length: 8 }, (_, i) => i + 1);
  let pairedNumbers = [...numbers, ...numbers];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(pairedNumbers);

  pairedNumbers.forEach((num) => {
    let card = document.createElement("div");
    card.classList.add("card");

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

    card.addEventListener("click", () => {
      card.classList.toggle("flip");
    });
  });
});
