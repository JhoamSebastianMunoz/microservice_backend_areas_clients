import express from 'express';
import getClientValidator from '../../middleware/clientMiddleware/getClientValidator';
import getClientController from '../../controllers/clientControllers/get-client-controller';
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';



const router = express.Router();

router.get('/:id_cliente', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), getClientValidator.validatorParams, getClientValidator.validator, getClientController);


export default router;