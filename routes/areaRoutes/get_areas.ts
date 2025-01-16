import express from 'express';
import getAreasController from '../../controllers/areaControllers/get-areas-controller';

const router = express.Router();

router.get('/', getAreasController);


export default router;