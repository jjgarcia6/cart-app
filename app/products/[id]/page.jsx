'use client'
import products from '@/components/products/ProductsList.json'
import Image from 'next/image'
import { Button } from '@heroui/button'
import { useCart } from '../../../components/shoppingCart/cartContext'
import React from 'react'

export default function ProductPage({ params }) {
    //const { id } = params
    const unwrappedParams = React.use(params)
    const { id } = unwrappedParams

    const product = products.find(g => g.id === parseInt(id, 10))

    const { addToCart } = useCart()

    if (!product) {
        return <p className="text-center p-8">Producto no encontrado.</p>
    }

    const original = product.price
    const discounted = product.discount > 0
        ? (original * (100 - product.discount) / 100).toFixed(2)
        : original.toFixed(2)

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-4xl font-bold text-center">{product.name}</h1>
            <div className="relative w-full h-[400px]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                    priority
                />
            </div>

            <div className="flex items-baseline justify-center space-x-4">
                {product.discount > 0 && (
                    <span className="text-lg line-through text-gray-500">
                        ${original.toFixed(2)}
                    </span>
                )}
                <span className="text-3xl font-extrabold text-green-600">
                    ${discounted}
                </span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <li><strong>Stock:</strong> {product.stock}</li>
                <li><strong>Desarrollador:</strong> {product.developer}</li>
                <li><strong>Publicador:</strong> {product.publisher}</li>
                <li><strong>Fecha de lanzamiento:</strong> {product.release_date}</li>
                <li><strong>Plataformas:</strong> {product.platforms}</li>
                <li><strong>Géneros:</strong> {product.genres}</li>
            </ul>

            <div className="text-center">
                <Button
                    size="lg"
                    radius="full"
                    onPress={() =>
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: parseFloat(discounted),
                        })
                    }
                >
                    Añadir al carrito
                </Button>
            </div>
        </main>
    )
}