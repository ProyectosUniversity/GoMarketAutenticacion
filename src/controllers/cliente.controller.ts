import {Request, Response, request} from 'express';
import Cliente,{ICliente} from '../models/cliente';
import jwt from 'jsonwebtoken';
import config from '../config/config'; 

//Crear token
function crearToken(cliente: ICliente) {
    return jwt.sign({id: cliente.id,email: cliente.email},config.jwtSecret,{
        expiresIn:8640
    });
}

//Registro
export const registro= async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.nombre ||!req.body.email || !req.body.password){
        return res.status(400).json({msg:'Por favor, llene todos sus datos correctamente.'})
    }
    
    const cliente=await Cliente.findOne({email: req.body.email});
    console.log(cliente);   
    if(cliente){
        return res.status(400).json({msg: "El usuario ya existe."});
    }

    const nuevoCliente= new Cliente(req.body);
    await nuevoCliente.save();

    return res.status(201).json(nuevoCliente);
}

//Login
export const login=async (req: Request, res: Response)=>{
   if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:'Por favor, coloca un correo y una contraseña.'})
    }

    const cliente =await Cliente.findOne({email: req.body.email});

    if(!cliente){
        return res.status(400).json({msg: 'El usuario no esta existe'});
    }

    const isMatch= await cliente.comparePassword(req.body.password) 

    if(isMatch){
        return res.status(200).json({token: crearToken(cliente)});
    }

    return res.status(400).json({
        msg: "El correo o la contraseña som incorrectas."
    });
}