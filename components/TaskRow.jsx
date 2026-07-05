'use client';
import { useState, useRef, useEffect } from 'react';
import { Check, CalendarDays, Pencil, Trash2, X } from 'lucide-react';

export default function TaskRow({ task, onToggle, onEdit, onRemove }) {
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

  return (
    <div
      className={`group relative flex items-start gap-4 overflow-hidden rounded-xl border px-4 py-3.5 transition-colors ${
        task.priority && !task.done
          ? 'border-primary/15 bg-surface-container-lowest/60 hover:border-primary/30'
          : 'border-transparent hover:border-surface-container-highest/50 hover:bg-surface-container-lowest/70'
      }`}
    >
      {task.priority && !task.done && (
        <span className="check-grad absolute bottom-0 left-0 top-0 w-1" aria-hidden="true" />
      )}

      {/* Checkbox gradien */}
      <button
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.done}
        aria-label={task.done ? 'Tandai belum selesai' : 'Tandai selesai'}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          task.done ? 'check-grad border-transparent' : 'border-outline group-hover:border-primary'
        } ${task.priority && !task.done ? 'ml-1' : ''}`}
      >
        <Check
          size={15}
          strokeWidth={3}
          className={`text-on-primary transition-all duration-200 ${task.done ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        />
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={onKey}
            className="w-full rounded-md border border-primary/40 bg-surface-container-lowest px-2 py-1 text-base text-on-surface outline-none focus:border-primary"
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            className={`break-words text-base leading-relaxed ${task.done ? 'text-on-surface-variant line-through opacity-60' : 'text-on-surface'} ${task.priority && !task.done ? 'font-medium' : ''}`}
          >
            {task.text}
          </p>
        )}

        {!task.done && (task.time || task.priority) && !editing && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {task.time && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                <CalendarDays size={13} /> {task.time}
              </span>
            )}
            {task.priority && (
              <span className="rounded-md bg-error-container/40 px-2 py-0.5 text-xs font-semibold text-on-error-container">
                Prioritas
              </span>
            )}
          </div>
        )}
      </div>

      {/* Aksi */}
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        {editing ? (
          <button onClick={save} aria-label="Simpan" className="rounded-lg p-1.5 text-primary hover:bg-surface-container-high/60">
            <Check size={17} />
          </button>
        ) : (
          <button onClick={() => setEditing(true)} aria-label="Edit" className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-high/60 hover:text-primary">
            <Pencil size={15} />
          </button>
        )}
        <button onClick={() => onRemove(task.id)} aria-label="Hapus" className="rounded-lg p-1.5 text-on-surface-variant hover:text-error">
          {editing ? <X size={17} /> : <Trash2 size={15} />}
        </button>
      </div>
    </div>
  );
}
