import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';

import multer from 'multer';
import multerConfig from './config/multer';

const router = Router();
const upload = multer(multerConfig)

router.get('/orphanages', OrphanagesController.index);
router.get('/orphanages/:id', OrphanagesController.show);
router.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default router;