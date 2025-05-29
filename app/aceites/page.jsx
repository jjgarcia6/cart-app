import { ProductGrid } from "@/components/products/productGrid";

export default function Aceite() {
    return (
        <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4 text-center">Aceites para Vehìculos</h1>
            <ProductGrid platform="ACEITE" />
        </div>
    );
}
