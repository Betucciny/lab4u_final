import {MainLayout} from '@/components/layout'
import {useState} from "react";
import {withSession, withSessionPage} from "@/lib/session";
import {login} from "@/client_services/posts";


export default function LoginPage({props}) {
    const [user_data, setUser_data] = useState({username: '', password: ''});
    const [user, setUser] = useState({isLoggedIn: false, nombre: ''});

    console.log(props)


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        try {
            const objectResponse = await login(user_data.username, user_data.password)
            if (objectResponse.status === 200) {
                alert('Login success')
                setUser({isLoggedIn: true, nombre: objectResponse.data.data.nombre});
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
        <MainLayout>
            <h1>Login</h1>
            {
                user.isLoggedIn ? <h1>{user.nombre}</h1> : <h1>Not logged in</h1>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={usernameHandler}/>
                <input type="password" placeholder="password" onChange={passwordHandler}/>
                <button type="submit">Login</button>
            </form>

        </MainLayout>
    )
}
export const getServerSideProps = withSession(async function ({req, res}) {

    return {
        props: {
            isLoggedIn: req.session.get("isLoggedIn") || false,
            user: req.session.get("user") || {},
            role: req.session.get("role") || [],
        }
    }
});
