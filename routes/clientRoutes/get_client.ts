import express from 'express';
import getClientValidator from '../../middleware/clientMiddleware/getClientValidator';
import getClientController from '../../controllers/clientControllers/get-client-controller';
import verifyToken from '../../middleware/verifyToken';



const router = express.Router();

router.get('/:id_cliente', getClientValidator.validatorParams, getClientValidator.validator, getClientController);


export default router;