import express from 'express';
import updateClientValidator from '../../middleware/clientMiddleware/updateClientValidator';
import updateClientController from '../../controllers/clientControllers/update-client-controller';


const router = express.Router();

router.put('/:id_cliente',updateClientValidator.validatorParams, updateClientValidator.validator , updateClientController);

export default router;