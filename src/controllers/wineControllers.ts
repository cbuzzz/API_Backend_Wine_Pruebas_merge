import { wineInterface } from '../modelos/types_d_wine'
import * as wineServices from '../services/wineServices'
import { Request, Response } from 'express'

export async function findAllWine(_req:Request,res:Response):Promise<Response> {
    try{
        const wine:wineInterface[]|null = await wineServices.getEntries.getAll()
        return res.json(wine);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find all user' });
    }
}

export async function findWine(req:Request,res:Response):Promise<Response> {
    try{
        const wine:wineInterface|null = await wineServices.getEntries.findById(req.params.id)
        return res.json(wine);
    } catch(e){
        return res.status(500).json({ e: 'Failed to find user' });
    }
}

export async function createWine(req:Request,res:Response):Promise<Response> {
    try{
        const wine:wineInterface|null = await wineServices.getEntries.create(req.body as object)
        return res.status(200).json(wine)
    } catch(e){
        return res.status(500).json({ e: 'Failed to create user' });
    }
}

export async function updateWine(req:Request,res:Response):Promise<Response> {
    try{
        const wine:wineInterface|null = await wineServices.getEntries.update(req.params.id,req.body as object)
        return res.status(200).json(wine);
    } catch(e){
        return res.status(500).json({ e: 'Failed to update user' });
    }
}

export async function deleteWine(req:Request,res:Response):Promise<Response> {
    try{
        const wine:wineInterface|null = await wineServices.getEntries.delete(req.params.id)
        return res.json(wine);
    } catch(e){
        return res.status(500).json({ e: 'Failed to delete user' });
    }
}

export async function toggleHabilitacionWine(req: Request, res: Response): Promise<Response> {
    try {
        const { habilitado } = req.body;  // Obtener el nuevo estado de habilitación del cuerpo de la petición
        
        if (typeof habilitado !== 'boolean') {
            return res.status(400).json({ message: 'El campo habilitado debe ser un valor booleano' });
        }

        // Actualizar el campo habilitado del usuario
        const wine = await wineServices.getEntries.update(req.params.id, { habilitado });

        if (wine) {
            return res.status(200).json(wine);
        } else {
            return res.status(404).json({ message: 'Wine no encontrado' });
        }
    } catch (e) {
        return res.status(500).json({ e: 'Failed to update wine habilitation' });
    }
}