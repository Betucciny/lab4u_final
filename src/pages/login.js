import {MainLayout} from '@/components/layout'
import {useState} from "react";
import {login} from "@/client_services/posts";


export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let user= {isLoggedIn: false, nombre: ''}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const objetjoResponse = await login(username, password)
            if (objetjoResponse.status === 200) {
                alert('Login success')
                user = {isLoggedIn: true, nombre: objetjoResponse.data.data.nombre};
            }
        } catch (error) {
            console.log(error)
            alert(error.response.data.data);
        }
    };
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <MainLayout>
            <div>
                {
                    <>{!user.isLoggedIn && <form onSubmit={handleSubmit}>
                        <div className="imgcontainer">
                            {/*<img src="img_avatar2.png" alt="Avatar" className="avatar"/>*/}
                        </div>

                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required
                                   onChange={usernameHandler}/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required
                                   onChange={passwordHandler}/>

                            <button type="submit">Login</button>
                        </div>
                    </form>}</>}
            </div>
            ;
        </MainLayout>
    )
}
