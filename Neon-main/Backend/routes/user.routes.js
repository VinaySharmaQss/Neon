import {Router} from "express";
import { acceptUser, completedPlaces, getAllAcceptedByUserId, getCompletedPlaces, getInterest, getUserById, Login, Logout, removeAcceptedPlace, SignUp, updateUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import auth from "../middlewares/auth.middlewares.js"
import { sendNotifications } from "../controllers/sendNotifications.controllers.js";
const router = Router();

router.route("/notification").post(sendNotifications);
router.route("/signup").post(upload.single("Image"),SignUp); //signup route
router.route("/login").post(Login); //login route
router.route("/logout").post(auth,Logout)
router.route("/:id").get(getUserById);
router.route("/update/:id").put(upload.single("Image"),updateUser);
router.route("/allAccepted/:userId").get(getAllAcceptedByUserId);
router.route("/interest/:id").get(getInterest);
router.route("/completed/:id").post(completedPlaces);//completed places
router.route("/completed/:id").get(getCompletedPlaces);//completed places
router.route('/accepted').put(acceptUser);//accept user
router.route("/removeAccepted").delete(removeAcceptedPlace);//accept user

export default router;
