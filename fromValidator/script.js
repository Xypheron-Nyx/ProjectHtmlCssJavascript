const email = document.getElementById("email");
const password = document.getElementById("password");
const telp = document.getElementById("telp");
const submit = document.querySelector("#submit");
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-password");
const errorTelp = document.getElementById("error-telp");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPass = /^(?=(.*[a-z]{2,}))(?=.*[A-Z])(?=.*\d){8,}$/;

submit.addEventListener("click", function (event) {
  event.preventDefault();
  cekEmail(email.value);
  cekPass(password.value);
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
    errorPass.textContent = "Format email valid";
    password.classList.add("success");
    password.classList.remove("error");
    errorPass.style.color = "green";
  }
  errorPass.style.display = "block";
}
