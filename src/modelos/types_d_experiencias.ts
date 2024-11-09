import { ObjectId, model, Schema } from "mongoose";

export interface experienciasInterface{
    owner: ObjectId,
    participants: ObjectId[],
    description: string,
    tipo: string,
    habilitado: boolean
}

export const experienciasSchema = new Schema<experienciasInterface>({
    owner: {type: Schema.Types.ObjectId, ref:'user'},
    participants: [{type: Schema.Types.ObjectId, ref:'user'}],
    description: String,
    tipo: String,
    habilitado: Boolean
})

export const experienciasofDB = model<experienciasInterface>('experiencias',experienciasSchema)