import express from "express";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import verifyToken from "../../middleware/verifyToken";
import acceptOrRejectController from "../../controllers/clientCreationRequestController/acceptOrRejectController";


const router = express.Router();


router.put('/:id_client', verifyToken, checkRoleAndPermission(["ADMINISTRADOR","COLABORADOR"]), acceptOrRejectController);


export default router;