let Komp;
let percobaan = 5;

function generateRandomNumber() {
  Komp = Math.ceil(Math.random() * 100);
}

generateRandomNumber();

// Ketika tombol "Tebak" diklik:
const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  const user = Number(document.getElementById("user").value);
  const pilUser = document.querySelector(".pilUser");
  const result = document.getElementById("result");
  const attempts = document.getElementById("attempts-left");

  // Menampilkan angka yang ditebak oleh user
  pilUser.innerHTML = `Tebakan: ${user}`;

  // Validasi input
  if (user < 1 || user > 100 || isNaN(user)) {
    alert("Input tidak valid! Masukkan angka 1 - 100.");
    return;
  }

  percobaan--; // Mengurangi kesempatan hanya sekali

  // Menentukan hasil
  if (user > Komp) {
    result.innerHTML = "Terlalu Besar";
  } else if (user < Komp) {
    result.innerHTML = "Terlalu Kecil";
  } else {
    result.innerHTML = "Selamat! Anda benar";
  }

  // Update sisa percobaan
  attempts.innerHTML = `Percobaan tersisa: ${percobaan}`;

  // Jika percobaan habis, game over
  if (percobaan === 0 && user !== Komp) {
    result.innerHTML = `Game Over! Angka yang benar adalah ${Komp}`;
    submit.disabled = true; // Menonaktifkan tombol tebak
    submit.style.background = "grey";
  }
});

// Reset game ketika tombol restart ditekan
document.getElementById("restart").addEventListener("click", function () {
  generateRandomNumber();
  percobaan = 5;

  // Reset tampilan
  document.querySelector(".pilUser").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("attempts-left").innerHTML = `Percobaan tersisa: ${percobaan}`;
  submit.disabled = false; // Mengaktifkan kembali tombol tebak
  submit.style.background = "#42a5f5";
});
