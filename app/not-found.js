import Link from 'next/link';
import Kerangka from '@/components/Kerangka';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  return (
    <Kerangka>
      <p className="font-display text-7xl text-primary">404</p>
      <h1 className="mt-4 font-display text-4xl text-on-surface">Halaman ini tidak ada di daftar.</h1>
      <p className="mt-3 text-on-surface-variant">Mungkin tautannya salah ketik.</p>
      <Link href="/" className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary">Kembali ke hari ini</Link>
    </Kerangka>
  );
}
