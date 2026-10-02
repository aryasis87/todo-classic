import Link from 'next/link';
import Sidebar, { TemaTombol } from './Sidebar';

// Kerangka halaman dalam: sidebar di layar lebar, bilah atas di ponsel.
export default function Kerangka({ children }) {
  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="grain-overlay" aria-hidden="true" />
      <Sidebar />
      <div className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-surface-container-highest/40 bg-surface/80 px-5 py-3 backdrop-blur-xl md:hidden">
          <Link href="/" className="font-display text-2xl text-primary">Hari Ini</Link>
          <nav aria-label="Halaman" className="flex items-center gap-1 text-sm font-semibold">
            <Link href="/rekap" className="rounded-full px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-high/60">Rekap</Link>
            <Link href="/panduan" className="rounded-full px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-high/60">Panduan</Link>
            <TemaTombol ringkas />
          </nav>
        </header>
        <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-8 md:px-10 md:pt-12">{children}</main>
      </div>
    </div>
  );
}
