# AGENTS.md — Sistem Informasi Klinik

## Project Overview

**Nama Proyek:** Sistem Informasi Klinik
**Deskripsi:** Aplikasi berbasis web untuk membantu pengelolaan data klinik (pasien, dokter, jadwal pemeriksaan, rekam medis, transaksi pembayaran, dan laporan klinik) secara cepat, terstruktur, dan efisien.

**Latar Belakang:**
Banyak klinik masih menggunakan pencatatan manual sehingga pelayanan lambat, data pasien sulit dicari, dan laporan kurang efektif. Sistem ini hadir sebagai solusi berbasis web untuk menggantikan proses manual tersebut.

---

## Tech Stack

| Komponen          | Tools                |
|-------------------|----------------------|
| Sistem Operasi    | Windows, Linux       |
| Bahasa Pemrograman| Golang, JavaScript   |
| Framework         | Gin, Tailwind CSS    |
| Database          | PostgreSQL           |
| Code Editor       | Visual Studio Code   |
| Version Control   | Git & GitHub         |
| Desain UI/UX      | Figma                |
| Pengujian API     | Postman              |

---

## User Roles

- **Admin** — mengelola seluruh data dan konfigurasi sistem
- **Petugas Klinik** — mengelola data pasien dan transaksi pembayaran
- **Dokter** — mengelola rekam medis dan hasil pemeriksaan
- **Pasien** — melihat data pribadi dan rekam medis

---

## Functional Requirements

1. Login pengguna
2. Kelola data pasien
3. Kelola data dokter
4. Kelola jadwal pemeriksaan
5. Kelola rekam medis pasien
6. Transaksi pembayaran
7. Cetak laporan klinik

---

## Non-Functional Requirements

- Sistem mudah digunakan (user-friendly)
- Data tersimpan di database (PostgreSQL)
- Sistem memiliki keamanan login (autentikasi)
- Sistem dapat dijalankan melalui browser
- Tampilan responsive
- Sistem mampu menyimpan data secara realtime

---

## API Endpoints

| Fitur             | Method | Endpoint              |
|-------------------|--------|-----------------------|
| Login             | POST   | `/api/login`          |
| Data Pasien       | GET    | `/api/patients`       |
| Tambah Pasien     | POST   | `/api/patients`       |
| Data Dokter       | GET    | `/api/doctors`        |
| Tambah Dokter     | POST   | `/api/doctors`        |
| Rekam Medis       | GET    | `/api/medical-records`|
| Tambah Rekam Medis| POST   | `/api/medical-records`|
| Pembayaran        | POST   | `/api/payments`       |
| Laporan           | GET    | `/api/reports`        |

---

## UI/UX Flows

### Flow Login
1. Pengguna membuka halaman login.
2. Pengguna memasukkan username dan password.
3. Pengguna menekan tombol login.
4. Sistem memeriksa data pengguna.
5. Jika benar → pengguna masuk ke dashboard.
6. Jika salah → sistem menampilkan pesan kesalahan.

### Flow Tambah Data Pasien
1. Petugas membuka menu data pasien.
2. Petugas menekan tombol "Tambah Pasien".
3. Sistem menampilkan form input pasien.
4. Petugas mengisi nama, alamat, nomor telepon, dan tanggal lahir.
5. Petugas menekan tombol "Simpan".
6. Sistem menyimpan data ke database.
7. Sistem menampilkan notifikasi berhasil.

### Flow Tambah Rekam Medis
1. Dokter membuka menu rekam medis.
2. Dokter memilih pasien.
3. Dokter menambahkan hasil pemeriksaan pasien.
4. Sistem menyimpan data rekam medis ke database.
5. Rekam medis dapat dilihat kembali saat pemeriksaan berikutnya.

### Flow Pembayaran
1. Petugas membuka menu pembayaran.
2. Sistem menampilkan data pemeriksaan pasien.
3. Petugas memasukkan biaya pemeriksaan dan obat.
4. Sistem menghitung total pembayaran.
5. Petugas menekan tombol "Bayar".
6. Sistem menyimpan transaksi dan mencetak bukti pembayaran.

---

## Development — Tahap 1

### Fitur yang Dikembangkan
- [ ] Login pengguna
- [ ] Kelola data pasien
- [ ] Kelola data dokter
- [ ] Rekam medis sederhana
- [ ] Dashboard admin

### Alur Fitur: Tambah Pasien

**Front-End:**
1. Petugas membuka halaman data pasien.
2. Petugas menekan tombol "Tambah Pasien".
3. Sistem menampilkan form tambah pasien.
4. Petugas mengisi nama, alamat, nomor telepon, dan tanggal lahir.
5. Petugas menekan tombol "Simpan".
6. Sistem menampilkan pesan "Data pasien berhasil disimpan".

**Back-End:**
1. API menerima data pasien dari front-end.
2. Back-end melakukan validasi data pasien.
3. Jika data lengkap, back-end menyimpan data ke database PostgreSQL.
4. Back-end mengirim response berhasil.
5. Front-end menampilkan notifikasi berhasil kepada pengguna.

**Full Flow (End-to-End):**
1. Admin/petugas membuka menu data pasien.
2. Pengguna memilih tombol "Tambah Pasien".
3. Sistem menampilkan form input data pasien.
4. Pengguna mengisi data pasien dengan lengkap.
5. Data dikirim ke server melalui API.
6. Server melakukan validasi data.
7. Jika valid, data disimpan ke database PostgreSQL.
8. Sistem mengembalikan response sukses.
9. Front-end menampilkan data pasien terbaru pada tabel data pasien.
