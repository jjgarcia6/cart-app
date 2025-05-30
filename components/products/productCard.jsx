'use client'

import { Card, CardHeader, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function CardProduct({ product }) {

    const discounted = product.discount > 0
        ? (product.price * (100 - product.discount) / 100).toFixed(2)
        : product.price.toFixed(2)

    return (
        <Card isFooterBlurred
            className=" relative overflow-hidden h-[300px] ">

            <div className="absolute inset-0 bg-gradient-to-b 
                from-black/70 to-transparent z-10"/>

            <CardHeader className="absolute top-0 left-0 w-full px-3 
                py-2 z-20 flex items-center justify-between">

                {product.discount > 0 && (
                    <span className="bg-red-600  text-white  text-xs   
                        uppercase font-bold  px-1 py-0.5  rounded">
                        {product.discount}% OFF</span>
                )}
                <h4 className="text-white text-lg font-semibold">
                    {product.name}</h4>
            </CardHeader>
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover scale-125 -translate-y-6" />

            <CardFooter className="absolute bottom-0 w-full bg-white/30 border-t        
                 border-default-200 z-20 flex justify-between items-center px-4 py-2">

                <div>
                    <p className="text-xs text-black">Publicado: {product.release_date}</p>
                    <p className="text-xs text-black">Marca: {product.developer} </p>
                </div>
                <Button
                    as={Link}
                    href={`/products/${product.id}`}
                    size="sm"
                    radius="full"
                    className="text-xs"
                    aria-label={`Ver detalles de ${product.name}`}>
                    Ver detalles
                </Button>
            </CardFooter>
        </Card>
    )
}

