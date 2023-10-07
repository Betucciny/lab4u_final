import axios from "axios";


async function login(username, password) {
    return axios.post("/api/auth", {username, password})
}

export {login};