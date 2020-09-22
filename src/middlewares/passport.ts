import {Strategy,ExtractJwt,StrategyOptions} from 'passport-jwt';
import config from '../config/config';
import Cliente from '../models/cliente';
import Vendedor from "../models/vendedor";

const   opts:StrategyOptions={
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done)=>{
    try {
        const cliente=await Cliente.findById(payload.id);
        const vendedor=await Vendedor.findById(payload.id);
    if(cliente){
        return done (null,cliente);
    }else if(vendedor){
        return done (null,vendedor); 
    }
    return done(null,false);
    } catch (error) {
        console.log(error);
    }
})