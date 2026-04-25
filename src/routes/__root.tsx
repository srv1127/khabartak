import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-7xl font-black text-brand">404</h1>
        <h2 className="mt-4 text-xl font-bold">पेज नहीं मिला</h2>
        <p className="mt-2 text-sm text-muted-foreground">यह पेज मौजूद नहीं है।</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground"
        >
          होम पर जाएं
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "खबरतक — हिंदी न्यूज़, ट्रेंडिंग और ब्लॉग" },
      {
        name: "description",
        content: "हिंदी में ताज़ा खबरें, राजनीति, खेल, बिज़नेस और मनोरंजन। YouTube वीडियो को हिंदी आर्टिकल में बदलें।",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
