import {withIronSession, Session} from "next-iron-session";

const sessionOptions = {
    password: String(process.env.SECRET_COOKIE_PASSWORD),
    cookieName: "lab4u_auth_session",
    cookieOptions: {
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
    }
}


export default function withSession(handler) {
    return withIronSession(handler, sessionOptions);
}

