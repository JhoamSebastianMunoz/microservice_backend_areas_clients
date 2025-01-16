import express from "express";
import deleteClientValidator from '../../middleware/clientMiddleware/deleteClientValidator';
import deleteClientController from "../../controllers/clientControllers/delete-client-controller";


const router = express.Router();

router.delete('/:id_cliente',deleteClientValidator.validatorParams,deleteClientValidator.validator,deleteClientController);

export default router;