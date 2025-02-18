import express from 'express';
import getDataClient from '../../middleware/microservicePresaleMiddleware/getDataCliente';
import get_dataClien from '../../controllers/microservicePresaleControllers/getDataClientController';



const router = express.Router();

router.get('/:id_client',getDataClient.validatorParams, getDataClient.validator, get_dataClien);


export default router;