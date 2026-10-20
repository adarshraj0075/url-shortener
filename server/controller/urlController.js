const urlService=require("../service/urlService");
const apiResponse=require("../utils/apiResponse")

async function createShortUrl(req, res) {
    const data=await urlService.createShortUrl(req.body,req.user.id);
    return res.status(201).json(apiResponse.success(data));
}

async function redirectUrl(req, res) {
   const longUrl= await urlService.redirectUrl(req.params);
   return res.redirect(longUrl)
}

async function getMyUrls(req,res){
    const myUrls=await urlService.getMyUrls(req.user.id);
    return res.status(200).json(apiResponse.success(myUrls))
}

module.exports = {
    createShortUrl,
    redirectUrl,
    getMyUrls
};