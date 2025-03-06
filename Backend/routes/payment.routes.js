import {Router} from "express";
import { confirmPayment, createPayment } from "../controllers/payments.controllers.js";

const router = Router();

router.route('/create-payment').post(createPayment);

// confirm payments
router.route('/confirm-payment').get(confirmPayment);

export default router;