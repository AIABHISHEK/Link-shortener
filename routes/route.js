import { Router } from "express";
import { body, check, param } from "express-validator";
import auth from "../middleware/auth.js";
const router = Router();
import { shortUrl, getUrl, shortUrlCustom } from "../controller/urlController/shortener.js";
import { login, signup } from "../controller/auth.js";


//TODO:add validation array in separate file
const val = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isAlphanumeric().withMessage("password should alpha-numeric").isLength({ min: 5 }).withMessage("Invalid password length"),
    check("userName").isAlphanumeric().withMessage("username should be alpha-numeric").isLength({ min: 3 }).withMessage("Invalid password length").withMessage("Username should only contain lowercase letters"),
    body("userName"),
]

//get short url
router.post("/url", auth, [body("url").isURL().withMessage("Invalid url"), body("url").isLength({ min: 10, max: 1500 }).withMessage("Invalid url")], shortUrl);

// to get custom url 
router.post("/url-custom/", auth, [
    body("url").isURL().withMessage("Invalid url").isLength({ min: 10, max: 1500 }).withMessage("Invalid url"),
    body("urlId").matches(/^[a-zA-Z0-9_]+$/).withMessage("Custom url is Invalid urlId should conatin numbers alphabets or _ ")], shortUrlCustom);

// to redirect to url
router.get("/:urlId", [param("urlId").isAlphanumeric().withMessage("Invalid urlId").isLength({ min: 5, max: 15 }).withMessage("Invalid urlId")], getUrl);

router.post(
    "/signup",
    val
    ,
    signup
);

router.post("/login", login);
//TODO:add password validation
/*
body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    */



//TODO : add vaildation in getUrl params(urlId)
const pattern = /^[a-zA-Z0-9_]+$/;

function containsValidCharacters(input) {
    return pattern.test(input);
}

export default router;
