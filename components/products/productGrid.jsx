'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import products from '@/components/products/ProductsList.json'
import { Card, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Pagination } from '@heroui/pagination'
import { IoCart } from "react-icons/io5"
import { useCart } from '@/components/shoppingCart/cartContext'

export const ProductGrid = ({ platform }) => {
    const { addToCart } = useCart()

    const filtered = platform
        ? products.filter(g => g.platforms.includes(platform))
        : products

    const itemsPerPage = 8
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const start = (page - 1) * itemsPerPage
    const paged = filtered.slice(start, start + itemsPerPage)

    const bgColor = {
        Bateria: 'bg-red-300',
        Aceite: 'bg-green-300',
        Llanta: 'bg-orange-300'
    }[platform] || 'bg-black'

    return (
        <>
            <section className=" max-w-7xl mx-auto px-4 py-12 grid             
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {paged.map(product => {
                    const discounted = product.discount > 0
                        ? (product.price * (100 - product.discount) / 100).toFixed(2)
                        : product.price.toFixed(2)

                    return (
                        <Card
                            key={product.id}
                            isFooterBlurred
                            radius="lg"
                            className={`${bgColor} border-none`}>

                            <Image
                                src={product.image}
                                alt={product.name}
                                width={300}
                                height={200}
                                className="object-cover" />

                            <div className="p-4">
                                <h2 className="text-lg text-black-600 font-semibold">
                                    {product.name}</h2>
                                <p className="mt-1 text-sm text-black-600 line-clamp-2">
                                    {product.description}</p>
                            </div>

                            <CardFooter className="flex flex-col sm:flex-row justify-between items-center
                                p-4 border-t border-default-200 space-y-2 sm:space-y-0 sm:space-x-4">

                                <div className="flex items-baseline space-x-2">
                                    {product.discount > 0 && (
                                        <span className="text-sm line-through text-gray-500">
                                            ${product.price.toFixed(2)}</span>
                                    )}
                                    <span className="font-bold text-lg">
                                        ${discounted}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        as={Link}
                                        href={`/products/${product.id}`}
                                        size="sm"
                                        radius="full">
                                        Ver detalles
                                    </Button>

                                    <Button
                                        size="sm"
                                        radius="full"
                                        isIconOnly
                                        /*variant="light"*/
                                        aria-label="Añadir al carrito"
                                        onPress={() =>
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: parseFloat(discounted),
                                            })
                                        }
                                    >
                                        <IoCart size={20} />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </section>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 mb-16">
                    <Pagination
                        showControls
                        page={page}
                        total={totalPages}
                        onChange={setPage} />
                </div>
            )}
        </>
    )
}
