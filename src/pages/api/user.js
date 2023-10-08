import withSession from "@/lib/session";


export default withSession(async (req, res) => {
    if (req.method !== "GET") {
        res.status(405).json({status: "error", data: "Method not allowed"});
        return;
    }
    const user = req.session.get("user");
    const isLoggedIn = req.session.get("isLoggedIn");
    const role = req.session.get("role");
    const roleArray = role.toString().split(", ");
    if (isLoggedIn) {
        res.status(200).json({
            isLoggedIn: isLoggedIn,
            user: user,
            role: roleArray
        })
    }else {
        res.status(200).json({
            isLoggedIn: false,
        });
    }
});