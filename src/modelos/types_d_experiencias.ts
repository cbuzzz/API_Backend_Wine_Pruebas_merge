import { model, Schema } from "mongoose";

export interface experienciasInterface{
    owner: string,
    participants: string[],
    description: string,
    tipo: string,
    habilitado: boolean
}

export const experienciasSchema = new Schema<experienciasInterface>({
    owner: String,
    participants: [String],
    description: String,
    tipo: String,
    habilitado: Boolean
})

export const experienciasofDB = model<experienciasInterface>('experiencias',experienciasSchema)