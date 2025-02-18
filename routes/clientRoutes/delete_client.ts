import express from "express";
import deleteClientValidator from '../../middleware/clientMiddleware/deleteClientValidator';
import deleteClientController from "../../controllers/clientControllers/delete-client-controller";
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";


const router = express.Router();

router.delete('/:id_cliente', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), deleteClientValidator.validatorParams,deleteClientValidator.validator,deleteClientController);

export default router;