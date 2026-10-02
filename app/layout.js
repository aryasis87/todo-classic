import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"WebApplication","name":"Hari Ini","description":"Daftar tugas untuk hari ini saja: tulis jam dan prioritas langsung saat mengetik, tugas yang belum selesai terbawa ke besok, dan rekap tujuh hari.","url":"https://todo-classic.vercel.app","applicationCategory":"ProductivityApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"IDR"}};

export const metadata = {
  metadataBase: new URL("https://todo-classic.vercel.app"),
  title: { default: "Hari Ini — Satu daftar untuk satu hari", template: "%s — Hari Ini" },
  description: "Daftar tugas untuk hari ini saja: tulis jam dan prioritas langsung saat mengetik, tugas yang belum selesai terbawa ke besok, dan rekap tujuh hari.",
  applicationName: "Hari Ini",
  keywords: ["to-do list", "aplikasi tugas", "produktivitas", "daftar tugas", "task app"],
  authors: [{ name: "Hari Ini" }],
  creator: "Hari Ini",
  publisher: "Hari Ini",
  alternates: { canonical: "https://todo-classic.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://todo-classic.vercel.app",
    siteName: "Hari Ini",
    title: "Hari Ini — Satu daftar untuk satu hari",
    description: "Daftar tugas untuk hari ini saja: tulis jam dan prioritas langsung saat mengetik, tugas yang belum selesai terbawa ke besok, dan rekap tujuh hari.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hari Ini — Satu daftar untuk satu hari" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Ini — Satu daftar untuk satu hari",
    description: "Daftar tugas untuk hari ini saja: tulis jam dan prioritas langsung saat mengetik, tugas yang belum selesai terbawa ke besok, dan rekap tujuh hari.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = { themeColor: "#4f46e5" };

// Set kelas .dark sebelum paint untuk mencegah flash (FOUC) tema.
const themeScript = `
(function(){try{var t=localStorage.getItem('hariini.tema');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
