import express from 'express';
import getClientsController from '../../controllers/clientControllers/get-clients-controller';
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';

const router = express.Router();

router.get('/', verifyToken, checkRoleAndPermission(["ADMINISTRADOR","COLABORADOR"]), getClientsController);


export default router;