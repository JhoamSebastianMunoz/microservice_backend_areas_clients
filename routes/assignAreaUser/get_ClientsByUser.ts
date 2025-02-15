import express from "express";
import verifyToken from "../../middleware/verifyToken";
import checkRoleAndPermission from "../../middleware/checkRoleAndPermission";
import getClientsByUser from '../../controllers/assignAreaUserController/get_ClientsByUser'


const router = express.Router();


router.get('/:id_usuario/:id_zona', verifyToken, getClientsByUser);


export default router;