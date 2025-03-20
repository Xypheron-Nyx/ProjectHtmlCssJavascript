// Ambil semua elemen drag & drop
const items = document.querySelectorAll(".drag-item");
const dropZone = document.querySelector(".drop-zone");

// Tambahkan event listener untuk setiap item
items.forEach((item, index) => {
  item.setAttribute("id", `item-${index}`); // Beri id unik ke setiap item
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.id);
    // console.log("Sedang menyeret:", item.id);
  });
});

// Event untuk mengizinkan drop
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault(); // Mencegah default agar bisa drop
});

// Event saat item dilepas di drop zone
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text/plain");
  const draggedItem = document.getElementById(itemId);
  if (draggedItem) {
    dropZone.appendChild(draggedItem);
  }
});
