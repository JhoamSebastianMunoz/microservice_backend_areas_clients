import express from "express";
import clientCreationRequestMiddleware from "../../middleware/clientCreationRequestMiddleware/clientCreationRequestMiddleware";
import requestCreateClient from "../../controllers/clientCreationRequestController/requestCreateClient";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import verifyToken from "../../middleware/verifyToken";


const router = express.Router();


router.post('/', verifyToken, checkRoleAndPermission(["COLABORADOR"]), clientCreationRequestMiddleware.validatorParams, clientCreationRequestMiddleware.validator, requestCreateClient);


export default router;