import express from "express";
import clientCreationRequestMiddleware from "../../middleware/clientCreationRequestMiddleware/clientCreationRequestMiddleware";
import requestCreateClient from "../../controllers/clientCreationRequestController/requestCreateClient";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import verifyToken from "../../middleware/verifyToken";
import get_pendingRequestClients from "../../controllers/clientCreationRequestController/getPendingRequests";


const router = express.Router();


router.get('/', verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), get_pendingRequestClients);


export default router;