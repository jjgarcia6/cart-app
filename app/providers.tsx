// app/providers.tsx
"use client"; // Necesario en Next 13+ para indicar que este componente usa estado o efectos de React

import type { ThemeProviderProps } from "next-themes"; // Tipos para la configuración del proveedor de temas

import * as React from "react"; // React base
import { HeroUIProvider } from "@heroui/system"; // Proveedor de HeroUI (navegación, theming interno)
import { useRouter } from "next/navigation"; // Hook de Next para navegación en el cliente
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Proveedor de theming (dark/light) externo

import { CartProvider } from "@/components/shoppingCart/cartContext"; // Proveedor de estado de carrito

// Props que acepta este Providers wrapper:
// - children: los componentes “hijo” que envolverá
// - themeProps: configuración opcional para next-themes (attribute, defaultTheme…)
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// *** Workaround de tipado ***
// Ajusta los tipos internos de navegación para HeroUIProvider
// HeroUIProvider espera un `navigate` que acepte una configuración de Next router
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

// Componente que engloba a toda la aplicación, proveyendo:
// 1. HeroUIProvider: propaga internamente la función de navegación para componentes UI
// 2. NextThemesProvider: maneja dark/light mode y persiste en localStorage
// 3. CartProvider: estado global del carrito (agregar, eliminar, vaciar, total…)
export function Providers({ children, themeProps }: ProvidersProps) {
  // Hook de Next.js para obtener la función `push` y navegar programáticamente
  const router = useRouter();

  return (
    // HeroUIProvider se encarga de inyectar la función `navigate` en toda la librería HeroUI
    <HeroUIProvider navigate={router.push}>
      {/* NextThemesProvider controla el tema claro/oscuro de la UI */}
      <NextThemesProvider {...themeProps}>
        {/* CartProvider ofrece contexto React para gestionar el carrito de compras */}
        <CartProvider>{children}</CartProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

