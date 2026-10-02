'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, CircleDot, CheckCircle2, Moon, Sun, Trash2, BarChart3, BookOpen, ListTodo } from 'lucide-react';

const NAV = [
  { key: 'all', label: 'Semua', icon: Inbox },
  { key: 'active', label: 'Aktif', icon: CircleDot },
  { key: 'completed', label: 'Selesai', icon: CheckCircle2 },
];
const HALAMAN = [
  { href: '/', label: 'Hari ini', icon: ListTodo },
  { href: '/rekap', label: 'Rekap 7 hari', icon: BarChart3 },
  { href: '/panduan', label: 'Panduan', icon: BookOpen },
];

// Tombol tema; preferensi disimpan di peramban.
export function TemaTombol({ ringkas = false }) {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('hariini.tema', next ? 'dark' : 'light'); } catch {}
  };
  if (ringkas) {
    return (
      <button type="button" onClick={toggle} aria-label={dark ? 'Pakai mode terang' : 'Pakai mode gelap'} className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container-high/50">
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }
  return (
    <button type="button" onClick={toggle} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/60">
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />} {dark ? 'Mode terang' : 'Mode gelap'}
    </button>
  );
}

// Sidebar (layar lebar): merek, halaman, saringan (khusus halaman utama), kontrol bawah.
export default function Sidebar({ filter, onFilter, counts, completed, onClearCompleted }) {
  const path = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-surface-container-highest/50 bg-surface-container-low/60 p-6 md:flex">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="check-grad flex h-11 w-11 items-center justify-center rounded-2xl text-on-primary shadow-lg shadow-primary/20" aria-hidden="true">
          <CheckCircle2 size={22} />
        </span>
        <span>
          <span className="block font-display text-2xl leading-none text-on-surface">Hari Ini</span>
          <span className="mt-1 block text-xs text-on-surface-variant">Satu daftar, satu hari</span>
        </span>
      </Link>

      <nav aria-label="Halaman" className="flex flex-col gap-1">
        {HALAMAN.map(({ href, label, icon: Icon }) => {
          const aktif = href === '/' ? path === '/' : path?.startsWith(href);
          return (
            <Link key={href} href={href} aria-current={aktif ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${aktif ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/60'}`}>
              <Icon size={18} aria-hidden="true" /> {label}
            </Link>
          );
        })}
      </nav>

      {onFilter && (
        <div className="mt-8">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Saring</p>
          <div className="mt-2 flex flex-col gap-1" role="group" aria-label="Saring tugas">
            {NAV.map(({ key, label, icon: Icon }) => {
              const active = filter === key;
              return (
                <button key={key} type="button" onClick={() => onFilter(key)} aria-pressed={active}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${active ? 'bg-secondary-container/15 text-secondary' : 'text-on-surface-variant hover:bg-surface-container-high/60'}`}>
                  <Icon size={17} aria-hidden="true" /> {label}
                  <span className="ml-auto rounded-full bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant">{counts[key]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-auto space-y-1 border-t border-surface-container-highest/50 pt-4">
        {completed > 0 && (
          <button type="button" onClick={onClearCompleted} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/60 hover:text-error">
            <Trash2 size={18} aria-hidden="true" /> Hapus selesai hari ini ({completed})
          </button>
        )}
        <TemaTombol />
      </div>
    </aside>
  );
}
