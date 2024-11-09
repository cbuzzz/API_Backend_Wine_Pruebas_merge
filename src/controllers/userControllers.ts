import { pageInterface } from '../modelos/type_d_extras';
import { usersInterface, usersofDB } from '../modelos/types_d_users';
import * as userServices from '../services/userServices';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export async function findAllUsers(req:Request,res:Response):Promise<Response> {
    try{
        const {paginas, numerodecaracterespp} = req.body as pageInterface;
        const user:usersInterface[]|null = await userServices.getEntries.getAll(paginas, numerodecaracterespp);
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find all user' });
    }
}

export async function findUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.findById(req.params.id)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export const logIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { mail, password } = req.body;
        const user = await usersofDB.findOne({ mail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        console.log(password);
        const passwordIsValid = user.password === password; // Aquí deberías usar bcrypt para comparar las contraseñas

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, 'winer+jwt', {
            expiresIn: 86400 // 24 hours
        });

        const isAdmin = user.role === "admin";

        return res.status(200).json({
            id: user._id,
            mail: user.mail,
            role: user.role,
            accessToken: token,
            isAdmin: isAdmin
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export async function createUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.create(req.body as object)
        return res.status(200).json(user)
    } catch(e){
        return res.status(500).json({ e: 'Failed to create user' });
    }
}

export async function updateUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.update(req.params.id,req.body as object)
        return res.status(200).json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to update user' });
    }
}

export async function deleteUser(req:Request,res:Response):Promise<Response> {
    try{
        const user:usersInterface|null = await userServices.getEntries.delete(req.params.id)
        return res.json(user);
    } catch(e){
        return res.status(500).json({ e: 'Failed to delete user' });
    }
}



