# Clashub - Platform Komunitas E-sports Clash of Clans

Clashub adalah sebuah prototipe *front-end* untuk platform web yang dirancang sebagai pusat bagi para pemain dan tim E-sports Clash of Clans. Aplikasi ini bertujuan untuk menjembatani pemain dalam mencari tim, mengelola aktivitas klan, berpartisipasi dalam turnamen, dan berbagi pengetahuan strategi.

## 📜 Deskripsi Proyek

Di dunia kompetitif Clash of Clans, koordinasi tim, pencarian pemain yang berkomitmen, dan akses ke informasi turnamen yang terpusat adalah kunci kemenangan. Clashub dirancang untuk mengatasi tantangan ini dengan menyediakan serangkaian alat yang terintegrasi dalam satu platform yang mudah digunakan. Dari pemain kasual yang mencari klan aktif hingga tim profesional yang berlaga di liga, Clashub menyediakan fitur untuk semua level permainan.

Proyek ini sepenuhnya dibangun dengan HTML, CSS, dan JavaScript vanilla, menunjukkan desain antarmuka yang kaya fitur dan interaktif tanpa memerlukan *framework* eksternal.

## ✨ Fitur Utama

Proyek ini mencakup berbagai halaman dan fungsionalitas, di antaranya:

  * **🏠 Beranda (Dashboard)**: Tampilan ringkas status war klan, informasi tim pengguna, ringkasan profil, dan rekomendasi tim serta strategi terbaru.
  * **🛡️ Team Hub**:
      * Pencarian tim dengan filter canggih (visi kompetitif/kasual, reputasi minimum, level TH).
      * Profil publik klan yang detail, menampilkan statistik, visi, aturan, dan riwayat kompetisi.
      * Sistem manajemen roster untuk kapten (menerima/menolak anggota, mengatur peran).
  * **🏆 Turnamen & Liga**:
      * Daftar turnamen dengan filter (status, level TH, hadiah).
      * Halaman detail turnamen lengkap dengan aturan dan panel pendaftaran.
      * Sistem klasemen (liga) yang menampilkan peringkat tim dalam format podium dan tabel.
  * **🧠 Knowledge Hub (Forum)**:
      * Tempat untuk berbagi dan mendiskusikan strategi, *base building*, dan berita komunitas.
      * Sistem filter berdasarkan kategori dan sortir (terbaru, paling trending).
  * **👤 Profil Pengguna (E-Sports CV)**:
      * Profil pengguna yang mendetail berfungsi sebagai "CV" pemain, menampilkan statistik game, bio, preferensi, riwayat tim, dan aktivitas postingan.
      * Sistem reputasi berbasis ulasan dari mantan rekan satu tim.
  * **🛠️ Alat Manajemen Tim**:
      * **Kalender Tim**: Mengatur dan melihat jadwal war, latihan, atau rapat strategi.
      * **War Command Center**: Papan strategi *real-time* saat war berlangsung untuk koordinasi serangan.
  * **🔔 Pusat Notifikasi**: Memberi tahu pengguna tentang permintaan bergabung, jadwal war, dan pengumuman sistem.
  * **🎨 UI Interaktif**:
      * Tema Ganda (Light & Dark Mode) yang tersimpan di preferensi pengguna.
      * Efek suara untuk interaksi UI (klik & hover).
      * *Overlay* pencarian global untuk akses cepat ke pemain atau tim.

## 🚀 Teknologi yang Digunakan

Proyek ini murni merupakan implementasi *front-end* dan tidak memerlukan *backend* atau proses *build*.

  * **HTML5**: Sebagai struktur utama dari semua halaman.
  * **CSS3**: Untuk styling, layouting (Grid & Flexbox), tema, dan responsivitas.
  * **JavaScript (Vanilla)**: Untuk semua interaktivitas, termasuk:
      * Manipulasi DOM
      * Filtering & Sorting data secara dinamis
      * Navigasi Tab
      * Penyimpanan data di `localStorage` (tema & data edit profil)
      * Event Handling

## 🏁 Memulai

Karena ini adalah proyek *front-end* statis, Anda tidak memerlukan instalasi yang rumit.

1.  **Clone repository ini:**

    ```sh
    git clone https://github.com/nama-anda/Clashub.git
    ```

2.  **Buka folder proyek:**

    ```sh
    cd Clashub
    ```

3.  **Buka file `index.html`** di browser favorit Anda.

      * **Rekomendasi:** Untuk pengalaman pengembangan terbaik, gunakan ekstensi **Live Server** di Visual Studio Code. Konfigurasi untuk ini sudah disertakan dalam file `.vscode/launch.json`.

## 📂 Struktur File

Struktur file diatur agar mudah dipahami, dengan pemisahan yang jelas antara konten, styling, logika, dan aset.

```
/
├── images/             # Semua aset gambar (logo, avatar, TH, dll.)
├── sounds/             # File audio untuk efek suara UI
├── .vscode/            # Pengaturan spesifik VS Code
├── auth.html           # Halaman Login & Registrasi
├── index.html          # Halaman utama (Dashboard)
├── teamhub.html        # Halaman pencarian tim
├── tournament.html     # Halaman daftar turnamen
├── knowledge_hub.html  # Halaman forum
├── user_profile.html   # Halaman profil pengguna
├── ... (file HTML lainnya untuk setiap fitur)
├── interactive.js      # File JavaScript utama untuk semua interaktivitas
└── styles.css          # File CSS utama untuk semua styling
```