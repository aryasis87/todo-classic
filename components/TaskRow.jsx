'use client';
import { useState, useRef, useEffect } from 'react';
import { Check, Clock, Pencil, Trash2, X, Flag, Undo2 } from 'lucide-react';
import { tampilJam } from '@/lib/tugas';
import { menit } from '@/lib/waktu';

export default function TaskRow({ task, terbawa, sekarang, onToggle, onEdit, onRemove, onPrioritas }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const inputRef = useRef(null);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const save = () => {
    const t = draft.trim();
    if (t) onEdit(task.id, t); else setDraft(task.text);
    setEditing(false);
  };
  const onKey = (e) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') { setDraft(task.text); setEditing(false); }
  };
  // Jam terlewat hanya untuk tugas hari ini yang belum selesai.
  const lewat = task.jam && !task.done && !terbawa && sekarang && menit(task.jam) < sekarang.getHours() * 60 + sekarang.getMinutes();
  const penting = task.priority && !task.done;

  return (
    <li className={`group relative flex items-start gap-4 overflow-hidden rounded-xl border px-4 py-3.5 transition-colors ${
      penting ? 'border-primary/20 bg-surface-container-lowest/70 hover:border-primary/40' : 'border-transparent hover:border-surface-container-highest/60 hover:bg-surface-container-lowest/70'
    }`}>
      {penting && <span className="check-grad absolute bottom-0 left-0 top-0 w-1" aria-hidden="true" />}

      <button type="button" onClick={() => onToggle(task.id)} role="checkbox" aria-checked={task.done}
        aria-label={`${task.done ? 'Batalkan selesai' : 'Tandai selesai'}: ${task.text}`}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          task.done ? 'check-grad border-transparent' : 'border-outline group-hover:border-primary'
        } ${penting ? 'ml-1' : ''}`}>
        <Check size={15} strokeWidth={3} aria-hidden="true" className={`text-on-primary transition-all duration-200 ${task.done ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <label className="block">
            <span className="sr-only">Ubah tugas</span>
            <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={save} onKeyDown={onKey}
              className="w-full rounded-md border border-primary/40 bg-surface-container-lowest px-2 py-1 text-base text-on-surface outline-none focus:border-primary" />
          </label>
        ) : (
          <p onDoubleClick={() => setEditing(true)} className={`break-words text-base leading-relaxed ${task.done ? 'text-on-surface-variant line-through' : 'text-on-surface'} ${penting ? 'font-medium' : ''}`}>
            {task.text}
          </p>
        )}

        {!editing && (task.jam || penting || terbawa > 0) && !task.done && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {task.jam && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${lewat ? 'text-error' : 'text-primary'}`}>
                <Clock size={13} aria-hidden="true" /> {tampilJam(task.jam)}{lewat ? ' · lewat' : ''}
              </span>
            )}
            {penting && <span className="rounded-md bg-error-container px-2 py-0.5 text-xs font-semibold text-on-error-container">Prioritas</span>}
            {terbawa > 0 && <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-semibold text-on-surface-variant"><Undo2 size={12} aria-hidden="true" /> Terbawa {terbawa} hari</span>}
          </div>
        )}
      </div>

      {/* Aksi: selalu tampak di layar sentuh, muncul saat hover di layar lebar. */}
      <div className="flex shrink-0 items-center gap-0.5 transition-opacity md:opacity-0 md:focus-within:opacity-100 md:group-hover:opacity-100">
        {editing ? (
          <>
            <button type="button" onClick={save} aria-label="Simpan" className="rounded-lg p-1.5 text-primary hover:bg-surface-container-high/60"><Check size={17} /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setDraft(task.text); setEditing(false); }} aria-label="Batal" className="rounded-lg p-1.5 text-on-surface-variant hover:text-error"><X size={17} /></button>
          </>
        ) : (
          <>
            {!task.done && (
              <button type="button" onClick={() => onPrioritas(task.id)} aria-pressed={!!task.priority} aria-label={`Prioritas: ${task.text}`} className={`rounded-lg p-1.5 hover:bg-surface-container-high/60 ${task.priority ? 'text-error' : 'text-on-surface-variant hover:text-primary'}`}><Flag size={15} /></button>
            )}
            <button type="button" onClick={() => setEditing(true)} aria-label={`Ubah: ${task.text}`} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-high/60 hover:text-primary"><Pencil size={15} /></button>
            <button type="button" onClick={() => onRemove(task.id)} aria-label={`Hapus: ${task.text}`} className="rounded-lg p-1.5 text-on-surface-variant hover:text-error"><Trash2 size={15} /></button>
          </>
        )}
      </div>
    </li>
  );
}
