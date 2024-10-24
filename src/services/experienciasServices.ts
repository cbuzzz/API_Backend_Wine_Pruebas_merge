import { experienciasInterface, experienciasofDB } from "../modelos/types_d_experiencias";

export const getEntries = {
    getAll: async()=>{
    return await experienciasofDB.find().populate('owner').populate('participants');
    },
    findById: async(id:string)=>{
        return await experienciasofDB.findById(id);
    },
    findUserById: async(id:string)=>{
        return await experienciasofDB.findById(id).populate('owner').populate('participants');
    },
    addParticipant: async(idExp:string,idPart:string)=>{
        return await experienciasofDB.findByIdAndUpdate(idExp,{$addToSet:{participants:idPart}});
    },
    delParticipant: async(idExp:string,idPart:string)=>{
        return await experienciasofDB.findByIdAndUpdate(idExp,{$pull:{participants:idPart}});
    },
    create: async(entry:object)=>{
        return await experienciasofDB.create(entry);
    },
    update: async(id:string,body:object)=>{
        console.log(body);
        return await experienciasofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    findByOwnerandUpdate: async(id:string,body:object): Promise<experienciasInterface | null>=>{
        return await experienciasofDB.findOneAndUpdate({owner:id},body).exec();
    },
    delete: async(id:string)=>{
        return await experienciasofDB.findByIdAndDelete(id);
    },
    findByOwnerandDelete: async(id:string): Promise<experienciasInterface | null>=>{
        return await experienciasofDB.findOneAndDelete({owner:id}).exec();
    }
}