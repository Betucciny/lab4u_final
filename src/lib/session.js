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

export function withSessionPage() {
    return withSession(async function ({req, res}) {
        if (req.session.get("isLoggedIn") === false || req.session.get("isLoggedIn") === undefined) {
            if (req.url !== "/login") {
                res.writeHead(302, {Location: "/login"});
                res.end();
            }
        }
        return {
            props: {
                isLoggedIn: req.session.get("isLoggedIn") || false,
                user: req.session.get("user") || {},
                role: req.session.get("role") || [],
            }
        }
    });
}