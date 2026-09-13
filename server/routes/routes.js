const express=require("express");
const {createShortUrl,redirectUrl}=require("../controller/urlController");
const {rateLimiter}=require("../middleware/rateLimiter");
const {asyncHandler}=require("../utils/asycnHandler");
const { validate } = require("../middleware/validate");
const { registerSchema,loginSchema } = require("../validator/auth.validator");

const { register,login } = require("../controller/authController");

const { authMiddleware } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/shorten",rateLimiter,asyncHandler(authMiddleware),asyncHandler(createShortUrl));
router.get("/:shortId",asyncHandler(redirectUrl));

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