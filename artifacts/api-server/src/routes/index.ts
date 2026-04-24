import { Router, type IRouter } from "express";
import healthRouter from "./health";
import checkoutRouter from "./checkout";
import adminAuthRouter from "./adminAuth";
import adminStatsRouter from "./adminStats";
import packagesRouter from "./packages";
import mediaRouter from "./media";
import trackRouter from "./track";

const router: IRouter = Router();

router.use(healthRouter);
router.use(checkoutRouter);
router.use(adminAuthRouter);
router.use(adminStatsRouter);
router.use(packagesRouter);
router.use(mediaRouter);
router.use(trackRouter);

export default router;
