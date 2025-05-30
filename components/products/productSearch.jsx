'use client'

import { useState, useMemo } from 'react'
import products from './ProductsList.json'
import VerticalFilter from '../filters/verticalFilter'
import HorizontalFilter from '../filters/horizontalFilter'
import CardProduct from './productCard'

export default function ProductSearch() {

    const [searchTerm, setSearchTerm] = useState('')
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [priceRange, setPriceRange] = useState([0, 100])
    const [dateRange, setDateRange] = useState(['', ''])
    const [discountOnly, setDiscountOnly] = useState(false)

    const filteredProducts = useMemo(() => {
        return products.filter(product => {

            if (!product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
            if (genres.length && !genres.every(g => product.genres.includes(g))) return false
            if (platforms.length && !platforms.every(p => product.platforms.includes(p))) return false
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false

            const pubIso = product.release_date.split('/').reverse().join('-')
            if (dateRange[0] && new Date(pubIso) < new Date(dateRange[0])) return false
            if (dateRange[1] && new Date(pubIso) > new Date(dateRange[1])) return false

            if (discountOnly && product.discount === 0) return false

            return true
        })
    }, [
        searchTerm,
        genres,
        platforms,
        priceRange,
        dateRange,
        discountOnly
    ])

    return (
        <section className="px-4 pb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
                Buscador de Productos</h2>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4">
                    <VerticalFilter
                        selectedGenres={genres}
                        selectedPlatforms={platforms}
                        priceRange={priceRange}
                        dateRange={dateRange}
                        discountOnly={discountOnly}

                        onGenresChange={setGenres}
                        onPlatformsChange={setPlatforms}
                        onPriceRangeChange={setPriceRange}
                        onDateRangeChange={setDateRange}
                        onDiscountOnlyChange={setDiscountOnly} />
                </div>

                <div className="flex-1">
                    <HorizontalFilter
                        productsShows={filteredProducts?.length || 0}
                        onSearch={setSearchTerm} />

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
