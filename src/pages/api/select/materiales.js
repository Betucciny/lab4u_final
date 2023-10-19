import {getAllMateriales} from "@/server_sevices/selects";


export default async function handler(req, res) {
    try {
        const results = await getAllMateriales();
        res.status(200).json({status: "success", data: results});
    } catch
        (e) {
        res.status(500).json({status: "error", data: e});
    }
}


