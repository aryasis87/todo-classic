'use client';
import { useEffect, useState } from 'react';
import { Inbox, CircleDot, CheckCircle2, Moon, Sun, Trash2 } from 'lucide-react';

// Sidebar (web): brand, profil, filter sebagai navigasi (berfungsi), kontrol bawah.
const NAV = [
  { key: 'all', label: 'Semua', icon: Inbox },
  { key: 'active', label: 'Aktif', icon: CircleDot },
  { key: 'completed', label: 'Selesai', icon: CheckCircle2 },
];

export default function Sidebar({ filter, onFilter, counts, completed, onClearCompleted }) {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('taskflow.theme', next ? 'dark' : 'light'); } catch {}
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-surface-container-highest/50 bg-surface-container-low/60 p-6 md:flex">
      {/* Brand / profil */}
      <div className="mb-10 flex items-center gap-3">
        <span className="check-grad flex h-11 w-11 items-center justify-center rounded-2xl text-on-primary shadow-lg shadow-primary/20">
          <CheckCircle2 size={22} />
        </span>
        <div>
          <p className="font-bold text-on-surface">Hari Ini</p>
          <p className="text-xs text-on-surface-variant">Ruang fokusmu</p>
        </div>
      </div>

      {/* Navigasi = filter */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => onFilter(key)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                active ? 'bg-secondary-container/15 text-secondary' : 'text-on-surface-variant hover:bg-surface-container-high/60'
              }`}
            >
              <Icon size={18} className={active ? 'fill-secondary/20' : ''} /> {label}
              <span className="ml-auto rounded-full bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant">
                {counts[key]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bawah */}
      <div className="mt-auto space-y-1 border-t border-surface-container-highest/50 pt-4">
        {completed > 0 && (
          <button onClick={onClearCompleted} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/60 hover:text-error">
            <Trash2 size={18} /> Hapus selesai ({completed})
          </button>
        )}
        <button onClick={toggleTheme} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/60">
          {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? 'Mode terang' : 'Mode gelap'}
        </button>
      </div>
    </aside>
  );
}
