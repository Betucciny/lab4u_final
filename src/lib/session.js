import {withIronSession} from "next-iron-session";

const sessionOptions = {
    password: String(process.env.SECRET_COOKIE_PASSWORD),
    cookieName: "lab4u_auth_session",
    cookieOptions: {
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV === "production",
    }
}


export function withSession(handler) {
    return withIronSession(handler, sessionOptions);
}


export function withSessionApiAdmin(handler) {
    return withSession(async function (req, res) {
        if (req === undefined) {
            res.writeHead(403, {Location: "/login"});
            res.end();
        }
        if (req.session === undefined) {
            res.writeHead(403, {Location: "/login"});
            res.end();
        } else if (req.session.get("isLoggedIn") === false || req.session.get("isLoggedIn") === undefined) {
            res.writeHead(403, {Location: "/login"});
            res.end();
        } else {
            if (req.session.get("role").includes("admin")) {
                return handler(req, res);
            } else {
                res.writeHead(403, {Location: "/login"});
                res.end();
            }
        }
    });
}

export function withSessionPage(handler) {
    return withSession(async function ({req, res}) {
        if (req.session.get("isLoggedIn") === false || req.session.get("isLoggedIn") === undefined) {
            if (req.url !== "/login") {
                res.writeHead(302, {Location: "/login"});
                res.end();
            }
        }
        return handler({req, res});
    });
}