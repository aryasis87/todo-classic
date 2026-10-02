// Model tugas "Hari Ini": setiap tugas milik satu hari; yang belum selesai terbawa ke hari berikutnya.
import { isoTanggal, sekarangWIB, tambahHari, keJam, menit } from './waktu';

export const KUNCI = 'hariini.tugas';

// "Telepon klien 14.00 !" → { text: 'Telepon klien', jam: '14:00', priority: true }
export function uraiInput(teks) {
  let t = teks.trim();
  let priority = false;
  if (/^!|\s!$|!$/.test(t)) { priority = true; t = t.replace(/^!\s*|\s*!$/g, ''); }
  let jam = null;
  const m = t.match(/(?:^|\s)(?:jam\s+)?([01]?\d|2[0-3])[.:]([0-5]\d)(?=\s|$)/i);
  if (m) { jam = keJam(Number(m[1]) * 60 + Number(m[2])); t = (t.slice(0, m.index) + t.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim(); }
  return { text: t || teks.trim(), jam, priority };
}

export const tampilJam = (jam) => jam.replace(':', '.');

// Tanggal (WIB) sebuah stempel waktu ISO.
export const tanggalDari = (iso) => isoTanggal(new Date(new Date(iso).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })));

// Tugas contoh untuk kunjungan pertama, relatif terhadap hari ini.
export function contoh() {
  const now = sekarangWIB();
  const hari = isoTanggal(now);
  const stempel = (hariKe, jam) => {
    const [y, mo, d] = tambahHari(hari, hariKe).split('-').map(Number);
    const h = Math.floor(menit(jam) / 60), mi = menit(jam) % 60;
    // Simpan sebagai waktu WIB (UTC+7).
    return new Date(Date.UTC(y, mo - 1, d, h - 7, mi)).toISOString();
  };
  let id = Date.now();
  const t = (text, extra = {}) => ({ id: id--, text, done: false, priority: false, jam: null, tanggal: hari, dibuat: stempel(0, '07:00'), ...extra });
  return [
    t('Balas email tim soal revisi naskah', { jam: '10:00' }),
    t('Siapkan draf proposal kuartal IV', { jam: '14:00', priority: true }),
    t('Belanja sayur untuk tiga hari'),
    t('Jalan sore dua puluh menit', { jam: '17:00' }),
    t('Tinjau desain halaman klien', { done: true, doneAt: stempel(0, '08:40') }),
    t('Bayar tagihan listrik', { tanggal: tambahHari(hari, -1), done: true, doneAt: stempel(-1, '19:20') }),
    t('Rapikan folder unduhan', { tanggal: tambahHari(hari, -1), done: true, doneAt: stempel(-1, '21:05') }),
    t('Kirim faktur bulan lalu', { tanggal: tambahHari(hari, -2), done: true, doneAt: stempel(-2, '11:15') }),
    t('Telepon Ibu', { tanggal: tambahHari(hari, -3), done: true, doneAt: stempel(-3, '20:00') }),
    t('Baca satu bab buku', { tanggal: tambahHari(hari, -3), done: true, doneAt: stempel(-3, '22:10') }),
    t('Perpanjang SIM', { tanggal: tambahHari(hari, -2) }),
  ];
}
