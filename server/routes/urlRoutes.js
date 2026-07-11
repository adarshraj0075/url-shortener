const express=require("express");
const {createShortUrl,redirectUrl}=require("../controller/urlController");
const {rateLimiter}=require("../middleware/rateLimiter");
const {asyncHandler}=require("../utils/asycnHandler");

const router=express.Router()

router.post("/shorten",rateLimiter,asyncHandler(createShortUrl));
router.get("/:shortId",redirectUrl);

module.exports={router};