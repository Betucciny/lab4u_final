import {escape} from "mysql2";
import {pool} from "@/server_sevices/databasepool";
import {contenedorCompleto, marcaCompleto, presentacionCompleto} from "@/server_sevices/inserts";


async function marcaParcial(id, nombre) {
    const query = "Update marca set nombre = " + escape(nombre) + " where id = " + escape(id);
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al actualizar marca");
    }
}

async function contenedorParcial(id, descripcion) {
    const query = "Update contenedor set descripcion = " + escape(descripcion) + " where id = " + escape(id);
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al actualizar contenedor");
    }
}

async function presentacionParcial(id, cantidad, unidad) {
    const query = "Update presentacion set cantidad = " + escape(cantidad) + ", unidad = " + escape(unidad) +
        " where id = " + escape(id);
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al actualizar presentacion");
    }
}

async function materialParcial(id, nombre, marca, tipo, descripcion) {
    let idMarca;
    const queryGetIdMarca = "Select id from marca where nombre = " + escape(marca);
    try {
        const [result] = await pool.query(queryGetIdMarca);
        if (result.length === 0) {
            await marcaCompleto(marca);
            const [result2] = await pool.query(queryGetIdMarca);
            idMarca = result2[0].id;
        } else {
            idMarca = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al actualizar material");
    }
    const query = "Update material set nombre = " + escape(nombre) + ", marca = " + escape(idMarca) +
        ", tipo = " + escape(tipo) + ", descripcion = " + escape(descripcion) + " where id = " + escape(id);
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al actualizar material");
    }
}

async function reactivoParcial(id, nombre, numcas, formula, marca, unidad, cantidad, contenedor) {
    let idMarca;
    let idContenedor;
    let idPresentacion;

    const queryGetMarca = "Select id from marca where nombre = " + escape(marca);
    try {
        const [result] = await pool.query(queryGetMarca);
        if (result.length === 0) {
            await marcaCompleto(marca);
            let [result2] = await pool.query(queryGetMarca);
            idMarca = result2[0].id;
        } else {
            idMarca = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al actualizar reactivo");
    }

    const queryGetContenedor = "Select id from contenedor where descripcion = " + escape(contenedor);
    try {
        const [result] = await pool.query(queryGetContenedor);
        if (result.length === 0) {
            await contenedorCompleto(contenedor);
            let [result2] = await pool.query(queryGetContenedor);
            idContenedor = result2[0].id;
        } else {
            idContenedor = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al actualizar reactivo");
    }

    const queryGetPresentacion = "Select id from presentacion where cantidad = " + escape(cantidad) +
        " and unidad = " + escape(unidad);
    try {
        const [result] = await pool.query(queryGetPresentacion);
        if (result.length === 0) {
            await presentacionCompleto(cantidad, unidad);
            let [result2] = await pool.query(queryGetPresentacion);
            idPresentacion = result2[0].id;
        } else {
            idPresentacion = result[0].id;
        }
    } catch (e) {
        throw new Error("Error al actualizar reactivo");
    }

    const query = "Update reactivo set nombre = " + escape(nombre) + ", numcas = " + escape(numcas) +
        ", formula = " + escape(formula) + ", idmarca = " + escape(idMarca) + ", idpresentacion = " + escape(idPresentacion) +
        ", idcontenedor = " + escape(idContenedor) + " where id = " + escape(id);
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al actualizar reactivo");
    }
}

export {marcaParcial, contenedorParcial, presentacionParcial, materialParcial, reactivoParcial};