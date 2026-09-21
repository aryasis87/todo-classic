export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://todo-classic.vercel.app/sitemap.xml",
    host: "https://todo-classic.vercel.app",
  };
}
