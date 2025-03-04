// Tangkap elemen
const title = document.querySelector(".title");
const textarea = document.querySelector(".textarea");
const submit = document.querySelector(".submit");
const cardContainer = document.querySelector(".card-container");

let editedCard = null; // Menyimpan card yang sedang diedit

submit.addEventListener("click", function (e) {
  e.preventDefault(); // Mencegah reload

  const titleValue = title.value.trim();
  const textareaValue = textarea.value.trim();

  // Cek apakah input kosong
  if (titleValue === "" || textareaValue === "") {
    alert("Judul dan isi tidak boleh kosong!");
    return; // Hentikan eksekusi
  }

  if (editedCard) {
    // Jika sedang mengedit, perbarui isi card
    editedCard.querySelector(".card-judul").textContent = titleValue;
    editedCard.querySelector(".card-isi").textContent = textareaValue;
    editedCard = null; // Reset setelah edit selesai
  } else {
    // Buat elemen card baru
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="head">
        <h4 class="card-judul">${titleValue}</h4>
        <div class="img-card">
          <img src="assets/bin.svg" alt="bin" class="delete-btn"/>
          <img src="assets/edit.svg" alt="edit" class="edit-btn"/>
        </div>
      </div>
      <p class="card-isi">${textareaValue}</p>
    `;

    // Masukkan card ke container
    cardContainer.appendChild(card);
  }

  // Reset input setelah tambah atau edit
  title.value = "";
  textarea.value = "";
});

// Event listener untuk tombol hapus & edit
cardContainer.addEventListener("click", function (e) {
  const card = e.target.closest(".card");

  if (e.target.matches(".delete-btn")) {
    card.remove(); // Hapus card
  }

  if (e.target.matches(".edit-btn")) {
    editedCard = card; // Simpan card yang akan diedit
    title.value = editedCard.querySelector(".card-judul").textContent;
    textarea.value = editedCard.querySelector(".card-isi").textContent;
  }
});
