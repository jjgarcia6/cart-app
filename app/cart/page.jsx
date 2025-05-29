// app/cart/page.jsx

'use client'  // Indica que este componente se renderiza en el cliente
import React, { useState } from 'react'
// Hook personalizado para manejar el carrito (proveerá items, funciones para añadir/eliminar/limpiar)
import { useCart } from '../../components/shoppingCart/cartContext'
// Componentes UI de HeroUI
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'

/**
 * CartPage
 *
 * Componente principal de la página de carrito de compras.
 * - Muestra los ítems en el carrito
 * - Permite eliminarlos individualmente
 * - Muestra el total y un formulario de datos del comprador
 * - Al enviar, limpia el carrito y muestra una alerta de confirmación
 */
export default function CartPage() {
    // Extraemos del contexto del carrito:
    // items: array de productos en el carrito
    // removeFromCart: función para eliminar un ítem por id
    // clearCart: función para vaciar todo el carrito
    const { items, removeFromCart, clearCart } = useCart()

    // Estado local para los datos del comprador
    const [buyer, setBuyer] = useState({
        name: '',
        email: '',
        address: ''
    })

    // Calculamos el total sumando (precio * cantidad) de cada producto
    const total = items.reduce((sum, product) => sum + product.price * product.quantity, 0)

    /**
     * handleChange
     * Actualiza el estado `buyer` según el input que cambie.
     * e.target.name apunta a la propiedad (name, email, address).
     */
    const handleChange = e => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        })
    }

    /**
     * handleSubmit
     * Se dispara al enviar el formulario.
     * - Previene el recargo de página
     * - Simula envío a API (aquí simplemente alerta)
     * - Limpia el carrito
     */
    const handleSubmit = e => {
        e.preventDefault()
        alert(`¡Pedido confirmado!\nTotal: $${total.toFixed(2)}`)
        clearCart()
    }

    // Si no hay items, mostramos un mensaje
    if (items.length === 0) {
        return (
            <p className="p-8 text-center">
                Tu carrito está vacío.
            </p>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Título de la página */}
            <h1 className="text-2xl font-bold">Tu Carrito</h1>

            {/* Lista de productos en el carrito */}
            <div className="space-y-4">
                {items.map(product => (
                    <Card key={product.id} className="flex justify-between items-center">
                        {/* CardBody: detalles del producto */}
                        <CardBody className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p>Precio unitario: ${product.price.toFixed(2)}</p>
                        </CardBody>
                        {/* CardFooter: botón para eliminar este producto */}
                        <CardFooter>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Eliminar
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Muestra el total de la compra */}
            <p className="text-right font-bold text-lg">
                Total: ${total.toFixed(2)}
            </p>

            {/* Formulario para ingresar datos del comprador */}
            <Card className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre completo */}
                    <Input
                        name="name"
                        label="Nombre completo"
                        value={buyer.name}
                        onChange={handleChange}
                        required
                    />
                    {/* Email */}
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        value={buyer.email}
                        onChange={handleChange}
                        required
                    />
                    {/* Dirección */}
                    <Input
                        name="address"
                        label="Dirección"
                        value={buyer.address}
                        onChange={handleChange}
                        required
                    />
                    {/* Botón de envío */}
                    <Button type="submit" className="w-full">
                        Confirmar compra
                    </Button>
                </form>
            </Card>
        </div>
    )
}