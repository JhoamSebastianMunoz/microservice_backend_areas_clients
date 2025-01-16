import express from 'express';
import updateAreaValidator from '../../middleware/areaMiddleware/updateAreaValidator';
import updateAreaController from '../../controllers/areaControllers/update-area-controller';


const router = express.Router();

router.put('/:id_zona_de_trabajo', updateAreaValidator.validatorParams, updateAreaValidator.validator , updateAreaController);

export default router;