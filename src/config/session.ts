import session from "express-session";

export const sessionConfig = session({
    secret: "secretCookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60*60*1000,
    }
});

declare module  "express-session" {
    interface SessionData {
        id_user: number;
        username: string;
    }
}