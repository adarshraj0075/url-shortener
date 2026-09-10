const express=require("express");
const {createShortUrl,redirectUrl}=require("../controller/urlController");
const {rateLimiter}=require("../middleware/rateLimiter");
const {asyncHandler}=require("../utils/asycnHandler");
const { validate } = require("../middleware/validate");
const { registerSchema } = require("../validator/auth.validator");
const { loginSchema } = require("../validator/auth.validator")
const { register } = require("../controller/authController");
const { login } = require("../controller/authController")
const router=express.Router()

router.post("/shorten",rateLimiter,asyncHandler(createShortUrl));
router.get("/:shortId",redirectUrl);

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(register)
);

router.post("/login",
    validate(loginSchema),
    asyncHandler(login)
)

module.exports={router};