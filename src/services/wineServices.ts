import { wineInterface, wineofDB } from '../modelos/types_d_wine'
//import userData from './users.json'

export const getEntries = {
    getAll: async(): Promise<wineInterface[]>=>{
        return await wineofDB.find();
    },
    findById: async(id:string): Promise<wineInterface | null>=>{
        return await wineofDB.findById(id);
    },
    create: async(entry:object): Promise<wineInterface>=>{
        return await wineofDB.create(entry);
    },
    update: async(id:string,body:object): Promise<wineInterface | null>=>{
        return await wineofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    findByOwnerandUpdate: async(id:string,body:object): Promise<wineInterface | null>=>{
        return await wineofDB.findOneAndUpdate({owner:id},body).exec();
    },
    delete: async(id:string): Promise<wineInterface | null>=>{
        return await wineofDB.findByIdAndDelete(id);
    }
}