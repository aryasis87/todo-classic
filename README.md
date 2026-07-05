# Classic To-Do

To-do list klasik yang rapi & lengkap. Varian fundamental dari portfolio (3 varian: Classic, Kanban, Rich Task Manager).

## Fitur
- Tambah, **edit inline** (klik ikon pensil / dobel-klik teks), centang selesai, hapus
- Filter **Semua / Aktif / Selesai** + penghitung "x tersisa"
- **Hapus yang selesai** sekaligus
- **Persist ke localStorage** (data tetap setelah refresh)
- Responsif (HP–desktop) & aksesibel (peran checkbox, label tombol, fokus keyboard)

## Stack
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · lucide-react

## Struktur
- `components/TodoApp.jsx` — state utama, input, filter, daftar
- `components/TodoItem.jsx` — baris tugas + edit inline
- `lib/useLocalStorage.js` — hook persist (aman dari hydration mismatch)

## Menjalankan
```bash
npm install
npm run dev
```
