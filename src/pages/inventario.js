import {MainLayout} from "@/components/layout";
import {useState} from "react";

export default function Home(props) {
    console.log(props)
    const [user_session, setUser_session] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });
    const [active, setActive] = useState(0);
    const categories = [
        "Materiales",
        "Reacitivos",
    ]
    return (
        <MainLayout isLoggedIn={user_session.isLoggedIn} name={user_session.nombre} role={user_session.roles}>

        </MainLayout>
    )
}