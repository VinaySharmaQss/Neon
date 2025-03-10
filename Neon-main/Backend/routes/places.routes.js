import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  addToFavourite,
  addViewedPlace,
  createPlace,
  getAllFavouritePlaces,
  getAllPlaces,
  getAllReviewsofPlaces,
  getPlaceById,
  getViewedPlaces,
  removeFromFaviourate,
  updatePlace,
} from "../controllers/places.controllers.js";
const router = Router();

router
  .route("/create")
  .post(
    upload.fields([{ name: "mainImage" }, { name: "footerLogo" }]),
    createPlace
  );

// Get all cards
router.route("/all").get(getAllPlaces);
// Get the single card
router.route("/event-details/:id").get(getPlaceById);

router.route("/addToFavourite").post(addToFavourite);

router.route("/addToviewed").post(addViewedPlace);

router.route("/getAllFavourite/:userId").get(getAllFavouritePlaces);

router.route("/removeFromFavourite").post(removeFromFaviourate);
// Update the card
router.route("/:id").put(updatePlace);

//get viewed places by the user
router.route("/viewed/:userId").get(getViewedPlaces);

// get all reviews by place id
 router.route("/reviews/:placeId").get(getAllReviewsofPlaces);

export default router;
