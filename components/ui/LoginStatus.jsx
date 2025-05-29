"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginStatus() {
    const { data: session, status } = useSession();

    if (status === "loading") return <span>Cargando...</span>;

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">Hola, {session.user?.name}</span>
                <button
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs"
                    onClick={() => signOut()}
                >
                    Cerrar sesión
                </button>
            </div>
        );
    }
    return (
        <button
            className="px-2 py-1 rounded bg-blue-600 text-white text-xs"
            onClick={() => signIn("google")}
        >
            Iniciar sesión con Google
        </button>
    );
}