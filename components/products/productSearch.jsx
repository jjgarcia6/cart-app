'use client'

import { useState, useMemo } from 'react'
import products from './ProductsList.json'
import VerticalFilter from '../filters/verticalFilter'
import HorizontalFilter from '../filters/horizontalFilter'
import CardProduct from './productCard'

/**
 * ProductSearch
 *
 * Componente principal encargado de:
 *  1) Recibir los filtros desde HorizontalFilter y VerticalFilter a través de props.
 *  2) Mantener esos filtros en estado local (useState).
 *  3) Filtrar la lista completa de juegos (`products`) cada vez que cambian los filtros.
 *  4) Renderizar:
 *     - Un sidebar de filtros verticales (géneros, plataformas, precio, fecha, descuento).
 *     - Una barra de búsqueda horizontal (por nombre) con contador de resultados.
 *     - Un grid responsivo de tarjetas (CardProduct) con los juegos filtrados.
 *
 * Flujo de datos (props ↔ estado ↔ render):
 *  1) HorizontalFilter y VerticalFilter reciben props:
 *       - Valores actuales de los filtros (p.ej. `searchTerm`, `genres`, etc.).
 *       - Callbacks (p.ej. `onSearch`, `onGenresChange`, etc.) para notificar cambios.
 *  2) Cuando el usuario interactúa:
 *     - En HorizontalFilter: escribe un texto → `handle(e)` → `onSearch(term)` → invoca `setSearchTerm(term)` en ProductSearch.
 *     - En VerticalFilter: ajusta un control (slider, checkbox, fecha…) → llama al callback correspondiente (p.ej. `onPriceRangeChange([min,max])`) → actualiza el estado local en ProductSearch.
 *  3) Cada vez que cualquiera de estos estados cambia, `useMemo` (ver más abajo) detecta la dependencia y:
 *     - Recalcula `filteredProducts = products.filter(...)` usando todos los filtros actuales.
 *  4) React vuelve a renderizar:
 *     - HorizontalFilter recibe `productsShows={filteredProducts.length}` y muestra el nuevo contador.
 *     - El grid de `CardProduct` se mapea sobre `filteredProducts` mostrando solo los juegos que cumplen todos los criterios.
 */

/**
 * 💡 Teoría de useMemo (importado al inicio):
 *
 * - `useMemo` es un Hook de React que memoiza (guarda en caché) el resultado de una función "pesada"
 *   y sólo la vuelve a ejecutar si cambian las **dependencias** que le pasamos.
 *
 * - Sintaxis: 
 *     const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
 *
 *   Aquí, `computeExpensiveValue(a, b)` sólo se recalculará si cambian `a` o `b`.
 *
 * - Beneficios:
 *   • Evita recálculos innecesarios en cada render.
 *   • Mejora el rendimiento cuando la función de filtrado (o cálculo) es costosa.
 *
 * - En nuestro caso:
 *   • Recalcula la lista filtrada `filteredProducts` sólo si cambian:
 *     `searchTerm`, `genres`, `platforms`, `priceRange`, `dateRange`, o `discountOnly`.
 *   • Si el usuario modifica un filtro, useMemo dispara el filtrado de nuevo.
 *   • Si ningún filtro cambia, React reutiliza el array memorizado sin volver a filtrar.
 */
export default function ProductSearch() {
    // --------------------------------------------------------------------------
    // 1) Estados locales (useState) para cada filtro
    // --------------------------------------------------------------------------
    const [searchTerm, setSearchTerm] = useState('')       // Texto buscado en la barra
    const [genres, setGenres] = useState([])       // Array de géneros seleccionados
    const [platforms, setPlatforms] = useState([])       // Array de plataformas seleccionadas
    const [priceRange, setPriceRange] = useState([0, 100]) // Slider de precio [min, max]
    const [dateRange, setDateRange] = useState(['', '']) // Inputs de fecha ['desde', 'hasta']
    const [discountOnly, setDiscountOnly] = useState(false)    // Checkbox: solo con descuento

    // --------------------------------------------------------------------------
    // 2) Filtrado de juegos con useMemo para evitar recomputar en cada render
    //    Sólo se recalcula cuando cambian cualquiera de los filtros listados.
    // --------------------------------------------------------------------------
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 2.1) Nombre: incluye textualmente (insensible a mayúsculas)
            if (!product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

            // 2.2) Géneros: si hay géneros seleccionados, el juego debe contenerlos todos
            if (genres.length && !genres.every(g => product.genres.includes(g))) return false

            // 2.3) Plataformas: idéntica lógica que géneros
            if (platforms.length && !platforms.every(p => product.platforms.includes(p))) return false

            // 2.4) Precio: debe estar entre priceRange[0] y priceRange[1]
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false

            // 2.5) Fecha de lanzamiento:
            //      Convertimos la fecha de la forma "dd/mm/yyyy" a ISO "yyyy-mm-dd"
            const pubIso = product.release_date.split('/').reverse().join('-')
            if (dateRange[0] && new Date(pubIso) < new Date(dateRange[0])) return false
            if (dateRange[1] && new Date(pubIso) > new Date(dateRange[1])) return false

            // 2.6) Descuento: si está marcado, solo juegos con discount > 0
            if (discountOnly && product.discount === 0) return false

            // Si pasa todos los filtros, lo incluimos:
            return true
        })
    }, [
        searchTerm,    // recalcula si cambia el texto de búsqueda
        genres,        // recalcula si cambian los géneros seleccionados
        platforms,     // recalcula si cambian las plataformas
        priceRange,    // recalcula si cambian los precios
        dateRange,     // recalcula si cambian las fechas
        discountOnly   // recalcula si cambia el checkbox de descuento
    ])

    return (
        <section className="px-4 pb-12">
            {/* ----------------------------------------
            - text-2xl: font-size 1.5rem
            - font-bold: font-weight 700
            - text-center: text-align center
            - mb-8: margin-bottom 2rem
        ---------------------------------------- */}
            <h2 className="text-2xl font-bold text-center mb-8">
                Buscador de Productos
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ----------------------------------------
            SIDEBAR VERTICAL DE FILTROS
            - Ocupa toda la anchura en móvil, 1/4 en desktop (lg:w-1/4)
        ---------------------------------------- */}
                <div className="lg:w-1/4">
                    <VerticalFilter
                        // Enviamos los valores actuales:
                        selectedGenres={genres}
                        selectedPlatforms={platforms}
                        priceRange={priceRange}
                        dateRange={dateRange}
                        discountOnly={discountOnly}

                        // Enviamos los "setters" para que el hijo notifique cambios:
                        onGenresChange={setGenres}
                        onPlatformsChange={setPlatforms}
                        onPriceRangeChange={setPriceRange}
                        onDateRangeChange={setDateRange}
                        onDiscountOnlyChange={setDiscountOnly}
                    />
                </div>

                {/* ----------------------------------------
            ÁREA DE RESULTADOS
            - Barra horizontal de búsqueda + grid de tarjetas
        ---------------------------------------- */}
                <div className="flex-1">
                    {/* Barra de búsqueda */}
                    <HorizontalFilter
                        productsShows={filteredProducts?.length || 0}
                        //productsShows={filteredProducts.length}
                        onSearch={setSearchTerm}
                    />

                    {/* Grid responsivo:
               grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-4 */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
