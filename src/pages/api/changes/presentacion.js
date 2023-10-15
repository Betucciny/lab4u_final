import {presentacionCompleto} from "@/server_sevices/inserts";
import {presentacionParcial} from "@/server_sevices/updates";


export default async function handler(req, res) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {cantidad, unidad} = body;
        try {
            const results = await presentacionCompleto(cantidad, unidad);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e});
        }
    } else if(method === 'PUT') {
        const {id, cantidad, unidad} = body;
        try {
            const result = await presentacionParcial(id, cantidad, unidad);
            res.status(200).json({status: "success", data: result});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message});
        }
    } else {
        res.status(500).json({status: "error", data: "metodo no soportado"});
    }
}



