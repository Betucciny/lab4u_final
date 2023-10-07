import {pool} from "@/server_sevices/databasepool";
import {escape} from "mysql2";

async function getAllReactivos() {
    const query = "Select r.id, r.nombre, m.nombre as marca, c.descripcion as contenedor, r.numcas, r.cantidad, r.unidad " +
        "from reactivo r left join marca m ON r.idmarca = m.id left join contenedor c ON r.idcontenedor = c.id";
    const [reactivos] = await pool.query(query)
    return reactivos;
}
async function getAllMateriales() {
    const query = "Select mat.id, mat.nombre, m.nombre as marca, mat.tipo, mat.descripcion " +
        "from material mat left join marca m ON  mat.idmarca = m.id left join kit k ON mat.id = " +
        "k.idp where k.idp is null";
    const [materiales] = await pool.query(query);
    return materiales;
}

const getAllData = async (query1, query2) => {
    const [kits] = await pool.query(query1)
    const [materiales] = await pool.query(query2);
    return {kits, materiales};
}


async function getAllKits() {
    const query1 = "Select mat.id, mat.nombre, m.nombre as marca, mat.tipo, mat.descripcion " +
        "from material mat left join marca m ON mat.idmarca = m.id left join kit k ON mat.id = " +
        "k.idp where k.idp is not null";
    const query2 = "Select k.idp as kit, mat.id, mat.nombre, m.nombre as marca, mat.tipo, " +
        "mat.descripcion from material mat left join marca m ON mat.idmarca = m.id left join " +
        "kit k ON mat.id = k.idh where k.idp is not null";

    const {kits, materiales} = await getAllData(query1, query2);
    return kits.map((kit) => {
        kit.materiales = materiales.filter((material) => material.kit === kit.id);
        return kit;
    });
}


async function getUser(username) {
    const query = "Select id, nombre, clave from usuario where nombre = " + escape(username);
    const [user] = await pool.query(query);
    if (user.length === 0) {
        throw new Error("No user found");
    }
    return user[0];
}


export {getAllReactivos, getAllMateriales, getAllKits, getUser};