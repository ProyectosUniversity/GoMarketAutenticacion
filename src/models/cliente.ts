import {model,Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';
//Interfaz 
export interface ICliente extends Document{
   email: string,
   password: string,
   comparePassword: (password:string)=> Promise<boolean>
}
//Esquema de Clientes
const clienteSchema =new Schema({
    email: {
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required:true
    }
});
//Encriptar password
clienteSchema.pre<ICliente>('save',async function (next) {
    const cliente= this;
    if(!cliente.isModified('password')) return next();

   const salt= await bcrypt.genSalt(10);
   const hash= await bcrypt.hash(cliente.password, salt);
   cliente.password = hash;
   next();
});
//comparar si la contraseña ingresada es igual a la de la que esta en la BD
clienteSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
        return await  bcrypt.compare(password, this.password);  
};

export default model<ICliente>('Cliente',clienteSchema);