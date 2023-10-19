import {withSession} from "@/lib/session";
import {getUser} from "@/server_sevices/selects";
import {comparePassword} from "@/server_sevices/encryption";

export default withSession(async (req, res) => {
    const ERROR_CREDENTIALS = "Credenciales incorrectas";
    if (req.method !== "POST") {
        res.status(405).json({status: "error", data: "Method not allowed"});
        return;
    }
    const {username, password} = req.body;
    try {
        const userCredentials = await getUser(username);
        console.log(userCredentials)
        if (await comparePassword(password, userCredentials.clave) === true) {
            await saveSession(userCredentials.nombre, userCredentials.roles, userCredentials.id, req);
            res.status(200).json({status: "success", data: userCredentials});
        } else {
            res.status(403).json({status: "error", data: ERROR_CREDENTIALS});
        }
    } catch (e) {
        res.status(500).json({status: "error", data: e.message})
    }
});

async function saveSession(user, rol, id, req) {
    req.session.set("user", user);
    req.session.set("isLoggedIn", true);
    req.session.set("role", rol);
    req.session.set("id", id);
    await req.session.save();
}