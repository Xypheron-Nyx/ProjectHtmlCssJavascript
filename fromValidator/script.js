const email = document.getElementById("email");
const password = document.getElementById("password");
const telp = document.getElementById("telp");
const submit = document.querySelector("#submit");
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-password");
const errorTelp = document.getElementById("error-telp");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

submit.addEventListener("click", function (event) {
  event.preventDefault();
  cekEmail(email.value);
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
