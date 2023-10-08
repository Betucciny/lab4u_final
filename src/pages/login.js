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
            <div className="flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-4xl font-semibold text-gray-800">Login</h1>
                    {user_session.isLoggedIn ? (
                        <h2 className="text-lg font-semibold mb-4 text-blue-500">Bienvenido {user_session.nombre}</h2>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold mb-4 text-red-500">Not logged in</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={usernameHandler}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={passwordHandler}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    Login
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage()