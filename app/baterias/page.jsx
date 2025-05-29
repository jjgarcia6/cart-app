import { ProductGrid } from "@/components/products/productGrid";

export default function Bateria() {
    return (
        <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Baterìas para Vehìculos</h1>
            <ProductGrid platform="BATERIA" />
        </div>
    );
}
