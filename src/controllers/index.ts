import { Router } from 'express';

import helloRouter from './hello';

const router: Router = Router();
router.use('/', helloRouter);

export default router;
