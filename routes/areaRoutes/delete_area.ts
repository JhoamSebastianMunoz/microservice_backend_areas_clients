import express from "express";
import deleteAreaValidator from '../../middleware/areaMiddleware/deleteAreaValidator';
import deleteAreaController from "../../controllers/areaControllers/delete-area-controller";


const router = express.Router();

router.delete('/:id_zona_de_trabajo', deleteAreaValidator.validatorParams, deleteAreaValidator.validator, deleteAreaController);

export default router;