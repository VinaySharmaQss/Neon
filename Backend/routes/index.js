import { Router } from "express";
import userRouter from "./user.routes.js";
import placesRouter from "./places.routes.js";
import cuisnesRouter from "./cusines.routes.js";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/places", placesRouter);
router.use("/api/v1/cuisines", cuisnesRouter);

export default router;
