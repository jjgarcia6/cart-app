'use client'
import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

    const [items, setItems] = useState([])

    const addToCart = product => {
        setItems(prev => {
            const exists = prev.find(p => p.id === product.id)
            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = id => {
        setItems(prev => prev.filter(p => p.id !== id))
    }

    const clearCart = () => setItems([])

    const itemCount = items.reduce((sum, p) => sum + p.quantity, 0)

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, clearCart, itemCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
