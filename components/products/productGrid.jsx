'use client'

// React y Next.js
import { useState } from 'react'                           // Hook para estado local
import Link from 'next/link'                               // Componente de Next.js para navegación interna
import Image from 'next/image'                             // Optimiza imágenes con carga progresiva y dimensionado
import products from '@/components/products/ProductsList.json'      // Lista estática de juegos

// HeroUI (Heroui)
import { Card, CardFooter } from '@heroui/card'            // Componentes de tarjeta con footer difuminado
import { Button } from '@heroui/button'                    // Botón estilizado
import { Pagination } from '@heroui/pagination'            // Componente de paginación

// Iconos
import { IoCart } from "react-icons/io5"
// Contexto de carrito
import { useCart } from '@/components/shoppingCart/cartContext'  // Hook personalizado para gestionar el carrito

export const ProductGrid = ({ platform }) => {
    // 🔥 Hook de carrito: obtenemos la función para añadir productos
    const { addToCart } = useCart()

    // 1) Filtrado inicial: si llega `platform`, filtramos; si no, devolvemos todos.
    const filtered = platform
        ? products.filter(g => g.platforms.includes(platform))
        : products

    // 2) Paginación
    const itemsPerPage = 8                     // Cuántos juegos por página
    const [page, setPage] = useState(1)        // `page`: número de página actual (1-based)
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    // ‣ `totalPages`: redondeo hacia arriba del total de items / itemsPerPage
    const start = (page - 1) * itemsPerPage    // Índice inicial para slice
    // ‣ Si page=1, start=0; page=2, start=8; etc.
    const paged = filtered.slice(start, start + itemsPerPage)
    // ‣ `paged`: subset de `filtered` que se mostrará en esta página

    // 3) Color de fondo dinámico según plataforma (Tailwind)
    const bgColor = {
        Bateria: 'bg-red-300',
        Aceite: 'bg-green-300',
        Llanta: 'bg-orange-300'
    }[platform] || 'bg-black'

    return (
        <>
            {/* GRID RESPONSIVO con Tailwind */}
            <section
                className="
          max-w-7xl         /* máximo ancho */
          mx-auto           /* margin-left/right: auto (centrado) */
          px-4 py-12        /* padding-x: 1rem, padding-y: 3rem */
          grid              /* display: grid */
          grid-cols-1       /* 1 columna en móvil */
          sm:grid-cols-2    /* 2 columnas en ≥640px */
          lg:grid-cols-4    /* 4 columnas en ≥1024px */
          gap-6             /* espacio entre celdas: 1.5rem */
        "
            >

                {paged.map(product => {
                    // Cálculo de precio con descuento
                    const discounted = product.discount > 0
                        ? (product.price * (100 - product.discount) / 100).toFixed(2)
                        : product.price.toFixed(2)

                    return (
                        <Card
                            key={product.id}
                            isFooterBlurred     /* aplica blur al fondo del footer */
                            radius="lg"         /* esquinas redondeadas grandes */
                            className={`
                ${bgColor}        /* color de fondo dinámico */
                border-none       /* sin borde */
              `}
                        >
                            {/* Imagen optimizada con Next/Image */}
                            <Image
                                src={product.image}
                                alt={product.name}     /* aria-label alternativa */
                                width={300}
                                height={200}
                                className="object-cover"
                            /* object-cover: escala la imagen para cubrir todo el contenedor,
                               preservando proporción y recortando si es necesario */
                            />

                            {/* Contenido principal */}
                            <div className="p-4">
                                {/* p-4: padding de 1rem en todos los lados */}
                                <h2 className="text-lg text-black-600 font-semibold">
                                    {product.name}
                                </h2>
                                <p className="mt-1 text-sm text-black-600 line-clamp-2">
                                    {/* mt-1: margin-top de 0.25rem */}
                                    {/* text-gray-600: color gris */}
                                    {/* line-clamp-2: recorta a 2 líneas */}
                                    {product.description}
                                </p>
                            </div>

                            {/* Footer de la tarjeta */}
                            <CardFooter
                                className="
                  flex flex-col sm:flex-row
                  justify-between items-center
                  p-4
                  border-t border-default-200
                  space-y-2 sm:space-y-0 sm:space-x-4
                "
                            >
                                {/* flex: contenedor flexible */}
                                {/* flex-col: eje principal vertical */}
                                {/* sm:flex-row: en pantallas ≥640px, eje horizontal */}
                                {/* justify-between: espacio máximo entre hijos */}
                                {/* items-center: alinear elementos en el centro del eje transversal */}
                                {/* space-y-2: separa hijos verticalmente 0.5rem */}
                                {/* sm:space-x-4: en horizontal separa 1rem */}

                                {/* Precio */}
                                <div className="flex items-baseline space-x-2">
                                    {/* items-baseline: alinea texto por línea base */}
                                    {product.discount > 0 && (
                                        <span className="text-sm line-through text-gray-500">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="font-bold text-lg">
                                        ${discounted}
                                    </span>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex items-center space-x-2">
                                    {/* Botón "Ver detalles" */}
                                    <Button
                                        as={Link}
                                        href={`/products/${product.id}`}
                                        size="sm"
                                        radius="full"
                                    >
                                        Ver detalles
                                    </Button>

                                    {/* Botón icono "Añadir al carrito" */}
                                    <Button
                                        size="sm"
                                        radius="full"
                                        isIconOnly                    /* solo icono, sin texto */
                                        /*variant="light"*/
                                        aria-label="Añadir al carrito"/* accesibilidad: descripción de icono */
                                        onPress={() =>                   /* onPress: evento de producto al carrito */
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

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 mb-16">
                    {/* flex + justify-center centran el contenido */}
                    {/* mt-6: margin-top 1.5rem; mb-16: margin-bottom 4rem */}
                    <Pagination
                        showControls     /* añade flechas “‹” y “›” */
                        page={page}      /* página actual (estado) */
                        total={totalPages}  /* total de páginas calculado */
                        onChange={setPage}  /* actualiza `page` al cambiar */
                    />
                </div>
            )}
        </>
    )
}
