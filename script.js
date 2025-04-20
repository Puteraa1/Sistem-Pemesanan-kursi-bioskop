const seatingChart = document.getElementById("seating-chart");
// const seats = [
const seats = [];

for (let row = 65; row <= 77; row++) {
  for (let col = 1; col <= 20; col++) {
    seats.push(`${String.fromCharCode(row)}${col}`);
  }
}
// Simulate taken seats (for example purposes)
const takenSeats = [];

function renderSeats() {
  seats.forEach((seat) => {
    const seatDiv = document.createElement("div");
    seatDiv.className = "seat";
    seatDiv.innerText = seat;
    seatDiv.addEventListener("click", () => selectSeat(seat));

    // Mark taken seats
    if (takenSeats.includes(seat)) {
      seatDiv.classList.add("taken");
      seatDiv.removeEventListener("click", () => selectSeat(seat)); // Disable click
    }

    seatingChart.appendChild(seatDiv);
  });
}

// Simpan fungsi event handler di luar agar bisa direferensikan
function createSeatHandler(seat) {
  return function handler() {
    selectSeat(seat, handler);
  };
}

function selectSeat(seat, handler) {
  const seatDiv = [...document.getElementsByClassName("seat")].find((div) => div.innerText === seat);

  if (!seatDiv) return; // Jika seatDiv tidak ditemukan, keluar

  if (seatDiv.classList.contains("selected")) {
    const confirmCancel = confirm("Kursi ini sudah dipilih. Apakah Anda ingin membatalkan pemesanan?");

    if (confirmCancel) {
      seatDiv.classList.remove("selected", "taken");
      seatDiv.className = "seat";
      seatDiv.innerText = seat;
      seatDiv.addEventListener("click", handler);
    }
  } else if (!seatDiv.classList.contains("taken")) {
    seatDiv.classList.add("selected", "taken");
    seatDiv.removeEventListener("click", handler); // Gunakan handler yang direferensikan
    takenSeats.push(seat);
  }
}

// Contoh penggunaan: tambahkan listener ke semua kursi saat inisialisasi
const seatElements = document.getElementsByClassName("seat");
for (const seatDiv of seatElements) {
  const seat = seatDiv.innerText;
  const handler = createSeatHandler(seat);
  seatDiv.addEventListener("click", handler);
}

// Initial render of seats
renderSeats();
