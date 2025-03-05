import { Router } from "express";
import userRouter from "./user.routes.js";
import placesRouter from "./places.routes.js";
import cuisnesRouter from "./cusines.routes.js";
import reviewRouter from "./review.routes.js";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/places", placesRouter);
router.use("/api/v1/cuisines", cuisnesRouter);
router.use("/api/v1/reviews", reviewRouter);

export default router;
