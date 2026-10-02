import Link from 'next/link';
import Kerangka from '@/components/Kerangka';

export const metadata = {
  title: 'Panduan',
  description: 'Cara memakai Hari Ini: menulis jam dan prioritas langsung di bilah tambah, pintasan papan ketik, tugas yang terbawa, dan di mana data disimpan.',
  alternates: { canonical: '/panduan' },
};

const SINTAKS = [
  ['Telepon klien 14.00', 'Tugas dengan jam 14.00. Bisa juga 14:00 atau "jam 9.30".'],
  ['! Kirim laporan', 'Tanda seru di awal atau akhir menjadikannya prioritas.'],
  ['Rapat tim 10.00 !', 'Jam dan prioritas sekaligus.'],
];
const PINTASAN = [
  ['Ctrl/⌘ + K', 'Fokus ke bilah tambah'],
  ['Enter', 'Simpan tugas, atau simpan saat mengubah'],
  ['Esc', 'Batalkan perubahan'],
  ['Klik ganda', 'Ubah teks tugas'],
];

export default function PanduanPage() {
  return (
    <Kerangka>
      <h1 className="font-display text-5xl leading-tight text-on-surface">Panduan <em className="text-primary">singkat</em></h1>
      <p className="mt-3 text-on-surface-variant">Hari Ini sengaja sederhana: satu daftar untuk satu hari.</p>

      <section className="mt-10" aria-labelledby="h-sintaks">
        <h2 id="h-sintaks" className="font-display text-2xl text-on-surface">Menulis di bilah tambah</h2>
        <dl className="mt-4 divide-y divide-surface-container-highest/60 rounded-2xl border border-surface-container-highest/60 bg-surface-container-lowest/70">
          {SINTAKS.map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-4">
              <dt><code className="rounded bg-surface-container-high px-2 py-1 text-sm text-on-surface">{k}</code></dt>
              <dd className="text-on-surface-variant">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="h-pintasan">
        <h2 id="h-pintasan" className="font-display text-2xl text-on-surface">Pintasan</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {PINTASAN.map(([k, v]) => (
            <div key={k} className="flex items-center gap-3 rounded-xl border border-surface-container-highest/60 px-4 py-3">
              <dt><kbd className="rounded border border-outline-variant/60 bg-surface-container-high px-2 py-1 text-xs font-semibold text-on-surface">{k}</kbd></dt>
              <dd className="text-sm text-on-surface-variant">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 space-y-4 text-on-surface-variant" aria-labelledby="h-cara">
        <h2 id="h-cara" className="font-display text-2xl text-on-surface">Cara kerjanya</h2>
        <p><strong className="text-on-surface">Yang selesai hilang besok.</strong> Tugas yang dicentang tetap terlihat sampai tengah malam (WIB), lalu pindah ke <Link href="/rekap" className="font-semibold text-primary underline underline-offset-4">rekap</Link>.</p>
        <p><strong className="text-on-surface">Yang belum selesai ikut terbawa.</strong> Tugas dari hari sebelumnya tetap di daftar dengan tanda “terbawa N hari” — pengingat halus untuk menyelesaikan, memindahkan, atau menghapusnya.</p>
        <p><strong className="text-on-surface">Datanya milikmu.</strong> Semua tersimpan di peramban ini (localStorage). Tidak ada akun dan tidak ada server; menghapus data situs akan mengosongkan daftar.</p>
      </section>
    </Kerangka>
  );
}
