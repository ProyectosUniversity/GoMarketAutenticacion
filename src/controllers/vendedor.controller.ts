import {Request, Response, request} from 'express';
import Vendedor,{IVendedor} from '../models/vendedor';
import jwt from 'jsonwebtoken';
import config from '../config/config'; 

//Crear token
function crearToken(vendedor: IVendedor) {
    return jwt.sign({id: vendedor.id,email: vendedor.email},config.jwtSecret,{
        expiresIn:8640
    });
}

//Registro
export const registro= async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.nombre || !req.body.codigo || !req.body.puesto || !req.body.email || !req.body.password){
        return res.status(400).json({msg:'Por favor, llene todos sus datos correctamente.'})
    }
    
    const vendedor=await Vendedor.findOne({email: req.body.email});
    console.log(vendedor);   
    if(vendedor){
        return res.status(400).json({msg: "El usuario ya existe."});
    }

    const nuevovendedor= new Vendedor(req.body);
    await nuevovendedor.save();

    return res.status(201).json(nuevovendedor);
}

//Login
export const login=async (req: Request, res: Response)=>{
   if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:'Por favor, coloca un correo y una contraseña.'})
    }

    const vendedor =await Vendedor.findOne({email: req.body.email});

    if(!vendedor){
        return res.status(400).json({msg: 'El usuario ya esta existe'});
    }

    const isMatch= await vendedor.comparePassword(req.body.password) 

    if(isMatch){
        return res.status(200).json({token: crearToken(vendedor)});
    }

    return res.status(400).json({
        msg: "El correo o la contraseña som incorrectas."
    });
}