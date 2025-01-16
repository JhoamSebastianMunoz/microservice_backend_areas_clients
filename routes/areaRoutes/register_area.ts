import express from "express";
import registerAreaValidator from '../../middleware/areaMiddleware/registerAreaValidator';
import registerAreaController from '../../controllers/areaControllers/register-area-controller';


const router = express.Router();


router.post('/', registerAreaValidator.validatorParams, registerAreaValidator.validator, registerAreaController );


export default router;