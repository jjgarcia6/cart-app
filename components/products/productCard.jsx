'use client'

import { Card, CardHeader, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import Image from 'next/image'
import Link from 'next/link'

/**
 * CardProduct
 *
 * Este componente renderiza una tarjeta de un solo juego, con:
 * 1) Un overlay degradado para mejorar la legibilidad del texto.
 * 2) Un header que muestra el nombre y el porcentaje de descuento.
 * 3) La imagen del juego optimizada con next/image.
 * 4) Un footer con detalles y botón de “Ver detalles”.
 *
 */
export default function CardProduct({ product }) {
    // Calculamos el precio con descuento si aplica
    const discounted = product.discount > 0
        ? (product.price * (100 - product.discount) / 100).toFixed(2)
        : product.price.toFixed(2)

    return (
        <Card
            isFooterBlurred    // HeroUI: aplica un desenfoque de fondo al footer
            className="
        relative           /* posición relativa para contener overlays y elementos posicionados */
        overflow-hidden    /* oculta cualquier parte de la imagen que desborde */
        h-[300px]          /* altura fija de 300px */
      "
        >
            {/** 1) Overlay degradado oscuro **/}
            <div
                className="
          absolute inset-0         /* posición absoluta ocupando todo el contenedor */
          bg-gradient-to-b         /* fondo en degradado de arriba hacia abajo */
          from-black/70 to-transparent /* de negro semitransparente a transparente */
          z-10                     /* z-index para situarlo delante de la imagen */
        "
            />

            {/** 2) Header sobre el overlay **/}
            <CardHeader
                className="
          absolute top-0 left-0      /* en la esquina superior izquierda */
          w-full                     /* ocupa todo el ancho */
          px-3 py-2                  /* padding-x:0.75rem padding-y:0.5rem */
          z-20                       /* encima del overlay */
          flex items-center justify-between /* flexbox: eje horizontal, centra vertical, separa extremos */
        "
            >
                {product.discount > 0 && (
                    <span
                        className="
              bg-red-600           /* fondo rojo */
              text-white           /* texto blanco */
              text-xs               /* tamaño de texto 0.75rem */
              uppercase font-bold   /* mayúsculas y negrita */
              px-1 py-0.5           /* padding-x:0.25rem, padding-y:0.125rem */
              rounded               /* bordes redondeados pequeños */
            "
                    >
                        {product.discount}% OFF
                    </span>
                )}
                <h4 className="text-white text-lg font-semibold">
                    {product.name}
                </h4>
            </CardHeader>

            {/** 3) Imagen debajo **/}
            <Image
                src={product.image}
                alt={product.name}
                fill                   // Next/Image: ocupa todo el contenedor padre
                className="
          object-cover          /* escala y recorta para cubrir todo el contenedor */
          scale-125             /* escala al 125% */
          -translate-y-6        /* desplaza hacia arriba 1.5rem */
        "
            />

            {/** 4) Footer normal **/}
            <CardFooter
                className="
          absolute bottom-0 w-full /* posición absoluta abajo, ancho completo */
          bg-white/30              /* fondo blanco semitransparente */
          border-t border-default-200 /* borde superior */
          z-20                     /* encima de la imagen */
          flex justify-between items-center /* flex: separa elementos, centra vertical */
          px-4 py-2                /* padding-x:1rem, padding-y:0.5rem */
        "
            >
                <div>
                    <p className="text-xs text-black">
                        Publicado: {product.release_date}
                    </p>
                    <p className="text-xs text-black">
                        Dev: {product.developer}
                    </p>
                </div>
                <Button
                    as={Link}
                    href={`/products/${product.id}`}
                    size="sm"
                    radius="full"
                    className="text-xs"
                    aria-label={`Ver detalles de ${product.name}`}
                /* aria-label: describe el propósito del botón para lectores de pantalla */
                >
                    Ver detalles
                </Button>
            </CardFooter>
        </Card>
    )
}

