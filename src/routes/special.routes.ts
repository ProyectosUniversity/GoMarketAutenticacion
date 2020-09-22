import {Router} from 'express';
const router= Router();

import passport from 'passport';

router.get('/special',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send('Satisfactorio');
});
//passportVendedor.authenticate('jwt',{session:false}
router.get('/special2',passport.authenticate('jwtVendedor',{session:false}),(req,res)=>{
    res.send('Satisfactorio');
});

export default router;