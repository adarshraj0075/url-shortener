const express=require("express");
const {createShortUrl,redirectUrl,getMyUrls}=require("../controller/urlController");
const {rateLimiter}=require("../middleware/rateLimiter");
const {asyncHandler}=require("../utils/asycnHandler");
const { validate } = require("../middleware/validate");
const { registerSchema,loginSchema } = require("../validator/auth.validator");

const { register,login,logout,logoutAll, } = require("../controller/authController");

const { authMiddleware } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/shorten",rateLimiter,asyncHandler(authMiddleware),asyncHandler(createShortUrl));
router.get("/shortId/:shortId",asyncHandler(redirectUrl));
router.get("/my-urls",asyncHandler(authMiddleware),asyncHandler(getMyUrls))

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(register)
);

router.post("/login",
    validate(loginSchema),
    asyncHandler(login)
)

router.post("/logout",asyncHandler(logout))
router.post("/logoutAll",asyncHandler(authMiddleware),asyncHandler(logoutAll))

module.exports={router};