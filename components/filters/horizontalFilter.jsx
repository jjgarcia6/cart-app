'use client'

import React, { useState } from 'react'
import { Card } from '@heroui/card'
import { Input } from '@heroui/input'
import { FaSearch } from 'react-icons/fa'

export default function HorizontalFilter({ productsShows, onSearch }) {
    const [term, setTerm] = useState('')

    const handle = e => {
        const value = e.target.value
        setTerm(value)
        onSearch(value)
    }

    return (
        <Card className="w-full px-4 mb-4">
            <div className="flex items-center justify-between py-3">

                <p className="text-sm">Productos mostrados:{' '}
                    <span className="font-bold">{productsShows}</span>
                </p>

                <div className="relative w-64 ">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2                 
                            text-gray-400" aria-hidden="true" />
                    <Input
                        className="pl-10 w-full"
                        placeholder="Buscar por nombre..."
                        size="sm"
                        spellCheck='false'
                        value={term}
                        onChange={handle}
                        aria-label="Buscar productos por nombre" />
                </div>
            </div>
        </Card>
    )
}
