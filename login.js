// Validasi form login demo menggunakan JavaScript.
const formLogin = document.getElementById("formLogin");
const identitasInput = document.getElementById("identitas");
const passwordInput = document.getElementById("password");
const pesanLogin = document.getElementById("pesanLogin");

formLogin.addEventListener("submit", function (event) {
  // Mencegah browser mengirim form / memuat ulang halaman.
  event.preventDefault();

  const identitas = identitasInput.value.trim();
  const password = passwordInput.value;
  let daftarError = [];

  // Periksa apakah username atau email sudah diisi.
  if (identitas === "") {
    daftarError.push("Username atau email wajib diisi.");
  } else if (identitas.includes("@")) {
    // Jika input mengandung @, anggap pengguna sedang memasukkan email.
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!polaEmail.test(identitas)) {
      daftarError.push("Format email belum valid.");
    }
  }

  // Password harus diisi dan minimal 8 karakter.
  if (password.trim() === "") {
    daftarError.push("Password wajib diisi.");
  } else if (password.length < 8) {
    daftarError.push("Password harus terdiri dari minimal 8 karakter.");
  }

  // Bersihkan gaya validasi lama sebelum menampilkan hasil baru.
  identitasInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");

  if (daftarError.length > 0) {
    pesanLogin.className = "alert alert-danger";
    pesanLogin.innerHTML = "<strong>Periksa kembali:</strong><ul class='mb-0'>" +
      daftarError.map(function (error) {
        return "<li>" + error + "</li>";
      }).join("") + "</ul>";

    if (identitas === "" || (identitas.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identitas))) {
      identitasInput.classList.add("is-invalid");
    }
    if (password.trim() === "" || password.length < 8) {
      passwordInput.classList.add("is-invalid");
    }
  } else {
    pesanLogin.className = "alert alert-success";
    pesanLogin.textContent = "Validasi berhasil! Input sudah memenuhi ketentuan demo. Ini belum merupakan login akun sungguhan.";
    formLogin.reset();
  }
});
