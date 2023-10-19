import {pool} from "./databasepool";
import {hashPassword} from "./encryption";
import {escape} from "mysql2";

async function register(username, password) {

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
            const [result2] = await pool.query(queryGetMarca);
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
            const [result2] = await pool.query(queryGetContenedor);
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
            const [result2] = await pool.query(queryGetPresentacion);
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


async function grupoCompleto(nombre, semestre) {
    const query = "Insert into grupo (nombre, semestre) values (" + escape(nombre) + ", " + escape(semestre) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar grupo");
    }
}

async function materiaCompleto(nombre) {
    const query = "Insert into materia (nombre) values (" + escape(nombre) + ")";
    try {
        const [result] = await pool.query(query);
        return result;
    } catch (e) {
        throw new Error("Error al registrar materia");
    }
}


async function valeProfesorCompleto(id, grupo, semestre, materia, fecha, estatus, items) {
    const idUsuario = id;
    let idGrupo;
    let idMateria;

    const queryGetGrupo = "Select id from grupo where nombre = " + escape(grupo) + " and semestre = " + escape(semestre);
    try {
        const [result] = await pool.query(queryGetGrupo);
        if (result.length === 0) {
            await grupoCompleto(grupo, semestre);
            const [result2] = await pool.query(queryGetGrupo);
            idGrupo = result2[0].id;
        }else{
            idGrupo = result[0].id;
        }
    }catch (e) {
        throw new Error("Error al registrar vale 1");
    }

    const queryGetMateria = "Select id from materia where nombre = " + escape(materia);
    try {
        const [result] = await pool.query(queryGetMateria);
        if (result.length === 0) {
            await materiaCompleto(materia);
            const [result2] = await pool.query(queryGetMateria);
            idMateria = result2[0].id;
        }else{
            idMateria = result[0].id;
        }
    }catch (e) {
        throw new Error("Error al registrar vale 2");
    }

    const query = "Insert into vale_profesor (idusuario, idgrupo, idmateria, fecha, estatus) values " +
        "(" + escape(idUsuario) + ", " + escape(idGrupo) + ", " + escape(idMateria) + ", " + escape(fecha) + ", " +
        escape(estatus) + ")";
    try {
        await pool.query(query);
    } catch (e) {
        throw new Error("Error al registrar vale 3");
    }

    const queryGetVale = "Select id from vale_profesor where idusuario = " + escape(idUsuario) + " and idgrupo = " +
        escape(idGrupo) + " and idmateria = " + escape(idMateria) + " and fecha = " + escape(fecha) + " and estatus = " +
        escape(estatus);

    try {
        const [result] = await pool.query(queryGetVale);
        const idVale = result[0].id;
        for (let i = 0; i < items.length; i++) {
            if(items[i].tipo === "reactivo"){
                const idReactivo = items[i].id;
                const numserie = items[i].descripcion;
                const queryInsertReactivo = "Insert into vale_reactivo (idvale, idreactivo, numserie) values " +
                    "(" + escape(idVale) + ", " + escape(idReactivo) + ", " + escape(numserie) + ")";
                await pool.query(queryInsertReactivo);
            }else{
                const idMaterial = items[i].id;
                const cantidad = items[i].cantidad;
                const codigo = items[i].descripcion;
                const queryInsertMaterial = "Insert into vale_material (idvale, idmaterial, cantidad, " +
                    "codigo) values (" + escape(idVale) + ", " + escape(idMaterial) + ", " + escape(cantidad) + ", " +
                    escape(codigo) + ")";
                await pool.query(queryInsertMaterial);
            }
        }
    }catch (e) {
        throw new Error("Error al registrar vale 5");
    }


}


export {register, materialCompleto, marcaCompleto, reactivoCompleto, contenedorCompleto, presentacionCompleto, valeProfesorCompleto};