const urlService=require("../service/urlService");


async function createShortUrl(req, res) {
    const data=await urlService.createShortUrl(req.body)
    return res.status(201).json(data);
}

async function redirectUrl(req, res) {
   const longUrl= await urlService.redirectUrl(req.params);
   return res.redirect(longUrl)
}

module.exports = {
    createShortUrl,
    redirectUrl
};