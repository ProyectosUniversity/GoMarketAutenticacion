import {Strategy,ExtractJwt,StrategyOptions} from 'passport-jwt';
import config from '../config/config';
import Cliente from '../models/cliente';

const   opts:StrategyOptions={
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done)=>{
    try {
        const cliente=await Cliente.findById(payload.id);
    if(cliente){
        return done (null,cliente);
    }
    return done(null,false);
    } catch (error) {
        console.log(error);
    }
})