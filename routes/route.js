import { Router } from "express";
import { body, check } from "express-validator";
import auth from "../middleware/auth.js";
const router = Router();
import { shortUrl, getUrl } from "../controller/urlController/shortener.js";
import { login, signup } from "../controller/auth.js";

//TODO:add validation array in separate file
const val = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isAlphanumeric().withMessage("password should alpha-numeric").isLength({ min: 5 }).withMessage("Invalid password length"),
    check("userName").isAlphanumeric().withMessage("username should be alpha-numeric").isLength({ min: 3 }).withMessage("Invalid password length").withMessage("Username should only contain lowercase letters"),
    body("userName"),
]

router.post("/url", auth, shortUrl);
router.get("/:urlId", getUrl);
router.post("/login", login);
//TODO:add password validation
/*
body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    */

router.post(
    "/signup",
    val
    ,
    signup
);

export default router;
