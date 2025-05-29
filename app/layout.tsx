import SessionProviderWrapper from "./SessionProviderWrapper";
import "@/styles/globals.css"; // Estilos globales (Tailwind, resets, etc.)
import { Metadata, Viewport } from "next"; // Tipos para metadata y viewport de Next.js
import clsx from "clsx"; // Helper para combinar clases condicionales
import { siteConfig } from "@/config/site"; // Configuración del sitio (nombre, descripción, navItems…)
import { fontSans } from "@/config/fonts"; // Configuración de fuentes con Tailwind CSS variable
import { Navbar } from "@/components/navbar"; // Barra de navegación superior
import { Footer } from "@/components/ui/footer"; // Pie de página
import { Providers } from "./providers"; // Context providers (tema, estado global, etc.)


// Definimos la metadata de la aplicación:
// - title.default: título por defecto
// - title.template: cómo se concatena el título de cada página
// - description: descripción SEO general
// - icons: favicon
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// Control del theme-color en la etiqueta <meta name="theme-color"> según preferencia dark/light
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// RootLayout: componente que envuelve *toda* la aplicación.
// Se usa en Next.js dentro de app/, engloba <html>, <body> y zonas globales.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      {/* El body aplica varias clases globales:
          - min-h-screen: al menos altura de la ventana
          - bg-background: color de fondo (configurado en tailwind.config)
          - font-sans: familia principal
          - antialiased: suavizado de fuentes
          - fontSans.variable: inyecta la variable CSS para la fuente importada */}
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Providers: envoltorio de ContextProviders (tema, store Redux, etc.) */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SessionProviderWrapper>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              {/*<main>{children}</main>*/}
              {children}
              <Footer />
            </div>
          </SessionProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
