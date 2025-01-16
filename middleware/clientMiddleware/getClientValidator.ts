import {check, validationResult} from  'express-validator';
import {Request,Response, NextFunction} from 'express';

let validatorParams =[
    check('id_cliente').isLength({ min: 1 })
    .isNumeric().withMessage('Ingrese un número de id valido').bail()
];

function validator(req:Request,res:Response,next:NextFunction){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    next();
};

export default {
    validatorParams,
    validator
};