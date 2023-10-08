import {MainLayout} from '@/components/layout'
import {useState} from "react";
import {withSessionPage} from "@/lib/session";
import {login} from "@/client_services/posts";


export default function LoginPage(props) {
    console.log(props)
    const [user_session, setUser_session] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });
    const [user_data, setUser_data] = useState({username: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const objectResponse = await login(user_data.username, user_data.password)
            if (objectResponse.status === 200) {
                setUser_session({
                    isLoggedIn: true,
                    nombre: objectResponse.data.data.nombre,
                    roles: objectResponse.data.data.roles
                })
                alert('Login success')
            }
        } catch (error) {
            console.log(error)
            alert(error.response.data.data);
        }
    }

    const usernameHandler = (e) => {
        setUser_data({...user_data, username: e.target.value})
    }
    const passwordHandler = (e) => {
        setUser_data({...user_data, password: e.target.value})
    }

    return (
        <MainLayout isLoggedIn={user_session.isLoggedIn} name={user_session.nombre} role={user_session.roles}>
            <h1>Login</h1>
            {
                user_session.isLoggedIn ? <h1>{user_session.nombre}</h1> : <h1>Not logged in</h1>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={usernameHandler}/>
                <input type="password" placeholder="password" onChange={passwordHandler}/>
                <button type="submit">Login</button>
            </form>

        </MainLayout>
    )
}
export const getServerSideProps = withSessionPage()