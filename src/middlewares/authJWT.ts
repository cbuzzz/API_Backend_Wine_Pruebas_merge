import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken';
import { usersInterface, UsersInterfacePrivateInfo, usersofDB } from '../modelos/types_d_users'
import IJwtPayload from '../modelos/JWTPayload';

export class authJWT {

    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const _SECRET: string = 'winer+jwt';
            console.log("verifyToken");

            //const token = await req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
            const token = req.header("winer-access-token");

            if (!token) {
                console.log("no token provided")
                return res.status(403).json({ message: "No token provided" });
            }
            console.log("token provided")
            try {
                const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
                console.log("Verified correctly");
                req.userID = decoded.id;
                console.log(req.userID);
                const user = await usersofDB.findById(req.userID, { password: 0 });
                if (!user) return res.status(404).json({ message: "No user found" });
                console.log("User found");
                return next();

            } catch (error) {
                console.log("Error when decoding token: " + error);
                return res.status(401).json({ message: "Unauthorized! Invalid Token" });
            }
        }
        catch (error) {
            console.log("Internal server errror: " + error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    public async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("isAdmin verification");
            const user = await usersofDB.findById(req.userID);
    
            // Verificar si el usuario fue encontrado
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
    
            // Verificar si el rol del usuario es admin
            if (user.role === "admin") {
                console.log("User is admin");
                return next(); // Llama al siguiente middleware
            }
    
            return res.status(403).json({ message: "Require Admin Role!" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error });
        }
    };

    public async isOwner (req: Request, res: Response, next: NextFunction, ThingToVerify: String) {
        try {
            const user = await usersofDB.findById(req.userID);
            var isAdmin: boolean = false;
           
            if(user.role == "admin"){
                isAdmin = true;
            }
    
            switch(ThingToVerify){
                    
                    case 'User':{
    
                        if(!isAdmin){
                            const userId = req.userID;
                            const user = await usersofDB.findById(userId);
                    
                            if (!user) return res.status(403).json({ message: "No user found" });
                    
                            if (user._id != req.userID) return res.status(403).json({ message: "Not Owner" });
                        }
                            return next();           
                    }

                    default:{
                        return res.status(500).send({error: 'Internal server error' });
                    }
                }
    
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
    }
}

export default authJWT;

