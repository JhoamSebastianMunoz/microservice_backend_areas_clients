import express from "express";
import get_clientArea from "../../controllers/microserviceUserController/get_clientArea";

const router = express.Router();


router.get('/:id_area', get_clientArea);


export default router;