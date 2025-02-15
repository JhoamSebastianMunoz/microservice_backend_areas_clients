import express from "express";
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import get_areasByUser from "../../controllers/assignAreaUserController/get_areasByUser";


const router = express.Router();


router.get('/:id_usuario', verifyToken,checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), get_areasByUser);


export default router;