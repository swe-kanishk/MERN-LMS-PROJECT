import { Router } from "express";
import {
  paymentApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from "../controllers/paymentControllers.js";
import { isLoggedIn, authorizedRoles } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/payment-key")
    .get(isLoggedIn, paymentApiKey);

router.route("/subscribe")
    .post(isLoggedIn, buySubscription);

router.route("/verify")
    .post(isLoggedIn, verifySubscription);

router.route("/unsubscribe")
    .post(isLoggedIn, cancelSubscription);

router.route("/")
    .get(isLoggedIn, authorizedRoles('ADMIN'), allPayments);

export default router;