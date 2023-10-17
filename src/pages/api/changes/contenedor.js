import {contenedorCompleto} from "@/server_sevices/inserts";
import {contenedorParcial} from "@/server_sevices/updates";
import {withSessionApiAdmin} from "@/lib/session";


async function handler(req, res) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {descripcion} = body;
        try {
            const results = await contenedorCompleto(descripcion);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e.toString()});
        }
    } else if (method === 'PUT') {
        const {id, descripcion} = body;
        try {
            const result = await contenedorParcial(id, descripcion);
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



