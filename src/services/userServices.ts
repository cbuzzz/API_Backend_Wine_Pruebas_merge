import { usersInterface, usersofDB } from '../modelos/types_d_users'
//import userData from './users.json'

export const getEntries = {
    getAll: async(num1:number,num2:number): Promise<usersInterface[]>=>{
        const rnum=num1*num2;
        return await usersofDB.aggregate([
            {$skip:rnum},
            {$limit:num2}
        ]);
    },
    findById: async(id:string): Promise<usersInterface | null>=>{
        return await usersofDB.findById(id);
    },
    findIdAndPassword: async(name:string,password:string): Promise<usersInterface | null>=>{
        // Si falla quitar el name:name por name, pero no deberia.
        return await usersofDB.findOne({name:name}).exec()
        .then(userResponse=>{
            if (userResponse == null || userResponse.password != password){
                return null;
            } else {
                return userResponse;
            }
        });
    },
    findIdByName: async (name: string): Promise<string | null> => {
        return await usersofDB.findOne({ name: name }).exec()
            .then(userResponse => {
                if (userResponse == null) {
                    return null;
                } else {
                    return userResponse._id.toString();
                }
            })
            .catch(error => {
                console.error('Error al buscar el usuario por nombre:', error);
                return null;
            });
    },
    create: async(entry:object): Promise<usersInterface>=>{
        return await usersofDB.create(entry);
    },
    update: async (id: string, body: object): Promise<usersInterface | null> => {
        console.log("Update Body:", body); // Muestra el contenido de body para verificar qué datos se están pasando
        return await usersofDB.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    },
    
    delete: async(id:string): Promise<usersInterface | null>=>{
        return await usersofDB.findByIdAndDelete(id);
    }
}