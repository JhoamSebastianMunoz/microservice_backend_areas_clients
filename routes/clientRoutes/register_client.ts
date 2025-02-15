import express from "express";
import registerClientValidator from '../../middleware/clientMiddleware/registerClientValidator';
import registerClientController from '../../controllers/clientControllers/register-client-controller';
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";


const router = express.Router();


router.post('/', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), registerClientValidator.validatorParams, registerClientValidator.validator, registerClientController);


export default router;