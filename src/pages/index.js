import {MainLayout} from "@/components/layout";
import {useState} from "react";
import {withSessionPage} from "@/lib/session";

export default function Home(props) {
    console.log(props)
    const [user_session, setUser_session] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });
    return (
        <MainLayout isLoggedIn={user_session.isLoggedIn} name={user_session.nombre} role={user_session.roles}>
            <h1>Home</h1>
            <p>{"Roles: " + user_session.roles}</p>
            <p>{"Nombre: " + user_session.nombre}</p>
            <p>{"isLoggedIn: " + user_session.isLoggedIn}</p>
        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage()


