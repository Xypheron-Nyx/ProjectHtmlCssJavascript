const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard"); // Tambahkan tombol hard
const submit = document.getElementById("submit");
const restart = document.getElementById("restart");
let Komp;
let percobaan;
let mode = ""; // Mode awal kosong agar user harus memilih dulu

function setMode(modePilihan) {
  mode = modePilihan; // Simpan mode yang dipilih

  if (mode === "mudah") {
    Komp = Math.ceil(Math.random() * 50);
    percobaan = 10;
    document.getElementById("mode-text").innerText = `Mode: MUDAH (1 - 50)`;
  } else if (mode === "sulit") {
    Komp = Math.ceil(Math.random() * 100);
    percobaan = 5;
    document.getElementById("mode-text").innerText = `Mode: SULIT (1 - 100)`;
  }

  // Update UI
  document.getElementById("attempts-left").innerText = `Percobaan tersisa: ${percobaan}`;
  document.querySelector(".pilUser").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  // Aktifkan tombol submit setelah memilih mode
  submit.disabled = false;
  submit.style.background = "#42a5f5";

  // Debugging
  console.log("Angka Komputer:", Komp);
}

// Event listener untuk memilih mode
easyBtn.addEventListener("click", function () {
  setMode("mudah");
});

hardBtn.addEventListener("click", function () {
  setMode("sulit");
});

submit.addEventListener("click", function () {
  const user = Number(document.getElementById("user").value);
  const pilUser = document.querySelector(".pilUser");
  const result = document.getElementById("result");
  const attempts = document.getElementById("attempts-left");

  // Menampilkan angka yang ditebak oleh user
  pilUser.innerHTML = `Tebakan: ${user}`;

  // Validasi input sesuai mode
  let batasAtas = mode === "mudah" ? 50 : 100;
  if (user < 1 || user > batasAtas || isNaN(user)) {
    alert(`Input tidak valid! Masukkan angka 1 - ${batasAtas}.`);
    return;
  }

  percobaan--; // Mengurangi kesempatan

  // Menentukan hasil
  if (user > Komp) {
    result.innerHTML = "Terlalu Besar";
  } else if (user < Komp) {
    result.innerHTML = "Terlalu Kecil";
  } else {
    result.innerHTML = "🎉 Selamat! Anda benar!";
    submit.disabled = true; // Matikan tombol tebak
    submit.style.background = "grey";
  }

  // Update sisa percobaan
  attempts.innerHTML = `Percobaan tersisa: ${percobaan}`;

  // Jika percobaan habis dan belum benar
  if (percobaan === 0 && user !== Komp) {
    result.innerHTML = `Game Over! Angka yang benar adalah ${Komp}`;
    submit.disabled = true;
    submit.style.background = "grey";
  }
});

restart.addEventListener("click", function () {
  setMode(mode); // Reset sesuai mode yang terakhir dipilih
  submit.disabled = false;
  submit.style.background = "#42a5f5";
  document.getElementById("user").value = ""; // Kosongkan input tebakan
});
