'use client'
import React, { useState } from 'react'
import { useCart } from '../../components/shoppingCart/cartContext'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'

export default function CartPage() {
    const { items, removeFromCart, clearCart } = useCart()

    const [buyer, setBuyer] = useState({
        name: '',
        email: '',
        address: ''
    })

    const total = items.reduce((sum, product) => sum + product.price * product.quantity, 0)

    const handleChange = e => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        alert(`¡Pedido confirmado!\nTotal: $${total.toFixed(2)}`)
        clearCart()
    }

    if (items.length === 0) {
        return (
            <p className="p-8 text-center">
                Tu carrito está vacío.
            </p>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Tu Carrito</h1>
            <div className="space-y-4">
                {items.map(product => (
                    <Card key={product.id} className="flex justify-between items-center">
                        <CardBody className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p>Precio unitario: ${product.price.toFixed(2)}</p>
                        </CardBody>
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

            <p className="text-right font-bold text-lg">
                Total: ${total.toFixed(2)}
            </p>

            <Card className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="name"
                        label="Nombre completo"
                        value={buyer.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        value={buyer.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="address"
                        label="Dirección"
                        value={buyer.address}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" className="w-full">
                        Confirmar compra
                    </Button>
                </form>
            </Card>
        </div>
    )
}