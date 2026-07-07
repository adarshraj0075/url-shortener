const express=require("express");
const {createShortUrl,redirectUrl}=require("../controller/urlController");
const {rateLimiter}=require("../middleware/rateLimiter");

const router=express.Router()

router.post("/shorten",rateLimiter,createShortUrl);
router.get("/:shortId",redirectUrl);

module.exports={router};