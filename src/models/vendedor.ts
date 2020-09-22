import {model,Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';
//Interfaz 
export interface IVendedor extends Document{
   nombre: string,
   codigo: string,
   puesto: string,
   email: string,
   password: string,
   comparePassword: (password:string)=> Promise<boolean>
}
//Esquema de Vendedor
const vendedorSchema =new Schema({
    nombres: {
        type: String,
        required: true,
        trim:true
    },
    apellidos: {
        type:String,
        required:true,
        trim:true
    },
    codigo: {
        type: String,
        required: true,
        unique:true
    },
    puesto: {
        type: String,
        required: true,
        unique:true
    },
    correo: {
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true
    },
    contraseña: {
        type: String,
        required:true
    }
});
//Encriptar password
vendedorSchema.pre<IVendedor>('save',async function (next) {
    const vendedor= this;
    if(!vendedor.isModified('password')) return next();

   const salt= await bcrypt.genSalt(10);
   const hash= await bcrypt.hash(vendedor.password, salt);
   vendedor.password = hash;
   next();
});
//comparar si la contraseña ingresada es igual a la de la que esta en la BD
vendedorSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
        return await  bcrypt.compare(password, this.password);  
};

export default model<IVendedor>('Vendedor',vendedorSchema);