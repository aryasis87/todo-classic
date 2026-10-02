'use client';
import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { uraiInput, tampilJam } from '@/lib/tugas';

// Bilah tambah mengambang. Ctrl/⌘ + K untuk fokus; "14.00" menjadi jam, "!" menjadi prioritas.
export default function AddBar({ value, onChange, onSubmit }) {
  const inputRef = useRef(null);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const u = value.trim() ? uraiInput(value) : null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-40px)] max-w-xl -translate-x-1/2 md:left-[calc(50%+9rem)]">
      {u && (u.jam || u.priority) && (
        <p className="mb-2 rounded-lg bg-surface-container-high/90 px-3 py-1.5 text-xs text-on-surface-variant backdrop-blur" aria-live="polite">
          Akan disimpan: <strong className="text-on-surface">{u.text}</strong>{u.jam ? ` · jam ${tampilJam(u.jam)}` : ''}{u.priority ? ' · prioritas' : ''}
        </p>
      )}
      <form onSubmit={onSubmit} className="ambient-shadow flex items-center gap-3 rounded-2xl border border-surface-container-highest bg-surface/85 px-4 py-3 backdrop-blur-2xl">
        <button type="submit" aria-label="Tambah tugas" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-on-primary">
          <Plus size={20} />
        </button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Tugas baru</span>
          <input ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Tugas baru… (contoh: Telepon klien 14.00 !)"
            className="w-full border-none bg-transparent p-0 text-base text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-0" />
        </label>
        <span className="hidden items-center gap-1 md:flex" aria-hidden="true">
          <kbd className="rounded border border-outline-variant/60 bg-surface-container-high px-2 py-1 text-xs font-medium text-on-surface-variant">{mac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className="rounded border border-outline-variant/60 bg-surface-container-high px-2 py-1 text-xs font-medium text-on-surface-variant">K</kbd>
        </span>
      </form>
    </div>
  );
}
