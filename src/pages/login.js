import {MainLayout} from '@/components/layout'
import {useState} from "react";
import {getUserInfo, login} from "@/client_services/posts";
import withSession from "@/lib/session";


export default withSession(async (req, res) => {
    const [user_data, setUser_data] = useState({username: '', password: ''});
    const [user, setUser] = useState({isLoggedIn: false, nombre: ''});

    console.log(req.session)


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
})

