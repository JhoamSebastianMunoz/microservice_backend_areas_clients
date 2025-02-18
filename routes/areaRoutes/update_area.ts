import express from 'express';
import updateAreaValidator from '../../middleware/areaMiddleware/updateAreaValidator';
import updateAreaController from '../../controllers/areaControllers/update-area-controller';
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';


const router = express.Router();

router.put('/:id_zona_de_trabajo', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), updateAreaValidator.validatorParams, updateAreaValidator.validator , updateAreaController);

export default router;