let numbers = [];
let operators = [];
let currentNumber = "";
let expression = "";
// 1️⃣ Ambil elemen input untuk layar kalkulator
const display = document.querySelector("#result");

// 2️⃣ Ambil semua tombol (angka & operator)
const buttons = document.querySelectorAll(".btn");

// 3️⃣ Ambil tombol khusus
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const equalButton = document.querySelector(".equal");

// 4️⃣ Tambahkan event listener untuk semua tombol angka/operator
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    // Kalau hasil sebelumnya ada dan belum ada operator baru, reset
    if (numbers.length === 1 && operators.length === 0 && currentNumber === "") {
      numbers = [];
      expression = "";
    }

    // Jika tombol angka ditekan
    if (!button.classList.contains("operator")) {
      currentNumber += value;
      expression += value;
    } else {
      // Jika tombol operator ditekan
      if (currentNumber !== "") {
        numbers.push(currentNumber);
        currentNumber = "";
      }

      // Cek jika operator terakhir bukan operator, baru tambahkan
      if (numbers.length > operators.length) {
        operators.push(value);
        expression += value;
      }
    }

    display.value = expression;
  });
});

// 5️⃣ Hapus semua input saat tombol 'C' ditekan
clearButton.addEventListener("click", () => {
  numbers = [];
  operators = [];
  currentNumber = "";
  expression = "";
  display.value = "";
});

// 6️⃣ Hitung hasil saat tombol '=' ditekan
equalButton.addEventListener("click", () => {
  if (currentNumber !== "") {
    numbers.push(currentNumber);
    currentNumber = "";
  }

  if (numbers.length === 0) return; // Cegah error kalau "=" ditekan tanpa input

  console.log("Final Numbers:", numbers);
  console.log("Final Operators:", operators);

  let result = parseFloat(numbers[0]);

  for (let i = 0; i < operators.length; i++) {
    let nextNumber = parseFloat(numbers[i + 1]);

    if (isNaN(nextNumber)) {
      display.value = "Error";
      return;
    }

    if (operators[i] === "+") {
      result += nextNumber;
    } else if (operators[i] === "-") {
      result -= nextNumber;
    } else if (operators[i] === "*") {
      result *= nextNumber;
    } else if (operators[i] === "/") {
      result /= nextNumber;
    }
  }

  display.value = result;

  // ✅ Perbaikan utama di sini
  numbers = [result.toString()]; // Simpan hasil sebagai angka pertama untuk operasi berikutnya
  operators = []; // Reset operator agar tidak bertumpuk
  currentNumber = result.toString(); // Supaya bisa langsung lanjut operasi
  expression = result.toString(); // Update tampilan
});
