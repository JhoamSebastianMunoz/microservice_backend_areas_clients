import express from 'express';
import getAreasController from '../../controllers/areaControllers/get-areas-controller';
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';

const router = express.Router();

router.get('/', verifyToken, checkRoleAndPermission(["ADMINISTRADOR","COLABORADOR"]), getAreasController);


export default router;

