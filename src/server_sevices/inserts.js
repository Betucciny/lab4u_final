import {pool} from "databasepool";
import {hashPassword} from "./encryption";
import {escape} from "mysql2";

async function register(username, password) {
    console.log(password);
    const hash = await hashPassword(password);
    const query = "Insert into usuario (nombre, clave) values (" + escape(username) + ", " + escape(hash) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    }
    catch (e) {
        throw new Error("Error al registrar usuario");
    }
}

export {register};