import {Router} from 'express';
import * as bruxoController from './../controllers/bruxoController.js';

const router = Router();
router.get("/", bruxoController.listartodos);
router.get("/:id", bruxoController.listarUm);

export default router;