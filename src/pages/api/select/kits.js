import {getAllKits} from "@/server_sevices/selects";
import {withSessionApiAdmin} from "@/lib/session";


async function handler(req, res) {
    try{
        const results = await getAllKits();
        res.status(200).json({status: "success", data: results});
    } catch
        (e) {
        res.status(500).json({status: "error", data: e});
    }
}

// export default withSessionApiAdmin(handler)

export default handler;