import {Router} from 'express';
import * as bruxoController from './../controllers/bruxoController.js';

const router = Router();
router.get("/", bruxoController.listartodos);
router.get("/:id", bruxoController.listarUm);
router.post("/", bruxoController.criar);
router.delete("/:id", bruxoController.apagar);
router.put("/:id", bruxoController.atualizar);

export default router;