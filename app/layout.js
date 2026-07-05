import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Hari Ini — Daftar Tugas",
  description: "To-do list minimal & fokus: progress harian, floating quick-add, dark mode premium.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
