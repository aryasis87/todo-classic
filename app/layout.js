import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"WebApplication","name":"Hari Ini","description":"To-do list minimal & fokus","url":"https://classic-todo.pintuweb.com","applicationCategory":"ProductivityApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"IDR"}};

export const metadata = {
  metadataBase: new URL("https://classic-todo.pintuweb.com"),
  title: "Hari Ini — Daftar Tugas Minimal & Fokus",
  description: "Aplikasi to-do list minimal & fokus: progress harian, quick-add mengambang, dan dark mode premium.",
  applicationName: "Hari Ini",
  keywords: ["to-do list", "aplikasi tugas", "produktivitas", "daftar tugas", "task app"],
  authors: [{ name: "Hari Ini" }],
  creator: "Hari Ini",
  publisher: "Hari Ini",
  alternates: { canonical: "https://classic-todo.pintuweb.com" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://classic-todo.pintuweb.com",
    siteName: "Hari Ini",
    title: "Hari Ini — Daftar Tugas Minimal & Fokus",
    description: "Aplikasi to-do list minimal & fokus: progress harian, quick-add mengambang, dan dark mode premium.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hari Ini — Daftar Tugas Minimal & Fokus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hari Ini — Daftar Tugas Minimal & Fokus",
    description: "Aplikasi to-do list minimal & fokus: progress harian, quick-add mengambang, dan dark mode premium.",
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
(function(){try{var t=localStorage.getItem('taskflow.theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
