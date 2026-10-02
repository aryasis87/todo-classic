import Kerangka from '@/components/Kerangka';
import Rekap from '@/components/Rekap';

export const metadata = {
  title: 'Rekap 7 hari',
  description: 'Rekap tujuh hari terakhir: jumlah tugas selesai per hari, streak, dan tugas yang terbawa dari hari sebelumnya.',
  alternates: { canonical: '/rekap' },
};

export default function RekapPage() {
  return (
    <Kerangka>
      <h1 className="font-display text-5xl leading-tight text-on-surface">Rekap <em className="text-primary">tujuh hari</em></h1>
      <p className="mt-3 text-on-surface-variant">Dihitung dari tugas yang kamu tandai selesai di peramban ini.</p>
      <div className="mt-10"><Rekap /></div>
    </Kerangka>
  );
}
