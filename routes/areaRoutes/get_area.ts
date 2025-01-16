import express from 'express';
import getAreaValidator from '../../middleware/areaMiddleware/getAreaValidator';
import getAreaController from '../../controllers/areaControllers/get-area-controller';



const router = express.Router();

router.get('/:id_zona_de_trabajo', getAreaValidator.validatorParams, getAreaValidator.validator, getAreaController);


export default router;