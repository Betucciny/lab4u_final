import {pool} from "@/server_sevices/databasepool";
import {escape} from "mysql2";

async function getAllReactivos() {
    const query = "Select r.id, r.nombre, m.nombre as marca, c.descripcion as contenedor, r.numcas, " +
        "p.cantidad, p.unidad from reactivo r left join marca m ON r.idmarca = m.id left join contenedor c ON " +
        "r.idcontenedor = c.id left join presentacion p ON r.idpresentacion = p.id";
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

async function getAllMarcas() {
    const query = "Select * from marca";
    const [marcas] = await pool.query(query);
    return marcas;
}

async function getAllContenedores() {
    const query = "Select * from contenedor";
    const [contenedores] = await pool.query(query);
    return contenedores;
}

async function getAllPresentaciones() {
    const query = "Select * from presentacion";
    const [presentaciones] = await pool.query(query);
    return presentaciones;
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

async function getRoles(id) {
    const query = "Select r.tipo from rol r left join usuario_rol ur ON r.id = ur.idrol where ur.idusuario = " + escape(id);
    const [roles] = await pool.query(query);
    console.log(roles)
    return roles.map((rol) => rol.tipo);
}


async function getUser(username) {
    const query = "Select id, nombre, clave from usuario where nombre = " + escape(username);
    const [user] = await pool.query(query);
    if (user.length === 0) {
        throw new Error("No user found");
    }
    user[0].roles = await getRoles(user[0].id);
    return user[0];
}




export {getAllReactivos, getAllMateriales, getAllKits, getUser, getAllMarcas, getAllContenedores, getAllPresentaciones};