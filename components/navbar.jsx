'use client'
import LoginStatus from "@/components/ui/LoginStatus";
import NextLink from "next/link";
import { Navbar as HeroUINavbar, NavbarContent, NavbarBrand, NavbarItem, } from "@heroui/navbar";
import { Badge } from "@heroui/badge";
import { IoCart } from "react-icons/io5";
import Image from "next/image";
import { useCart } from "@/components/shoppingCart/cartContext";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
    const { itemCount } = useCart();

    return (
        <HeroUINavbar
            className="bg-black shadow-sm z-50"
            maxWidth="xl"
            position="sticky">

            <NavbarContent className="px-4" justify="center">
                <NavbarBrand>
                    <NextLink href="/" className="flex items-center gap-2">
                        <Image
                            alt="ProductStore"
                            src="/logo.png"
                            width={128}
                            height={128}
                            className="object-contain" />
                        <span className="font-bold text-xl">{siteConfig.name}</span>
                    </NextLink>
                </NavbarBrand>

                <div className="hidden lg:flex gap-6 ml-8">
                    {siteConfig.navItems.map(item => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                href={item.href}
                                className="text-white hover:text-yellow-400 transition-colors">
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent className="px-4" justify="end">
                <NavbarItem>
                    <NextLink
                        href="/cart"
                        className="relative flex items-center text-gray-800 
                        hover:text-yellow-400 transition-colors">

                        <IoCart size={24} />

                        {itemCount > 0 && (
                            <Badge
                                content={itemCount}
                                shape="circle"
                                size="sm"
                                color="black"
                                className="absolute -top-1 -right-1"
                            />
                        )}
                    </NextLink>
                </NavbarItem>
                <NavbarItem>
                    <LoginStatus />
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
