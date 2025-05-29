import { IoCart } from "react-icons/io5";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ABC Motor ABCM",
  description: "Tu tienda en linea con productos al mejor precio",
  navItems: [
    { label: "Llantas", href: "/llantas" },
    { label: "Baterias", href: "/baterias" },
    { label: "Aceites", href: "/aceites" },
  ],
  navMenuItems: [
    // aquí puedes mantener perfil, dashboard, etc. o adaptarlos
    { label: "Perfil", href: "/profile" },
    { label: "Pedidos", href: "/orders" },
    { label: "Ajustes", href: "/settings" },
    { label: "Cerrar sesión", href: "/logout" },
  ],
  links: {
    github: "https://github.com/tu-org/tu-repo",
    docs: "/docs",
    cart: "/cart",
  },
  // opcionalmente, puedes exponer un icono de carrito en el navbar
  icons: {
    cart: IoCart,
  },
};
