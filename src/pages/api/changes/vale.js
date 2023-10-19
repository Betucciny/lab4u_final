
import {withSessionApiAdmin} from "@/lib/session";
import {valeProfesorCompleto} from "@/server_sevices/inserts";


async function handler(req, res) {
    const [body, method] = [req.body, req.method];
    if (method === "POST") {
        const {idUsuario, grupo, semestre, materia, fecha, estatus, items} = body;
        try {
            const results = await valeProfesorCompleto(idUsuario, grupo, semestre, materia, fecha, estatus, items);
            res.status(200).json({status: "success", data: results});
        } catch (e) {
            res.status(500).json({status: "error", data: e.toString()});
        }
    } else if (method === "PUT") {
        //TODO//
    } else {
        res.status(500).json({status: "error", data: "metodo no soportado"});
    }
}

export default withSessionApiAdmin(handler)
// export default handler;
