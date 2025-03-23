// element input html
const emailEl = document.getElementById("email");
const password = document.getElementById("password");
const telp = document.getElementById("telp");
const submit = document.querySelector("#submit");

// element text html
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-password");
const errorTelp = document.getElementById("error-telp");
const statusBar = document.querySelector(".status");

// regex
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPass = /^(?=(.*[a-z]{2,}))(?=.*[A-Z])(?=.*\d){8,}$/;
const regexTelp = /^(\+62|62|0)8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

let isValid = true;

submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (!cekEmail(emailEl.value)) isValid = false;
  // if (!cekPass(password.value)) isValid = false;
  // if (!cekTelp(telp.value)) isValid = false;

  if (isValid) {
    statusBar.textContent = "pesan terkirim";
  }
});

function cekEmail(value) {
  errorEmail.style.display = "block";
  if (value === "") {
    uiKosong(errorEmail, "email", emailEl);
    errorClass(emailEl);
    return false;
  } else if (!regexEmail.test(value)) {
    uiInvalid(errorEmail, "email", emailEl);
    errorClass(emailEl);
    return false;
  } else {
    uiValid(errorEmail, "email", emailEl);
    successClass(emailEl);
    return true;
  }
}

function cekPass(value) {
  errorPass.style.display = "block";
  if (value === "") {
    errorPass.textContent = "Email tidak boleh kosong!";
    error(password);
    errorPass.style.color = "red";
    return false;
  } else if (value.length < 8) {
    errorPass.textContent = "Panjang password minimal 8 karakter";
    error(password);
    errorPass.style.color = "red";
    return false;
  } else if (!regexPass.test(value)) {
    errorPass.textContent = "Format password tidak valid";
    error(password);
    errorPass.style.color = "red";
    return false;
  } else {
    errorPass.textContent = "Format valid";
    CsuccessClass(password);
    errorPass.style.color = "green";
    return true;
  }
}

function cekTelp(value) {
  errorTelp.style.display = "block";
  value.replace(/e/g, "");
  if (value === "") {
    errorTelp.textContent = "Nomor Telepon tidak boleh kosong!";
    error(telp);
    errorTelp.style.color = "red";
    return false;
  } else if (value.length < 12) {
    errorTelp.textContent = "Nomor telepon minimal 8 karakter";
    error(telp);
    errorTelp.style.color = "red";
    return false;
  } else if (!regexTelp.test(value)) {
    errorTelp.textContent = "Format telepon tidak valid";
    error(telp);
    errorTelp.style.color = "red";
    return false;
  } else {
    CsuccessClass(telp);
    uiCsuccessClass(errorTelp, telepon);
    return true;
  }
}

function successClass(value) {
  value.display.add("success");
  value.display.remove("error");
}

function errorClass(value) {
  value.display.remove("error");
  value.display.add("success");
}

function uiKosong(value, type, el) {
  value.textContent = `${type} tidak boleh kosong!`;
  value.style.color = "red";
  el.style.border = "1px solid red";
}

function uiInvalid(value, type, el) {
  value.textContent = `format ${type} tidak valid!`;
  value.style.color = "red";
  el.style.border = "1px solid red";
}

function uiValid(value, type, el) {
  value.textContent = `format ${type} valid`;
  value.style.color = "green";
  el.style.border = "1px solid green";
}
