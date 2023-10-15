import {marcaCompleto} from "@/server_sevices/inserts";
import {marcaParcial} from "@/server_sevices/updates";


export default async function handler(req, res) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {nombre} = body;
        try {
            const results = await marcaCompleto(nombre);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e});
        }
    } else if (method === 'PUT') {
        const {id, nombre} = body;
        try {
            const result = await marcaParcial(id, nombre);
            res.status(200).json({status: "success", data: result});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message});
        }
    } else {
        res.status(500).json({status: "error", data: "metodo no soportado"});
    }
}



