import {Request,Response,NextFunction} from "express";

export const isAuthenticated = (req:Request, res:Response, next:NextFunction) => {
    if (!req.session.username) {
        res.status(401).json({isLoggedIn: false, message: "Unauthorized" });
        return;
    } 
    next();
}