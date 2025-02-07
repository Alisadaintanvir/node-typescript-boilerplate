import {Router} from "express";

import withErrorHandling from "@/utility/withErrorHandling";
import {getUser} from "./user.controller";

const router = Router();

router.get("/", withErrorHandling(getUser)); //GET /admin/user

export default router;