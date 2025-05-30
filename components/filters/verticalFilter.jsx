'use client'

import React from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'
import { Radio, RadioGroup } from '@heroui/radio'
import { Slider } from '@heroui/slider'

export default function VerticalFilter({
    selectedGenres,
    onGenresChange,
    selectedPlatforms,
    onPlatformsChange,
    priceRange,
    onPriceRangeChange,
    dateRange,
    onDateRangeChange,
    discountOnly,
    onDiscountOnlyChange
}) {
    const allGenres = ['PLT', 'CVT', 'BATERIAS PESADOS', 'BATERIAS LIVIANOS', 'ACEITE']
    const allPlatforms = ['LLANTA', 'BATERIA', 'ACEITE']

    return (
        <Card className="p-0 w-full h-full">
            <CardHeader className="px-4 pt-4 pb-2 text-xl font-semibold">
                Filtrar por
            </CardHeader>
            <hr className="border-default-200 mx-4 mb-4" />
            <CardBody className="space-y-6 px-4">
                <div>
                    <h3 className="mb-2 font-semibold">
                        Precio
                    </h3>
                    <Slider
                        min={0}
                        max={200}
                        step={1}
                        value={priceRange}
                        onChange={vals => onPriceRangeChange(vals)}
                    />

                    <div className="flex gap-2 mt-2">
                        <Input
                            label="Mín"
                            type="number"
                            size="sm"
                            value={priceRange[0]}
                            onChange={e => onPriceRangeChange([+e.target.value, priceRange[1]])}
                        />
                        <Input
                            label="Máx"
                            type="number"
                            size="sm"
                            value={priceRange[1]}
                            onChange={e => onPriceRangeChange([priceRange[0], +e.target.value])}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 font-semibold">
                        Fecha publicación
                    </h3>
                    <Input
                        label="Desde"
                        type="date"
                        size="sm"
                        value={dateRange[0]}
                        onChange={e => onDateRangeChange([e.target.value, dateRange[1]])}
                        className="mb-2"
                    />
                    <Input
                        label="Hasta"
                        type="date"
                        size="sm"
                        value={dateRange[1]}
                        onChange={e => onDateRangeChange([dateRange[0], e.target.value])}
                    />
                </div>

                <div>
                    <h3 className="mb-2 font-semibold">
                        Categoria
                    </h3>
                    <div className="flex flex-wrap gap-2">

                        {allGenres.map(genre => (
                            <Checkbox
                                key={genre}
                                isSelected={selectedGenres.includes(genre)}
                                onValueChange={() => {

                                    const next = selectedGenres.includes(genre)
                                        ? selectedGenres.filter(g => g !== genre)
                                        : [...selectedGenres, genre]
                                    onGenresChange(next)
                                }}
                                aria-label={`Filtrar por categoria ${genre}`}
                            >
                                {genre}
                            </Checkbox>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 font-semibold">
                        Linea
                    </h3>
                    <RadioGroup
                        value={selectedPlatforms.join(',')}
                        onValueChange={val => {
                            const arr = val ? val.split(',') : []
                            onPlatformsChange(arr)
                        }}
                        orientation="vertical">

                        {allPlatforms.map(p => (
                            <Radio key={p} value={p} aria-label={`Filtrar linea ${p}`}>{p} </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div>
                    <Checkbox
                        isSelected={discountOnly}
                        onValueChange={onDiscountOnlyChange}
                        aria-label="Mostrar solo productos con descuento"
                    >
                        Solo con descuento
                    </Checkbox>
                </div>
            </CardBody>
        </Card>
    )
}
