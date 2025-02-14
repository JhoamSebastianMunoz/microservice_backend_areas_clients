import express from "express";
import deleteAreaValidator from '../../middleware/areaMiddleware/deleteAreaValidator';
import deleteAreaController from "../../controllers/areaControllers/delete-area-controller";
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";


const router = express.Router();

router.delete('/:id_zona_de_trabajo', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), deleteAreaValidator.validatorParams, deleteAreaValidator.validator, deleteAreaController);

export default router;