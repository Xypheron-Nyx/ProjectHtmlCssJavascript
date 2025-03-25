// ambil element mulai
const start = document.getElementById("start");

// ambil container app
const container = document.getElementById("container");

start.addEventListener("click", function () {
  start.classList.add("hidden");
  container.classList.remove("hidden"); // Hilangkan hidden dulu
  setTimeout(() => {
    container.classList.remove("opacity-0", "translate-y-10", "blur-md"); // Biarkan opacity berubah setelah elemen muncul
  }, 10); // Delay kecil supaya transisi bisa berjalan
});
