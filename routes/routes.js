import { Router } from "express";
import controller from '../controllers/controller.js'

const router = Router();

router.get(`/favicon.ico`, controller.getFavicon);
router.get(`/`, controller.getIndex);
router.get(`/getCheckRefNo`, controller.getCheckRefNo);
router.post(`/add`, controller.getAdd);
router.post(`/delete`, controller.getDelete);

export default router;