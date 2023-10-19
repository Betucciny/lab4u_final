import {reactivoCompleto} from "@/server_sevices/inserts";
import {reactivoParcial} from "@/server_sevices/updates";
import {withSessionApiAdmin} from "@/lib/session";


async function handler(req, res, session) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {nombre, numcas, formula, marca, unidad, cantidad, contenedor} = body;
        try {
            const results = await reactivoCompleto(nombre, numcas, formula, marca, unidad, cantidad, contenedor);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e.toString()});
        }
    } else if (method === "PUT") {
        const {id, nombre, numcas, formula, marca, unidad, cantidad, contenedor} = body;
        try {
            const result = await reactivoParcial(id, nombre, numcas, formula, marca, unidad, cantidad, contenedor);
            res.status(200).json({status: "success", data: result});
        } catch (e) {
            res.status(500).json({message: e.message});
        }

    } else {
        res.status(500).json({status: "error", data: "metodo no soportado"});
    }
}

export default withSessionApiAdmin(handler)

