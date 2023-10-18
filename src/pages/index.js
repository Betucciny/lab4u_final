import {MainLayout} from "@/components/layout";
import {useState} from "react";
import {withSessionPage} from "@/lib/session";
import Link from "next/link";

export default function Home(props) {

    const [userSession, setUserSession] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });
    return (
        <MainLayout isLoggedIn={userSession.isLoggedIn} name={userSession.nombre} role={userSession.roles}>
            <div className="flex-1 mt-8 text-center">
                <h1 >LAB4U</h1>
                <p className="text-gray-700">
                    ¡Bienvenido, {userSession.nombre}!
                </p>
                <p className="text-gray-700">
                    Tus roles: {userSession.roles?.join(', ')}
                </p>
                <p className="text-gray-700">
                    ¿Estás autenticado? {userSession.isLoggedIn ? 'Sí' : 'No'}
                </p>
                <p className="text-gray-700 mt-2">
                    <Link href="/acerca-de" className="text-blue-500 hover:underline">
                        Acerca de Nosotros
                    </Link>
                </p>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage(async function ({req, res}) {
    return {
        props: {
            isLoggedIn: req.session.get("isLoggedIn") === true,
            user: req.session.get("user") || "",
            role: req.session.get("role") || ""
        }
    };
})


