import {pool} from "./databasepool";
import {hashPassword} from "./encryption";
import {escape} from "mysql2";

async function register(username, password) {
    console.log(password);
    const hash = await hashPassword(password);
    const query = "Insert into usuario (nombre, clave) values (" + escape(username) + ", " + escape(hash) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar usuario");
    }
}

async function materialCompleto(nombre, marca, tipo, descripcion) {
    const queryGetMarca = "Select id from marca where nombre = " + escape(marca);
    try {
        const [result] = await pool.query(queryGetMarca);
        if (result.length === 0) {
            await marcaCompleto(marca);
            const [result2] = await pool.query(queryGetMarca);
            const query = "Insert into material (nombre, idmarca, tipo, descripcion) values " +
                "(" + escape(nombre) + ", " + escape(result2[0].id) + ", " + escape(tipo) + ", " +
                escape(descripcion) + ")";
            const [result3] = await pool.query(query);
            return result3;
        } else{
            const query = "Insert into material (nombre, idmarca, tipo, descripcion) values " +
                "(" + escape(nombre) + ", " + escape(result[0].id) + ", " + escape(tipo) + ", " +
                escape(descripcion) + ")";
            const [result2] = await pool.query(query);
            return result2;
        }
    } catch (e) {
        throw new Error("Error al registrar material");
    }
}

async function marcaCompleto(nombre) {
    const query = "Insert into marca (nombre) values (" + escape(nombre) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar marca");
    }
}

async function contenedorCompleto(descripcion) {
    const query = "Insert into contenedor (descripcion) values (" + escape(descripcion) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar contenedor");
    }
}


async function presentacionCompleto(cantidad, unidad) {
    console.log(cantidad);
    const query = "Insert into presentacion (cantidad, unidad) values (" + escape(cantidad) +
        ", " + escape(unidad) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar presentacion");
    }
}

async function reactivoCompleto(nombre, numcas, formula, marca, unidad, cantidad, contenedor) {
    let idMarca;
    let idContenedor;
    let idPresentacion;

    const queryGetMarca = "Select id from marca where nombre = " + escape(marca);
    try{
        const [result] = await pool.query(queryGetMarca);
        if (result.length === 0) {
            await marcaCompleto(marca);
            let [result2] = await pool.query(queryGetMarca);
            idMarca = result2[0].id;
        } else {
            idMarca = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al registrar reactivo 1");
    }

    const queryGetContenedor = "Select id from contenedor where descripcion = " + escape(contenedor);
    try{
        const [result] = await pool.query(queryGetContenedor);
        if (result.length === 0) {
            await contenedorCompleto(contenedor);
            let [result2] = await pool.query(queryGetContenedor);
            idContenedor = result2[0].id;
        } else {
            idContenedor = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al registrar reactivo 2");
    }

    const queryGetPresentacion = "Select id from presentacion where cantidad = " + escape(cantidad) +
        " and unidad = " + escape(unidad);
    try{
        const [result] = await pool.query(queryGetPresentacion);
        if (result.length === 0) {
            await presentacionCompleto(cantidad, unidad);
            let [result2] = await pool.query(queryGetPresentacion);
            idPresentacion = result2[0].id;
        } else {
            idPresentacion = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al registrar reactivo 3");
    }

    const query = "Insert into reactivo (nombre, numcas, formula, idmarca, idpresentacion, idcontenedor) " +
        "values (" + escape(nombre) + ", " + escape(numcas) + ", " + escape(formula) + ", " + escape(idMarca) + ", " +
        escape(idPresentacion) + ", " + escape(idContenedor) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar reactivo 4");
    }
}


export {register, materialCompleto, marcaCompleto, reactivoCompleto, contenedorCompleto, presentacionCompleto};