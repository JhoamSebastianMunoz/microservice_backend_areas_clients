import express from 'express';
import getAreaValidator from '../../middleware/areaMiddleware/getAreaValidator';
import getAreaController from '../../controllers/areaControllers/get-area-controller';
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';



const router = express.Router();

router.get('/:id_zona_de_trabajo', verifyToken, checkRoleAndPermission(["ADMINISTRADOR","COLABORADOR"]), getAreaValidator.validatorParams, getAreaValidator.validator, getAreaController);


export default router;