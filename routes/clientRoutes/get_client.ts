import express from 'express';
import getClientValidator from '../../middleware/clientMiddleware/getClientValidator';
import getClientController from '../../controllers/clientControllers/get-client-controller';



const router = express.Router();

router.get('/:id_cliente',getClientValidator.validatorParams, getClientValidator.validator, getClientController);


export default router;