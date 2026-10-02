'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { fmtTanggal, selisihHari } from '@/lib/waktu';
import { KUNCI, contoh, uraiInput, tanggalDari } from '@/lib/tugas';
import Sidebar, { TemaTombol } from './Sidebar';
import ProgressArc from './ProgressArc';
import TaskRow from './TaskRow';
import AddBar from './AddBar';

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'active', label: 'Aktif' },
  { key: 'completed', label: 'Selesai' },
];

export default function FocusApp() {
  const { hari, sekarang } = useHariIni(60);
  const [todos, setTodos, loaded] = useLocalStorage(KUNCI, null);
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');
  const [terhapus, setTerhapus] = useState(null);

  // Kunjungan pertama: isi contoh yang tanggalnya relatif terhadap hari ini.
  useEffect(() => { if (loaded && todos === null) setTodos(contoh()); }, [loaded, todos, setTodos]);
  // Notifikasi "urungkan" hilang sendiri.
  useEffect(() => { if (!terhapus) return; const t = setTimeout(() => setTerhapus(null), 6000); return () => clearTimeout(t); }, [terhapus]);

  const semua = todos || [];
  const add = (e) => {
    e.preventDefault();
    if (!text.trim() || !hari) return;
    const u = uraiInput(text);
    setTodos((p) => [{ id: Date.now(), done: false, tanggal: hari, dibuat: new Date().toISOString(), ...u }, ...(p || [])]);
    setText('');
  };
  const toggle = (id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done, doneAt: t.done ? null : new Date().toISOString() } : t)));
  const editTask = (id, newText) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  const togglePrioritas = (id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, priority: !t.priority } : t)));
  const remove = (id) => {
    const i = semua.findIndex((t) => t.id === id);
    setTerhapus({ tugas: semua[i], i });
    setTodos((p) => p.filter((t) => t.id !== id));
  };
  const urungkan = () => {
    if (!terhapus) return;
    setTodos((p) => { const n = [...p]; n.splice(terhapus.i, 0, terhapus.tugas); return n; });
    setTerhapus(null);
  };

  // Hari ini = tugas aktif (termasuk yang terbawa dari hari sebelumnya) + yang selesai hari ini.
  const hariIni = useMemo(() => (hari ? semua.filter((t) => !t.done || (t.doneAt && tanggalDari(t.doneAt) === hari)) : []), [semua, hari]);
  const done = hariIni.filter((t) => t.done).length;
  const total = hariIni.length;
  const counts = { all: total, active: total - done, completed: done };
  const clearCompleted = () => setTodos((p) => p.filter((t) => !(t.done && tanggalDari(t.doneAt) === hari)));

  const visible = useMemo(() => {
    const urut = [...hariIni].sort((a, b) => (a.done - b.done) || (b.priority - a.priority) || (a.jam || '99').localeCompare(b.jam || '99'));
    if (filter === 'active') return urut.filter((t) => !t.done);
    if (filter === 'completed') return urut.filter((t) => t.done);
    return urut;
  }, [hariIni, filter]);

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="grain-overlay" aria-hidden="true" />

      <Sidebar filter={filter} onFilter={setFilter} counts={counts} completed={done} onClearCompleted={clearCompleted} />

      <main className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-surface-container-highest/40 bg-surface/80 px-5 py-3 backdrop-blur-xl md:hidden">
          <p className="font-display text-2xl text-primary">Hari Ini</p>
          <nav aria-label="Halaman" className="flex items-center gap-1 text-sm font-semibold">
            <Link href="/rekap" className="rounded-full px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-high/60">Rekap</Link>
            <Link href="/panduan" className="rounded-full px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-high/60">Panduan</Link>
            <TemaTombol ringkas />
          </nav>
        </header>

        <div className="mx-auto w-full max-w-2xl px-5 pb-44 pt-8 md:px-10 md:pt-12">
          <section className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-display text-5xl leading-[1.05] text-on-surface md:text-6xl">
                Fokus pada<br /><em className="text-primary">yang penting.</em>
              </h1>
              <p className="mt-4 text-lg text-on-surface-variant">{hari ? fmtTanggal(hari, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ' '}</p>
            </div>
            <ProgressArc done={done} total={total} />
          </section>

          <div className="mb-8 flex items-center gap-6 border-b border-surface-container-highest/50 md:hidden" role="group" aria-label="Saring">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" onClick={() => setFilter(f.key)} aria-pressed={filter === f.key}
                className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition-all ${filter === f.key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
                {f.label} <span className="font-normal">({counts[f.key]})</span>
              </button>
            ))}
          </div>

          <h2 className="sr-only">Daftar tugas</h2>
          {!loaded || !hari || todos === null ? (
            <p className="py-16 text-center text-sm text-on-surface-variant">Memuat…</p>
          ) : visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-on-surface">
                {total > 0 && done === total ? 'Semua selesai.' : filter === 'completed' ? 'Belum ada yang selesai hari ini.' : 'Tidak ada tugas.'}
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">{total > 0 && done === total ? 'Lihat rekap minggu ini, atau tutup laptop.' : 'Tulis satu hal yang ingin kamu selesaikan hari ini.'}</p>
              {total > 0 && done === total && <Link href="/rekap" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Buka rekap</Link>}
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {visible.map((task) => (
                <TaskRow key={task.id} task={task} terbawa={!task.done && task.tanggal < hari ? selisihHari(task.tanggal, hari) : 0} sekarang={sekarang}
                  onToggle={toggle} onEdit={editTask} onRemove={remove} onPrioritas={togglePrioritas} />
              ))}
            </ul>
          )}

          {done > 0 && (
            <div className="mt-6 md:hidden">
              <button type="button" onClick={clearCompleted} className="text-sm font-medium text-on-surface-variant transition-colors hover:text-error">
                Hapus yang selesai hari ini ({done})
              </button>
            </div>
          )}
        </div>

        {terhapus && (
          <div role="status" className="fixed bottom-28 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl bg-on-surface px-4 py-3 text-sm text-background shadow-lg md:left-[calc(50%+9rem)]">
            <span>Tugas dihapus.</span>
            <button type="button" onClick={urungkan} className="font-semibold underline underline-offset-4">Urungkan</button>
          </div>
        )}

        <AddBar value={text} onChange={setText} onSubmit={add} />
      </main>
    </div>
  );
}
