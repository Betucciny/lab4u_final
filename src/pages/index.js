import {MainLayout} from "@/components/layout";
import {useState} from "react";

export default function Home() {
    const [user_session, setUser_session] = useState({isLoggedIn: false, nombre: ''});


    return (
        <MainLayout>
            <h1>Home</h1>
        </MainLayout>
    )
}
