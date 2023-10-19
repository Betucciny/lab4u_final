import {MainLayout} from '@/components/layout'
import {useState} from "react";
import {withSessionPage} from "@/lib/session";
import {login} from "@/client_services/posts";
import {Button, Input} from "@nextui-org/react";


export default function LoginPage(props) {
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
        setUser_data({...user_data, username: e})
    }
    const passwordHandler = (e) => {
        setUser_data({...user_data, password: e})
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
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={user_data.username}
                                    onValueChange={usernameHandler}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={user_data.password}
                                    onValueChange={passwordHandler}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    Login
                                </Button>
                            </form>
                        </>
                    )}
                </div>
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