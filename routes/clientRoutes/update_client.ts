import express from 'express';
import updateClientValidator from '../../middleware/clientMiddleware/updateClientValidator';
import updateClientController from '../../controllers/clientControllers/update-client-controller';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';
import verifyToken from '../../middleware/verifyToken';


const router = express.Router();

router.put('/:id_cliente', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), updateClientValidator.validatorParams, updateClientValidator.validator , updateClientController);

export default router;