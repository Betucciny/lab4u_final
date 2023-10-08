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
} from "@nextui-org/react";
import Link from "next/link";

function Header({name, isLoggedIn, role}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = isLoggedIn ? [
        ["Inventario", "/inventario"],
        ["Crear Vale", "/crear-vale"],
        ["Historial de Vales", "/historial-vales"],
        ["Configuración", "/configuracion"],
        ["Log out", "/logout"],
    ] : [
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

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
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
    return (
        <div className="footer--container">
            <p>
                Footer
            </p>
        </div>
    )
}


function MainLayout({children, name, isLoggedIn, role}) {
    return (
        <>
            <Header name={name} isLoggedIn={isLoggedIn} role={role} />
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export {MainLayout, Footer}