import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { usersofDB } from '../modelos/types_d_users';
import IJwtPayload from '../modelos/JWTPayload';

// Extender la interfaz Request para incluir userID
declare module 'express-serve-static-core' {
    interface Request {
        id?: string;
    }
}
export class authJWT {
    private _SECRET: string = 'winer+jwt';

    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("verifyToken");

            const token = req.header("winer-access-token");

            if (!token) {
                console.log("no token provided");
                return res.status(403).json({ message: "No token provided" });
            }
            console.log("token provided");
            try {
                const decoded = jwt.verify(token, this._SECRET) as IJwtPayload;
                console.log("Verified correctly");
                req.id = decoded.id.toString();
                console.log(req.id);
                const user = await usersofDB.findById(req.id, { password: 0 });
                if (!user) return res.status(404).json({ message: "No user found" });
                console.log("User found");
                return next();
            } catch (error) {
                console.log("Error when decoding token: " + error);
                return res.status(401).json({ message: "Unauthorized! Invalid Token" });
            }
        } catch (error) {
            console.log("Internal server error: " + error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("isAdmin verification");
            const user = await usersofDB.findById(req.id);

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            if (user.role === "admin") {
                console.log("User is admin");
                return next();
            }

            return res.status(403).json({ message: "Require Admin Role!" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error });
        }
    }
}

export default authJWT;

