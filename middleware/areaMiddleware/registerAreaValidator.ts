import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

let validatorParams = [
    check('nombre_zona_trabajo').isLength({ min: 1, max: 45}).withMessage('Ingrese un nombre para la zona de trabajo con mínimo 1 caracter').bail(),
    check('descripcion').isLength({  max: 255 }).withMessage('La descripción debe tener máximo 255 caracteres.').optional(),
    ];
    
    function validator(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    };
    
    export default {
    validatorParams,
    validator
};