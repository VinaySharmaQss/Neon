import { Router } from "express";
import userRouter from "./user.routes.js";
import placesRouter from "./places.routes.js";
import cuisnesRouter from "./cusines.routes.js";
import reviewRouter from "./review.routes.js";
import  payementRouter from "./payment.routes.js";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/places", placesRouter);
router.use("/api/v1/cuisines", cuisnesRouter);
router.use("/api/v1/reviews", reviewRouter);
router.use("/api/v1/payments", payementRouter);

export default router;
