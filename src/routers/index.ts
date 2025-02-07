import {Router} from "express";

import appRouter from "@/modules/admin/app.router";

const router = Router();

router.use("/admin", appRouter);

export default router;
