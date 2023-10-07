import withSession from "@/lib/session";


export default withSession(async (req, res) => {
    if (req.method !== "GET") {
        res.status(405).json({status: "error", data: "Method not allowed"});
        return;
    }
    const user = req.session.get("user");
    if (user) {
        res.status(200).json({
            isLoggedIn: true,
            ...user,
        })
    }else {
        res.status(200).json({
            isLoggedIn: false,
        });
    }
});