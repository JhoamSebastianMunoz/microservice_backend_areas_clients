import express from "express";
import assign_AreaUser from "../../controllers/assignAreaUserController/post_AreaUser";
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import validarAsignacionZonas  from "../../middleware/assignAreaUserMiddleware/post_assignAreaUserValidator";


const router = express.Router();


router.post('/:id_usuario', verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), validarAsignacionZonas.validarParams, validarAsignacionZonas.validator, assign_AreaUser);


export default router;