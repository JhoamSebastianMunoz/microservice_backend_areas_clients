import { check, validationResult, body } from 'express-validator';
import { NextFunction, Request, Response } from "express";

const validarParams = [
    check("id_usuario")
        .notEmpty().withMessage("El id del usuario es obligatorio")
        .isNumeric().withMessage("El id del usuario debe ser un número"),
    
    check("zonas")
        .isArray({ min: 1 }).withMessage("Debe enviar al menos una zona en la lista"),

    body("zonas.*") // Valida cada elemento dentro del array "zonas"
        .isNumeric().withMessage("Cada zona debe ser un número"),
];

    function validator(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    };
    
    export default {
    validarParams,
    validator
};
