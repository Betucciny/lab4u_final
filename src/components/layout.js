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

            <NavbarMenu >
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

function Footer() {
    return(
        <footer className="bg-white dark:bg-gray-900">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center"> LAB4U Sistema de inventario para laboratorio de Química UPIIT.
        </span>
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                    <Divider className="my-4" />
                    <div>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className=" hover:underline">About</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Discord Server</a>
                            </li>
                        </ul>
                    </div>
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