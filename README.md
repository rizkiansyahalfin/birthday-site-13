# 🌸 Birthday Surprise Website

Website kado ulang tahun interaktif, dibangun dengan **Vue 3 + Vite + Tailwind CSS**.

## Struktur Flow

1. **Lock Screen** — gerbang PIN (kode rahasia)
2. **Gift Reveal** — tap kotak kado untuk masuk
3. **Hero** — nama & ucapan utama
4. **Bouquet** — bunga interaktif berisi pesan singkat
5. **Letter** — surat cinta panjang
6. **Photo Memories** — galeri foto gaya polaroid
7. **Timeline** — perjalanan kenangan bersama
8. **Playlist** — pemutar musik custom
9. **Gratitude Jar** — toples catatan "alasan bersyukur" (shake to reveal)
10. **Closing** — pesan penutup + modal ucapan akhir

## 🎨 Cara Personalisasi (PENTING — baca ini dulu)

**Semua teks, nama, tanggal, PIN, pesan, dan daftar lagu/foto ada di SATU file:**

```
src/data/content.js
```

Edit file itu saja — tidak perlu menyentuh komponen Vue lainnya. Bagian yang wajib diisi:

- `profile.recipientName`, `profile.senderName`, `profile.specialDate`
- `profile.secretPin` — kode PIN gerbang masuk (angka 0-9, panjang bebas)
- `letter.*` — isi surat
- `timeline.items` — 6 momen kenangan (boleh tambah/kurang)
- `gratitudeJar.notes` — catatan-catatan di toples

## 📸 Mengganti Foto

Letakkan file foto kamu di `public/photos/` dengan nama:
- `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`

Atau ubah nama file & caption di `content.js` bagian `photoMemories.photos`. Kalau foto belum ada, akan muncul placeholder otomatis (tidak error).

## 🎵 Mengganti Musik

Letakkan file MP3 di `public/audio/` dengan nama:
- `track-1.mp3`, `track-2.mp3`, `track-3.mp3`

Atau ubah path & judul/artis di `content.js` bagian `playlist.tracks`.

> ⚠️ Pastikan kamu punya hak untuk menggunakan file musik tersebut (untuk penggunaan pribadi/non-komersial biasanya aman, tapi tetap perhatikan lisensinya).

## 🚀 Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`

## 📦 Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `dist/`.

## ☁️ Deploy ke Vercel

**Cara tercepat (tanpa CLI):**
1. Push folder ini ke repo GitHub baru
2. Buka [vercel.com/new](https://vercel.com/new), import repo tersebut
3. Vercel otomatis mendeteksi Vite — klik **Deploy**

**Atau via CLI:**
```bash
npm install -g vercel
vercel
```

File `vercel.json` sudah disiapkan agar routing SPA berjalan benar.

## 🛠️ Struktur Folder

```
src/
  data/content.js       ← edit konten di sini
  components/
    FloatingFlowers.vue ← efek bunga melayang ambient
    MusicButton.vue      ← tombol musik mengambang
    Modal.vue             ← popup ucapan akhir
    sections/
      LockScreen.vue
      GiftReveal.vue
      Hero.vue
      Bouquet.vue
      Letter.vue
      PhotoMemories.vue
      Timeline.vue
      Playlist.vue
      GratitudeJar.vue
      Closing.vue
  composables/
    useReveal.js          ← animasi scroll-reveal
public/
  photos/                ← taruh foto di sini
  audio/                 ← taruh musik di sini
```

Selamat membuat kejutan! 🎉
