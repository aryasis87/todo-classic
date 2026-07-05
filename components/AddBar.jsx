'use client';
import { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

// Floating quick-add bar (glassmorphism + ambient shadow). ⌘K / Ctrl+K untuk fokus.
export default function AddBar({ value, onChange, onSubmit }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="ambient-shadow fixed bottom-6 left-1/2 z-40 flex w-[calc(100%-40px)] max-w-xl -translate-x-1/2 items-center gap-3 rounded-2xl border border-surface-container-highest bg-surface/80 px-4 py-3 backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.01] md:left-[calc(50%+9rem)]"
    >
      <button type="submit" aria-label="Tambah tugas" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-on-primary">
        <Plus size={20} />
      </button>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tambah tugas baru..."
        className="min-w-0 flex-1 border-none bg-transparent p-0 text-base text-on-surface outline-none placeholder:text-on-surface-variant/60 focus:ring-0"
      />
      <div className="hidden items-center gap-1 opacity-60 md:flex">
        <kbd className="rounded border border-outline-variant/40 bg-surface-container-high px-2 py-1 text-xs font-medium text-on-surface-variant shadow-sm">⌘</kbd>
        <kbd className="rounded border border-outline-variant/40 bg-surface-container-high px-2 py-1 text-xs font-medium text-on-surface-variant shadow-sm">K</kbd>
      </div>
    </form>
  );
}
