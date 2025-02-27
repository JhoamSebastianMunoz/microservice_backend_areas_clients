import express from "express";
import get_dataArea from "../../controllers/microserviceUserController/get_dataArea";

const router = express.Router();


router.get('/:id_area', get_dataArea);


export default router;