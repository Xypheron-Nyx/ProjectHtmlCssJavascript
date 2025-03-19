let timer;
let isRunning = false;
let seconds = 0,
  minutes = 0,
  hours = 0;

function updateDisplay() {
  let formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("display").textContent = formattedTime;
}

function startTimer() {
  if (!isRunning) {
    document.getElementById("startBtn").disabled = true;
    isRunning = true;
    timer = setInterval(() => {
      let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
      hours = Math.floor(totalSeconds / 3600);
      minutes = Math.floor((totalSeconds % 3600) / 60);
      seconds = totalSeconds % 60;
      updateDisplay();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("startBtn").disabled = false; // Hidupkan tombol lagi
}

function resetTimer() {
  clearInterval(timer); // Langsung clear tanpa panggil stopTimer()
  isRunning = false;
  document.getElementById("startBtn").disabled = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
