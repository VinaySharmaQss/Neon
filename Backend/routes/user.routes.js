import {Router} from "express";
import { getUserById, Login, Logout, SignUp, updateUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import auth from "../middlewares/auth.middlewares.js"
const router = Router();

router.route("/signup").post(upload.single("Image"),SignUp); //signup route
router.route("/login").post(Login); //login route
router.route("/logout").post(auth,Logout)
router.route("/:id").get(getUserById);
router.route("/update/:id").put(upload.single("Image"),updateUser);

export default router;
