import {Router} from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { createPlace, getAllPlaces, getPlaceById, updatePlace } from "../controllers/places.controllers.js";
const router = Router();

router.route("/create").post(upload.fields([{ name:"mainImage"},{ name:"footerLogo"}]),createPlace);

// Get all cards
router.route("/all").get(getAllPlaces);
// Get the single card
router.route("/:id").get(getPlaceById);



// Update the card
router.route("/:id").put(updatePlace);


export default router;