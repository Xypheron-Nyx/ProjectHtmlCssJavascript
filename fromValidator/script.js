// element input html
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const telpEl = document.getElementById("telp");
const submit = document.querySelector("#submit");
const togglePassword = document.getElementById("togglePassword");

// element text html
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-password");
const errorTelp = document.getElementById("error-telp");
const statusBar = document.querySelector(".status");

// regex
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const regexTelp = /^(\+62|62|0)8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

let isValid = true; // Reset sebelum pengecekan

telpEl.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Hapus karakter selain angka
});

submit.addEventListener("click", function (event) {
  event.preventDefault();
  isValid = true; // Reset sebelum pengecekan
  if (!cekEmail(emailEl.value)) isValid = false;
  if (!cekPass(passwordEl.value)) isValid = false;
  if (!cekTelp(telpEl.value)) isValid = false;

  if (isValid) {
    statusBar.textContent = "Pesan terkirim";
    statusBar.style.display = "block";
    statusBar.style.color = "green";
  } else {
    statusBar.textContent = "Pesan tidak terkirim";
    statusBar.style.display = "block";
    statusBar.style.color = "red";
  }
});

togglePassword.addEventListener("click", function () {
  if (passwordEl.type === "password") {
    passwordEl.type = "text"; // Tampilkan password
    togglePassword.textContent = "🙈"; // Ganti ikon jadi mata tertutup
  } else {
    passwordEl.type = "password"; // Sembunyikan password
    togglePassword.textContent = "👁️"; // Kembalikan ke ikon mata terbuka
  }
});

function cekEmail(value) {
  errorEmail.style.display = "block";
  if (value === "") {
    uiKosong(errorEmail, "Email");
    errorClass(emailEl);
    return false;
  } else if (!regexEmail.test(value)) {
    uiInFormat(errorEmail, "email", emailEl);
    errorClass(emailEl);
    return false;
  } else {
    uiValid(errorEmail, emailEl);
    successClass(emailEl);
    return true;
  }
}

function cekPass(value) {
  errorPass.style.display = "block";
  if (value === "") {
    uiKosong(errorPass, "Password");
    errorClass(passwordEl);
    return false;
  } else if (value.length < 8) {
    uiKurangPass(errorPass);
    errorClass(passwordEl);
    return false;
  } else if (!regexPass.test(value)) {
    uiInFormat(errorPass, "password");
    errorClass(passwordEl);
    return false;
  } else {
    uiValid(errorPass);
    successClass(passwordEl);
    return true;
  }
}

function cekTelp(value) {
  errorTelp.style.display = "block";
  value.replace(/e/g, "");
  if (value === "") {
    uiKosong(errorTelp, "Telepon");
    errorClass(telpEl);
    return false;
  } else if (value.length < 12) {
    uiKurangTelp(errorTelp);
    errorClass(telpEl);
    return false;
  } else if (!regexTelp.test(value)) {
    uiInFormat(errorTelp, "telepon");
    errorClass(telpEl);
    return false;
  } else {
    uiValid(errorTelp);
    successClass(telpEl);
    return true;
  }
}

function successClass(value) {
  value.classList.add("success");
  value.classList.remove("error");
}

function errorClass(value) {
  value.classList.add("error"); // Harusnya "error" bukan "success"
  value.classList.remove("success");
}

function uiKosong(value, type) {
  value.textContent = `${type} tidak boleh kosong!`;
  value.style.color = "red";
}

function uiKurangPass(value) {
  value.textContent = "Minimal 8 karakter";
}

function uiKurangTelp(value) {
  value.textContent = "Minimal 12 karakter";
}

function uiInFormat(value, type) {
  value.textContent = `format ${type} tidak valid!`;
  value.style.color = "red";
}

function uiValid(value) {
  value.textContent = "";
}
