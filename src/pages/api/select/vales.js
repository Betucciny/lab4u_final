
import {getVales} from "@/server_sevices/selects";

export default async function handler(req, res) {
    const {id} = req.query;
    try {
        const results = await getVales(id);
        res.status(200).json({status: "success", data: results});
    }
    catch (e) {
        res.status(500).json({status: "error", data: e});
    }
}
