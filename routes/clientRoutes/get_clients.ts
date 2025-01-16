import express from 'express';
import getClientsController from '../../controllers/clientControllers/get-clients-controller';

const router = express.Router();

router.get('/', getClientsController);


export default router;