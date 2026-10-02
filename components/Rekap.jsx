'use client';
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { tambahHari, fmtTanggal } from '@/lib/waktu';
import { KUNCI, tanggalDari } from '@/lib/tugas';

// Rekap tujuh hari: jumlah selesai per hari, streak, dan daftar per hari.
export default function Rekap() {
  const [todos, setTodos, loaded] = useLocalStorage(KUNCI, null);
  const { hari } = useHariIni();
  if (!loaded || !hari) return <p className="py-16 text-center text-sm text-on-surface-variant">Memuat…</p>;

  const selesai = (todos || []).filter((t) => t.done && t.doneAt);
  const perHari = (d) => selesai.filter((t) => tanggalDari(t.doneAt) === d);
  const hariHari = Array.from({ length: 7 }, (_, i) => tambahHari(hari, i - 6));
  const angka = hariHari.map((d) => perHari(d).length);
  const maks = Math.max(1, ...angka);
  const total7 = angka.reduce((a, b) => a + b, 0);

  // Streak: hari berturut-turut (mundur dari hari ini, atau kemarin bila hari ini belum ada) dengan ≥1 tugas selesai.
  let streak = 0;
  let d = perHari(hari).length ? hari : tambahHari(hari, -1);
  while (perHari(d).length) { streak++; d = tambahHari(d, -1); }

  const tertunda = (todos || []).filter((t) => !t.done && t.tanggal < hari).length;
  const bersihkan = () => { if (window.confirm('Hapus semua tugas yang sudah selesai sebelum hari ini?')) setTodos((p) => p.filter((t) => !t.done || tanggalDari(t.doneAt) === hari)); };

  return (
    <div>
      <dl className="grid grid-cols-3 gap-3">
        {[['Selesai 7 hari', total7], ['Streak', `${streak} hari`], ['Terbawa', tertunda]].map(([l, v]) => (
          <div key={l} className="flex flex-col-reverse rounded-2xl border border-surface-container-highest/60 bg-surface-container-lowest/70 p-4">
            <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-on-surface-variant">{l}</dt>
            <dd className="font-display text-3xl text-on-surface">{v}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="h-grafik" className="mt-10">
        <h2 id="h-grafik" className="font-display text-2xl text-on-surface">Tugas selesai per hari</h2>
        <ol className="mt-5 flex h-48 items-end gap-2 border-b border-surface-container-highest pb-2">
          {hariHari.map((h, i) => (
            <li key={h} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-xs font-semibold text-on-surface">{angka[i]}</span>
              <span className={`w-full max-w-10 rounded-t-lg ${h === hari ? 'check-grad' : 'bg-primary/35'}`} style={{ height: `${(angka[i] / maks) * 100}%`, minHeight: angka[i] ? 6 : 2 }} aria-hidden="true" />
              <span className="sr-only">{fmtTanggal(h)}: {angka[i]} selesai</span>
            </li>
          ))}
        </ol>
        <div className="mt-2 flex gap-2" aria-hidden="true">
          {hariHari.map((h) => <span key={h} className={`flex-1 text-center text-xs ${h === hari ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>{h === hari ? 'Hari ini' : fmtTanggal(h, { weekday: 'short' })}</span>)}
        </div>
      </section>

      <section aria-labelledby="h-daftar" className="mt-12">
        <h2 id="h-daftar" className="font-display text-2xl text-on-surface">Yang sudah dikerjakan</h2>
        {total7 === 0 ? (
          <p className="mt-3 text-on-surface-variant">Belum ada tugas selesai minggu ini. <Link href="/" className="font-semibold text-primary underline underline-offset-4">Mulai dari hari ini</Link>.</p>
        ) : (
          <div className="mt-4 space-y-6">
            {[...hariHari].reverse().filter((h) => perHari(h).length).map((h) => (
              <div key={h}>
                <h3 className="text-sm font-semibold text-on-surface-variant">{h === hari ? 'Hari ini' : fmtTanggal(h)}</h3>
                <ul className="mt-2 space-y-1.5">
                  {perHari(h).map((t) => (
                    <li key={t.id} className="flex items-baseline justify-between gap-4 text-on-surface">
                      <span>{t.text}</span>
                      <span className="shrink-0 text-xs text-on-surface-variant">{new Date(t.doneAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {selesai.some((t) => tanggalDari(t.doneAt) < hari) && (
          <button type="button" onClick={bersihkan} className="mt-8 text-sm font-medium text-on-surface-variant underline underline-offset-4 hover:text-error">Bersihkan riwayat sebelum hari ini</button>
        )}
      </section>
    </div>
  );
}
