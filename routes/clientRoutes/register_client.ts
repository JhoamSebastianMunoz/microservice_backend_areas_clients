import express from "express";
import registerClientValidator from '../../middleware/clientMiddleware/registerClientValidator';
import registerClientController from '../../controllers/clientControllers/register-client-controller';


const router = express.Router();


router.post('/', registerClientValidator.validatorParams, registerClientValidator.validator, registerClientController);


export default router;