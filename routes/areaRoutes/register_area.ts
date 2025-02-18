import express from "express";
import registerAreaValidator from '../../middleware/areaMiddleware/registerAreaValidator';
import registerAreaController from '../../controllers/areaControllers/register-area-controller';
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";


const router = express.Router();


router.post('/', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), registerAreaValidator.validatorParams, registerAreaValidator.validator, registerAreaController );


export default router;