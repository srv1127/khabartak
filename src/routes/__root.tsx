import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/hooks/useAuth";

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
      { title: "अख़बार — आज का अख़बार, हिंदी दैनिक" },
      {
        name: "description",
        content: "अख़बार — हिंदी में ताज़ा खबरें, मौसम, स्वास्थ्य, शिक्षा, AI ज्ञान और प्रेरक कहानियाँ। स्व. श्री हिम्मत राम विश्वकर्मा जी की स्मृति में समर्पित।",
      },
      { property: "og:title", content: "अख़बार — आज का अख़बार" },
      { name: "twitter:title", content: "अख़बार — आज का अख़बार" },
      { property: "og:description", content: "हिंदी दैनिक अख़बार — सच्ची खबर, साफ़ शब्दों में।" },
      { name: "twitter:description", content: "हिंदी दैनिक अख़बार — सच्ची खबर, साफ़ शब्दों में।" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f2e998bf-0488-442e-a2db-7882f95c83b4/id-preview-da0934c5--68231b29-541c-4ffd-aa7d-33ab0f770ad8.lovable.app-1777141693386.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f2e998bf-0488-442e-a2db-7882f95c83b4/id-preview-da0934c5--68231b29-541c-4ffd-aa7d-33ab0f770ad8.lovable.app-1777141693386.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap",
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
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
