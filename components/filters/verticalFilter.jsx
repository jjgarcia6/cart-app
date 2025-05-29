// components/filters/VerticalFilter.jsx

'use client'

import React from 'react'
// HeroUI Card: contenedor con header y body
import { Card, CardHeader, CardBody } from '@heroui/card'
// HeroUI Input, Checkbox, Radio, Slider: componentes de formulario estilizados
import { Input } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'
import { Radio, RadioGroup } from '@heroui/radio'
import { Slider } from '@heroui/slider'

/**
 * VerticalFilter
 *
 * Panel de filtros vertical para la búsqueda de juegos.
 * Recibe los estados y setters del componente padre (ProductSearch),
 * y al modificarlos actualiza la lista filtrada en ProductSearch:
 * - selectedGenres / onGenresChange
 * - selectedPlatforms / onPlatformsChange
 * - priceRange / onPriceRangeChange
 * - dateRange / onDateRangeChange
 * - discountOnly / onDiscountOnlyChange
 *
 * La estructura:
 *  <Card>
 *    <CardHeader> Título
 *    <CardBody>
 *      Sección Precio (Slider + Inputs)
 *      Sección Fecha (Inputs date)
 *      Sección Géneros (Checkboxes)
 *      Sección Plataformas (RadioGroup)
 *      Checkbox “Solo con descuento”
 *    </CardBody>
 *  </Card>
 */
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
    // Listas estáticas de opciones
    const allGenres = ['PLT', 'CVT', 'BATERIAS PESADOS', 'BATERIAS LIVIANOS', 'ACEITE']
    const allPlatforms = ['LLANTA', 'BATERIA', 'ACEITE']

    return (
        <Card className="
      p-0           /* elimina padding interno por defecto */
      w-full        /* ancho completo de su contenedor padre */
      h-full        /* altura completa disponible */
    ">
            {/** Encabezado con título **/}
            <CardHeader className="
        px-4         /* padding horizontal: 1rem */
        pt-4 pb-2    /* padding top:1rem, bottom:0.5rem */
        text-xl      /* tamaño de texto extra grande */
        font-semibold /* peso de fuente seminegrita */
      ">
                Filtrar por
            </CardHeader>

            {/** Línea divisoria **/}
            <hr className="
        border-default-200 /* color de borde por defecto */
        mx-4               /* margin horizontal:1rem */
        mb-4               /* margin bottom:1rem */
      " />

            <CardBody className="space-y-6 px-4">
                {/** ———————————————————————————————
            1) Rango de precio
            ——————————————————————————————— */}
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
                    {/** Inputs numéricos para ajustar manualmente los extremos */}
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

                {/** ———————————————————————————————
            2) Fecha de publicación
            ——————————————————————————————— */}
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

                {/** ———————————————————————————————
            3) Géneros (múltiple) con Checkboxes
            ——————————————————————————————— */}
                <div>
                    <h3 className="mb-2 font-semibold">
                        Categoria
                    </h3>
                    <div className="
            flex flex-wrap  /* display:flex, permite múltiples filas */
            gap-2           /* espacio de 0.5rem entre items */
          ">
                        {allGenres.map(genre => (
                            <Checkbox
                                key={genre}
                                isSelected={selectedGenres.includes(genre)}
                                onValueChange={() => {
                                    // si ya estaba, lo quitamos; si no, lo añadimos
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

                {/** ———————————————————————————————
            4) Plataformas (única) con RadioGroup
            ——————————————————————————————— */}
                <div>
                    <h3 className="mb-2 font-semibold">
                        Linea
                    </h3>
                    <RadioGroup
                        value={selectedPlatforms.join(',')}  /* un solo valor: ej "Llanta" o "" */
                        onValueChange={val => {
                            // convertimos string a array: ["Aceite"] o []
                            const arr = val ? val.split(',') : []
                            onPlatformsChange(arr)
                        }}
                        orientation="vertical" /* radios apilados verticalmente */
                    >
                        {allPlatforms.map(p => (
                            <Radio key={p} value={p} aria-label={`Filtrar linea ${p}`}>
                                {p}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                {/** ———————————————————————————————
            5) Solo con descuento
            ——————————————————————————————— */}
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
