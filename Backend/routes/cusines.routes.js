import {Router} from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { createCuisine } from "../controllers/cuisines.controllers.js";

const router = Router();

router.route("/create").post(upload.single("logo"), createCuisine);

// Get all cards
// router.route("/all").get(getAllPlaces);
// // Get the single card
// router.route("/:id").get(getPlaceById);



// // Update the card
// router.route("/:id").put(updatePlace);


export default router;