// asset kata-kata
const Kata = [
  {
    name: "ahda",
    img: "assets/profile.jpg",
    text: "Seperti ombak yang tak lelah mencumbu pantai, begitulah harapan yang terus hidup dalam hati—tak peduli seberapa sering terhempas, ia akan selalu kembali dengan kekuatan baru.",
  },
  {
    name: "bin",
    img: "assets/profile2.jpeg",
    text: "Waktu mengajarkan bahwa setiap luka akan sembuh, seperti daun yang gugur untuk memberi ruang bagi tunas baru yang lebih kuat.",
  },
  {
    name: "rizqi",
    img: "assets/profile3.jpeg",
    text: "Bintang tak pernah ragu untuk bersinar di gelapnya malam, seperti impian yang tetap menyala meski dunia meragukannya.",
  },
  {
    name: "Asep",
    img: "assets/profile4.jpeg",
    text: "Seperti senja yang tak pernah lupa menghadiahkan keindahan sebelum tenggelam, begitulah harapan yang selalu menyapa meski hari terasa berat.",
  },
];

// Ambil elemen yang diperlukan
const container = document.querySelector(".isi");
const bulatContainer = document.querySelector(".bulats");
const back = document.querySelector(".back");
const forward = document.querySelector(".forward");

// Buat bulatan dinamis berdasarkan jumlah data di Kata dan buat indeks 0 / elemen pertama memiliki class bulat-active
bulatContainer.innerHTML = Kata.map((_, i) => `<div class="bulat ${i === 0 ? "bulat-active" : ""}"></div>`).join("");

// simpan semua class bulat kedalama indicators
const indicators = document.querySelectorAll(".bulat");

// back and forward
back.addEventListener("click", () => slide(-1));
forward.addEventListener("click", () => slide(1));

// Render pertama kali tanpa duplikasi
updateKata();

let index = 0;

// Fungsi untuk mengganti kutipan
function updateKata() {
  container.classList.add("fade-out");

  setTimeout(() => {
    const { name, img, text } = Kata[index]; // Gunakan index yang sudah diatur sebelumnya

    container.innerHTML = `
      <img src="${img}" alt="user" class="img-profile fade-in" />
      <p class="text fade-in">${text}</p>
      <h4 class="name fade-in">${name}</h4>
    `;

    container.classList.remove("fade-out");

    setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((el) => el.classList.remove("fade-in"));
    }, 500);

    // Update indikator
    indicators.forEach((dot) => dot.classList.remove("bulat-active"));
    indicators[index].classList.add("bulat-active");
  }, 1000); // Tunggu efek fade-out selesai
}

// function back and forward
function slide(direction) {
  clearInterval(autoSlide); // Hentikan auto-slide

  index = (index + direction + Kata.length) % Kata.length; // Perbarui index
  updateKata(); // Jalankan updateKata() tanpa mengubah index lagi di dalamnya

  autoSlide = setInterval(() => slide(1), 5000); // Mulai ulang auto-slide (maju otomatis)
}

// Jalankan updateKata setiap 5 detik
let autoSlide = setInterval(() => slide(1), 5000);



// ok gini deh bahasa saya
// mari kita bahas dulu yang otomatis
// 1.kita sudah membuat sebuah object didalam array yang berisi nama,img,text
// 2.kita tangkap elemen container(untuk diisikan template pada function testi)
// 3.tangkap bulatContainer(untuk membuat bulat yang kita loop(karena isinya 4 jadi yang terloop adalah 4) dan yang sama dengan indeks 0 kita tambahkan class bulat-active,jadi dia dari awal sudah ada class blue active),saat ini dia masih berbentuk array yang dipisah,kita gabungkan(saya lupa apa namanya),tapi kita gabungkan dengan join sehngga dia hanya berbentuk 1 element string didalam array dan kita masukkan ke bulat container
// 4.dan setiap class bulat kita masukkan ke variabel indicators
// 5.kita tangkap class back dan forward
// 6.ketika back di klik jalankan function slide dengan paramter -1
// 7.ketika forward di klik jalankan function slide dengan paramter 1
// 8.kita jalankan function updateTesti untuk pertama kali
// 9.jangan lupakan untuk card pertama kan indeks nya 0,jadi kita buat var indeks dengan isi 0,agar sama la eksekusi nya
// 10.didalam container tambahkan class fade-out
// 11.selama 0-999ms dia akan kososng aja dulu
// 11.saat 1 detik baru kita masuk
// 12.karena kita bisaa mengambil object langsung kedalam varibael ,lupa saya namanya,ntah spread operator/rest operator
// 13.didalam container buat html yang telah diberi class fade-in untuk animasi
// 14.remove class fade-out
// 15.menurut pengamatan saya akan ada sepersikian detik class fade-in dan fade-out dalam satu tag
// 15.saat sudah 0.5s hapus fade-in nya
// 16.loop semua element dalam indicators,dan hapus yang ada class bulat active
// 17.saat ini tidak ada bulat yang memiliki class bulat-active
// 18.tambahkan class bulat active ke indeks yang aktif saat ini,yaitu 0
// 19.setelah 5 detik karena setInterval ini langsung dieksekusi tanpa perlu dipanggil jadi ya dijalankan function slide nya dengan paramter 1
// 20.clearintervl nya jadi misal user menekan pas waktu 4999ms maka dia akan tetap berhenti dan dijalankan setelah 5s lagi(sama aja kayak 10 detik kan jatuhnya)
// 21.index = (0 + 1 + 4) % length = 5 % 4 =1
// 22.jadi indeks nya berubah menjadi 1
// lalu jalankan lagi function updateTesti
// dan jalankan kembali autoslide nya

// // bisa saya simpulkan nggk sih kalau simulasi nya ni kayak
// updateTesi => slide => updateTesi => slide => updateTesi => slide => updateTesi => slide => ,gitu nggk sih kayak function hell gitu(sebenarnya buka karena dia terjadwal)