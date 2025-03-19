const apiKey = "08da9bd91d29465dbb375935251903"; // Ganti dengan API Key asli
const baseUrl = "https://api.weatherapi.com/v1/current.json";
const cityInput = document.querySelector("#cityInput");
const search = document.querySelector("#searchBtn");
const result = document.querySelector("#weatherResult");
const cityName = document.querySelector("#cityName");
const icon = document.querySelector("#weatherIcon");
const temp = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const loader = document.querySelector("#loader"); // Ambil elemen loader

search.addEventListener("click", function () {
  result.classList.add("hidden"); // Sembunyikan hasil cuaca
  loader.style.display = "block"; // Tampilkan loader
  getWeather(cityInput.value);
});

async function getWeather(city) {
  try {
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}&aqi=no`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setTimeout(() => {
      // Sembunyikan loader dan tampilkan hasil cuaca setelah data siap
      loader.style.display = "none";
      result.classList.remove("hidden");

      // Update elemen dengan data cuaca
      cityName.innerHTML = data.location.name;
      icon.src = data.current.condition.icon;
      temp.textContent = `${data.current.temp_c}°C`;
      condition.textContent = data.current.condition.text;
    }, 1000); // Simulasi loading selama 2 detik
  } catch (error) {
    alert("Terjadi kesalahan:", error);
    loader.style.display = "none"; // Pastikan loader hilang jika ada error
  }
}
