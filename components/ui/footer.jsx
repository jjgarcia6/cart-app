
import NextLink from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => (
    <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">

            <div>
                <h4 className="text-white font-semibold mb-4">Acerca de</h4>
                <ul className="space-y-2 text-sm">
                    <li><NextLink href="/about">Quiénes somos</NextLink></li>
                    <li><NextLink href="/contact">Contacto</NextLink></li>
                    <li><NextLink href="/jobs">Trabaja con nosotros</NextLink></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Plataformas</h4>
                <ul className="space-y-2 text-sm">
                    <li><NextLink href="/platform/llanta">Llantas</NextLink></li>
                    <li><NextLink href="/platform/bateria">Baterias</NextLink></li>
                    <li><NextLink href="/platform/aceite">Aceites</NextLink></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Ayuda</h4>
                <ul className="space-y-2 text-sm">
                    <li><NextLink href="/faq">Preguntas frecuentes</NextLink></li>
                    <li><NextLink href="/support">Soporte</NextLink></li>
                    <li><NextLink href="/terms">Términos y condiciones</NextLink></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Síguenos</h4>
                <div className="flex space-x-4 text-xl">
                    <a href="https://facebook.com" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 ABC Motor ABCM Store. Todos los derechos reservados.
        </div>
    </footer>
);
