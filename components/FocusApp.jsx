'use client';
import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import Sidebar from './Sidebar';
import ProgressArc from './ProgressArc';
import TaskRow from './TaskRow';
import AddBar from './AddBar';

const SEED = [
  { id: 1, text: 'Tinjau desain antarmuka portal klien', done: true },
  { id: 2, text: 'Siapkan draf proposal kuartal Q4', done: false, time: 'Hari ini, 14:00' },
  { id: 3, text: 'Balas email tim editorial mengenai revisi copy', done: false },
  { id: 4, text: 'Sinkronisasi data sistem lama ke server baru', done: false, priority: true },
  { id: 5, text: 'Meditasi 10 menit', done: false },
];

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'active', label: 'Aktif' },
  { key: 'completed', label: 'Selesai' },
];

function MobileThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('taskflow.theme', next ? 'dark' : 'light'); } catch {}
  };
  return (
    <button onClick={toggle} aria-label="Ganti tema" className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container-high/50">
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}

export default function FocusApp() {
  const [todos, setTodos, loaded] = useLocalStorage('focus.todos', SEED);
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');

  const add = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setTodos((p) => [{ id: Date.now(), text: v, done: false }, ...p]);
    setText('');
  };
  const toggle = (id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const editTask = (id, newText) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  const remove = (id) => setTodos((p) => p.filter((t) => t.id !== id));
  const clearCompleted = () => setTodos((p) => p.filter((t) => !t.done));

  const done = todos.filter((t) => t.done).length;
  const total = todos.length;
  const counts = { all: total, active: total - done, completed: done };

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="grain-overlay" />

      <Sidebar filter={filter} onFilter={setFilter} counts={counts} completed={done} onClearCompleted={clearCompleted} />

      <main className="relative min-w-0 flex-1">
        {/* Top bar mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-surface-container-highest/40 bg-surface/70 px-5 py-4 backdrop-blur-xl md:hidden">
          <h1 className="text-2xl font-bold tracking-tight text-primary">Hari ini</h1>
          <MobileThemeToggle />
        </header>

        <div className="no-scrollbar mx-auto w-full max-w-2xl px-5 pb-40 pt-8 md:px-10 md:pt-12">
          {/* Header editorial + progress */}
          <section className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-5xl">
                Fokus pada<br />yang penting.
              </h2>
              <p className="mt-4 text-lg text-on-surface-variant">{today}</p>
            </div>
            <ProgressArc done={done} total={total} />
          </section>

          {/* Filter tabs (mobile/tablet; di web ada di sidebar) */}
          <div className="mb-8 flex items-center gap-6 border-b border-surface-container-highest/50 md:hidden">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition-all ${
                  filter === f.key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          {!loaded ? (
            <p className="py-16 text-center text-sm text-on-surface-variant">Memuat…</p>
          ) : visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-on-surface-variant">
                {done === total && total > 0 ? 'Semua selesai! 🎉' : filter === 'completed' ? 'Belum ada yang selesai.' : 'Tidak ada tugas. Nikmati harimu.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {visible.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={toggle} onEdit={editTask} onRemove={remove} />
              ))}
            </div>
          )}

          {/* Hapus selesai (mobile) */}
          {done > 0 && (
            <div className="mt-6 md:hidden">
              <button onClick={clearCompleted} className="text-sm font-medium text-on-surface-variant transition-colors hover:text-error">
                Hapus selesai ({done})
              </button>
            </div>
          )}
        </div>

        <AddBar value={text} onChange={setText} onSubmit={add} />
      </main>
    </div>
  );
}
