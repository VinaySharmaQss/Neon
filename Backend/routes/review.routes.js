import {Router} from "express";
import { createReview, getAllReviews, getReviewByCusineId, getReviewByPlaceId, getReviewByUserId } from "../controllers/modal.controllers.js";

const router = Router();

// create a review
router.route("/create").post(createReview);

//get all reviews
router.route("/all").get(getAllReviews);

// get all review by place id
router.route("/place/:placeId").get(getReviewByPlaceId);

// get all review by cusine id
router.route("/cusine/:cusineId").get(getReviewByCusineId);

// get all review by user id
router.route("/user/:userId").get(getReviewByUserId);

export default router;
