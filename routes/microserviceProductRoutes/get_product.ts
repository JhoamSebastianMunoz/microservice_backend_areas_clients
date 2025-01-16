import express from 'express';
import getProductValidator from '../../middleware/microserviceProductMiddleware/getProductValidator';
import getProductController from '../../controllers/microserviceProductControllers/get-product-controller';



const router = express.Router();

router.get('/:id_producto',getProductValidator.validatorParams, getProductValidator.validator, getProductController);


export default router;