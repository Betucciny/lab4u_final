import {materialCompleto} from "@/server_sevices/inserts";
import {materialParcial} from "@/server_sevices/updates";
import {withSessionApiAdmin} from "@/lib/session";


async function handler(req, res) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {nombre, marca, tipo, descripcion} = body;
        try {
            const results = await materialCompleto(nombre, marca, tipo, descripcion);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e});
        }
    } else if (method === 'PUT') {
        const {id, nombre, marca, tipo, descripcion} = body;
        try {
            const result = await materialParcial(id, nombre, marca, tipo, descripcion);
            res.status(200).json({status: "success", data: result});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message});
        }
    } else {
        res.status(500).json({status: "error", data: "metodo no soportado"});
    }
}

export default withSessionApiAdmin(handler)

