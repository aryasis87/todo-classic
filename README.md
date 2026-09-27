# Hari Ini — Daftar Tugas Minimal & Fokus

To-do list yang tenang dan fokus, varian dasar dari tiga aplikasi to-do (Hari Ini, TaskFlow, Tuntas).

**Demo live:** https://todo-classic.vercel.app

![Tangkapan layar Hari Ini](public/og.jpg)

> Data tersimpan di browser (localStorage), tanpa backend.

## Konsep

Tata letak editorial dengan judul besar "Fokus pada yang penting." Ciri khasnya adalah **busur progres** bergradien yang menunjukkan berapa tugas yang sudah selesai, bilah tambah tugas yang melayang, dan tekstur grain halus. Mode gelapnya memakai tinta pekat, bukan abu-abu.

## Fitur

- Tambah tugas dari bilah melayang, bisa dibuka dengan **⌘K / Ctrl+K**
- **Edit inline** dengan klik ganda, centang selesai, hapus
- Filter **Semua / Aktif / Selesai** di sidebar lengkap dengan jumlahnya
- **Hapus yang selesai** sekaligus
- Penanda prioritas dan waktu pada tiap tugas
- Mode gelap/terang
- Tersimpan di localStorage (kunci `focus.todos`), aman dari hydration mismatch

## Struktur

- `components/FocusApp.jsx` — state utama, filter, tema
- `components/Sidebar.jsx` — merek, navigasi filter dengan jumlah, tombol tema, hapus yang selesai
- `components/ProgressArc.jsx` — busur progres selesai/total
- `components/TaskRow.jsx` — baris tugas, edit inline, penanda prioritas
- `components/AddBar.jsx` — bilah tambah tugas melayang (⌘K)
- `lib/useLocalStorage.js` — hook penyimpanan

## Teknologi

Next.js 15.5 (App Router) · React 19 · Tailwind CSS v4 · lucide-react

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

---

Bagian dari koleksi 3 aplikasi to-do di [PortalTodo](https://portal-todo.vercel.app). Dibuat oleh [PintuWeb](https://pintuweb.com), jasa pembuatan website.
