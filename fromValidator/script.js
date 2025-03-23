const email = document.getElementById("email");
const password = document.getElementById("password");
const telp = document.getElementById("telp");
const submit = document.querySelector("#submit");
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-password");
const errorTelp = document.getElementById("error-telp");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPass = /^(?=(.*[a-z]{2,}))(?=.*[A-Z])(?=.*\d){8,}$/;
const regexTelp = /^(\+62|62|0)8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

submit.addEventListener("click", function (event) {
  event.preventDefault();
  cekEmail(email.value);
  cekPass(password.value);
  cekTelp(telp.value);
});

function cekEmail(value) {
  if (value === "") {
    errorEmail.textContent = "Email tidak boleh kosong!";
    email.classList.add("error");
    email.classList.remove("success");
    errorEmail.style.color = "red";
  } else if (!regexEmail.test(value)) {
    errorEmail.textContent = "Format email tidak valid";
    email.classList.add("error");
    email.classList.remove("success");
    errorEmail.style.color = "red";
  } else {
    errorEmail.textContent = "Format email valid";
    email.classList.add("success");
    email.classList.remove("error");
    errorEmail.style.color = "green";
  }
  errorEmail.style.display = "block";
}

function cekPass(value) {
  if (value === "") {
    errorPass.textContent = "Email tidak boleh kosong!";
    password.classList.add("error");
    password.classList.remove("success");
    errorPass.style.color = "red";
  } else if (value.length < 8) {
    errorPass.textContent = "Panjang password minimal 8 karakter";
    password.classList.add("error");
    password.classList.remove("success");
    errorPass.style.color = "red";
  } else if (!regexPass.test(value)) {
    errorPass.textContent = "Format password tidak valid";
    password.classList.add("error");
    password.classList.remove("success");
    errorPass.style.color = "red";
  } else {
    errorPass.textContent = "Format password valid";
    password.classList.add("success");
    password.classList.remove("error");
    errorPass.style.color = "green";
  }
  errorPass.style.display = "block";
}

function cekTelp(value) {
  value.replace(/e/g, "");
  if (value === "") {
    errorTelp.textContent = "Nomor Telepon tidak boleh kosong!";
    telp.classList.add("error");
    telp.classList.remove("success");
    errorTelp.style.color = "red";
  } else if (value.length < 12) {
    errorTelp.textContent = "Nomor telepon minimal 8 karakter";
    telp.classList.add("error");
    telp.classList.remove("success");
    errorTelp.style.color = "red";
  } else if (!regexPass.test(value)) {
    errorTelp.textContent = "Format telepon tidak valid";
    telp.classList.add("error");
    telp.classList.remove("success");
    errorTelp.style.color = "red";
  } else {
    errorTelp.textContent = "Format telepon valid";
    telp.classList.add("success");
    telp.classList.remove("error");
    errorTelp.style.color = "green";
  }
  errorTelp.style.display = "block";
}
