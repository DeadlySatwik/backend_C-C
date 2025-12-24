import { Router } from "express";
import { regigterUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(regigterUser);

export default router;