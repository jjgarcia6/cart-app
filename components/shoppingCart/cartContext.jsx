// components/cart/CartContext.jsx

'use client'
import React, { createContext, useContext, useState } from 'react'

/**
 * --------------------------------------------
 * 1) ¿Qué es createContext (Context API)?
 * --------------------------------------------
 * - Permite crear un "canal" de datos globales accesible en todo el árbol 
 *   de componentes sin necesidad de pasar props manualmente.
 * - createContext() devuelve un objeto con:
 *     • Provider: componente que “provee” los datos.
 *     • Consumer: (no usado aquí) componente para consumirlos.
 */
const CartContext = createContext()

/**
 * --------------------------------------------
 * 2) ¿Qué es useState?
 * --------------------------------------------
 * - Hook de React para añadir estado local a un componente funcional.
 * - Devuelve un par [valor, setter].
 * - Aquí lo usamos para mantener el arreglo de items en el carrito.
 */
export function CartProvider({ children }) {
    // items: [{ id, name, price, quantity }, ...]
    const [items, setItems] = useState([])

    /**
     * --------------------------------------------
     * 3) ¿Qué es un Provider?
     * --------------------------------------------
     * - Componente que envuelve partes de la app y proporciona datos
     *   a través del Context a todos sus hijos.
     * - Aquí, CartContext.Provider inyecta items y funciones del carrito.
     */

    /**
     * --------------------------------------------
     * 4) Funciones que modifican el estado (useState)
     * --------------------------------------------
     */

    // 4.1) addToCart: añade o incrementa cantidad
    const addToCart = product => {
        setItems(prev => {
            const exists = prev.find(p => p.id === product.id)
            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 } // 👉 spread operator para inmutabilidad
                        : p
                )
            }
            // Insertar nuevo producto con quantity = 1
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // 4.2) removeFromCart: elimina por id
    const removeFromCart = id => {
        setItems(prev => prev.filter(p => p.id !== id))
    }

    // 4.3) clearCart: vacía todo el carrito
    const clearCart = () => setItems([])

    /**
     * --------------------------------------------
     * 5) Cálculo derivado: itemCount
     * --------------------------------------------
     * - Usamos Array.reduce para sumar todas las quantities.
     */
    const itemCount = items.reduce((sum, p) => sum + p.quantity, 0)

    return (
        <CartContext.Provider
            // 6) El value será accesible desde cualquier hijo mediante useContext
            value={{ items, addToCart, removeFromCart, clearCart, itemCount }}
        >
            {children}
        </CartContext.Provider>
    )
}

/**
 * --------------------------------------------
 * 7) ¿Qué es useContext?
 * --------------------------------------------
 * - Hook que permite consumir datos de un Context sin envolvernos en Consumer.
 * - Devuelve lo que se puso en value del Provider.
 */

/**
 * --------------------------------------------
 * 8) Hook personalizado: useCart
 * --------------------------------------------
 * - Abstracción ligera para no repetir useContext(CartContext) en cada componente.
 * - Mejora legibilidad y mantenibilidad.
 */
export function useCart() {
    return useContext(CartContext)
}
