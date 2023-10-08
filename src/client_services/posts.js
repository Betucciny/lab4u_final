import axios from "axios";

async function login(username, password) {
    return axios.post("/api/auth", {username, password})
}

async function getUserInfo() {
    return axios.get("/api/user")
}

export {login, getUserInfo};