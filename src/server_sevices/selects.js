import {pool} from "@/server_sevices/databasepool";
import {escape} from "mysql2";

async function getAllReactivos() {
    const query = `
    SELECT r.id, r.nombre, m.nombre as marca, c.descripcion as contenedor, r.numcas,
    p.cantidad, p.unidad
    FROM reactivo r
    LEFT JOIN marca m ON r.idmarca = m.id
    LEFT JOIN contenedor c ON r.idcontenedor = c.id
    LEFT JOIN presentacion p ON r.idpresentacion = p.id
  `;

    const [reactivos] = await pool.query(query);

    const existenciasPromises = reactivos.map((reactivo) => {
        return getExistenciasReactivos(reactivo.id).then((existencias) => {
            reactivo.existencias = existencias;
            return reactivo;
        });
    });

    return Promise.all(existenciasPromises);
}


async function getExistenciasReactivos(id) {
    const query = "Select id, caducidad, estatus, numserie, contenido, observaciones, ubicacion, entrada from" +
        " existencia_reactivo where idreactivo = " + escape(id);
    const [existencias] = await pool.query(query);
    return existencias.map((existencia) => {
        existencia.caducidad = existencia.caducidad.toISOString().split('T')[0];
        existencia.entrada = existencia.entrada.toISOString().split('T')[0];
        return existencia;
    })
    // return existencias;
}

async function getAllMateriales() {
    const query = "Select mat.id, mat.nombre, m.nombre as marca, mat.tipo, mat.descripcion " +
        "from material mat left join marca m ON  mat.idmarca = m.id";
    const [materiales] = await pool.query(query);

    const existenciasPromises = materiales.map((material) => {
        return getExistenciasMaterial(material.id).then((existencias) => {
            material.existencias = existencias;
            return material;
        });
    });
    return Promise.all(existenciasPromises);
}

async function getExistenciasMaterial(id) {
    const query = "Select id, cantidad, numeroserie, observaciones, codigo, ubicacion, entrada from" +
        " existencia_material where idmaterial = " + escape(id);
    const [existencias] = await pool.query(query);
    return existencias.map((existencia) => {
        existencia.entrada = existencia.entrada.toISOString().split('T')[0];
        return existencia;
    })
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
    const query2 = "Select k.idp as kit, k.cantidad as cantidad, mat.id, mat.nombre, m.nombre as marca, mat.tipo, " +
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


async function getVales(idUsuario){
    const query = "Select v.id, v.fecha, v.estatus, m.nombre as materia, g.nombre as grupo, g.semestre as " +
        "semestre from vale_profesor v left join grupo g ON v.idgrupo = g.id left join materia m ON v.idmateria = m.id " +
        "where v.idusuario = " + escape(idUsuario);
    try {
        const [vales] = await pool.query(query);
        for (let i = 0; i < vales.length; i++) {
            const queryReactivos = "Select r.nombre, r.numcas, r.formula, c.descripcion as contenedor, " +
                "p.cantidad, p.unidad, vr.numserie from vale_reactivo vr left join reactivo r ON vr.idreactivo = r.id " +
                "left join contenedor c ON r.idcontenedor = c.id left join presentacion p " +
                "ON r.idpresentacion = p.id where vr.idvale = " + escape(vales[i].id);
            const [reactivos] = await pool.query(queryReactivos);
            vales[i].fecha = vales[i].fecha.toISOString().split('T')[0];
            vales[i].reactivos = reactivos;
            const queryMateriales = "Select m.nombre, m.tipo, m.descripcion, ma.nombre, vm.codigo, " +
                "vm.cantidad from vale_material vm left join material m ON vm.idmaterial = m.id left join marca ma " +
                "ON m.idmarca = ma.id where vm.idvale = " + escape(vales[i].id);
            const [materiales] = await pool.query(queryMateriales);
            vales[i].materiales = materiales;
        }
        return vales;
    }catch (e) {
        throw new Error("No vales found");
    }
}


export {getAllReactivos, getAllMateriales, getAllKits, getUser, getAllMarcas, getAllContenedores, getAllPresentaciones, getVales};