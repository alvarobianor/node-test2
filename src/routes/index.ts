import { Router } from 'express';
import userR from './systemRoutes/user.route';
import adminR from './systemRoutes/admin.route';

const router = Router();
router.use('/', userR);
router.use('/admin', adminR);
// router.use("/", (req, res) => res.json({ message: "root" }));

export default router;
