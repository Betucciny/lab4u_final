import * as React from 'react';
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Divider,
    Tooltip,
} from "@nextui-org/react";
import Link from "next/link";

function Header({name, isLoggedIn, role}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = isLoggedIn ? [
        ["Inicio", "/"],
        ["Inventario", "/inventario"],
        ["Crear Vale", "/crear-vale"],
        ["Historial de Vales", "/historial-vales"],
        ["Configuración", "/configuracion"],
        ["Log out", "/logout"],
    ] : [
        ["Inicio", "#"],
        ["Log in", "/login"],
    ];

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-[var(--navbar-bg-color)] text-[var(--navbar-text-color)]"
        >
            <NavbarContent className="md:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="md:hidden pr-3" justify="center">
                <NavbarBrand>

                    <p className="font-bold text-inherit">LAB4U</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarBrand>

                    <p className="font-bold text-inherit">LAB4U</p>
                </NavbarBrand>
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item[0]}-${index}`}>
                        <Link color="foreground" href={item[1]}>
                            {item[0]}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarMenu className="bg-[#3f2e27] bg-opacity-90">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item[0]}-${index}`}>
                        <Link
                            className={`w-full text-[var(--navbar-text-color)]`}
                            href={item[1]}
                            size="lg"
                        >
                            {item[0]}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

        </Navbar>
    );
}

function Footer() {
    return(
        <footer className="bg-gray-800 text-white py-9" style={{
            backgroundColor: 'var(--footer-bg-color)',
            color: 'var(--footer-text-color)',
        }}>
            <div className="container mx-auto md:flex md:justify-between md:items-center p-9">
                <div className="md:text-center mb-4 md:mb-0">
                    <a href="#" className="text-blue-300 hover:text-blue-400 text-sm font-semibold">Acerca de</a>
                </div>
                <div className="md:text-center">
                    <p className="text-sm font-light">LAB4U: Sistema de inventario para laboratorio de Química UPIIT</p>
                </div>
                <div className="md:text-center">
                    <a href="#" className="text-blue-300 hover:text-blue-400 text-sm font-semibold">Contáctanos</a>
                </div>
            </div>
        </footer>
    )
}


function MainLayout({children, name, isLoggedIn, role}) {
    return (
        <>
            <Header name={name} isLoggedIn={isLoggedIn} role={role} />
            <main className="p-9">
                {children}
            </main>
            <Footer/>
        </>
    )
}

export {MainLayout, Footer}