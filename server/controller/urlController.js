const {nanoid}=require("nanoid");
const {Url}=require("../model/Url");
const {client}=require("../cache/redisCache");
const { json } = require("express");
const {generateQRcode}=require("../utils/generateQRcode");
const dotenv=require("dotenv");
const {asyncHandler}=require("../utils/asycnHandler");

const baseUrl=process.env.BASE_URL
const cacheTTL=Number(process.env.CACHE_TTL)


const createShortUrl=asyncHandler(async(req,res)=>{
  const {longUrl,customUrl}=req.body;
    if(!longUrl){
        return res.status(400).json({msg:"url not provided"});
    }

    let shortId;

    if(customUrl){
        const exists=await Url.findOne({shortId:customUrl});
        if(exists){
            return res.status(409).json({msg:"this id in use send another"})
        }
        shortId=customUrl;
        }else{
       shortId=nanoid(8);

    }
        const qrcode=await generateQRcode(`${baseUrl}/${shortId}`);
        await Url.create({longUrl,shortId});
        return res.status(201).json({
            shortUrl:`${baseUrl}/${shortId}`,
            custom:customUrl?true:false,
            qrcode,
        });
}) 

async function redirectUrl(req,res) {
    const {shortId}=req.params;
    const cashed=await client.get(shortId);
    if(cashed){
        console.log("returned from redis");
        return res.redirect((cashed));
    }
    const url=await Url.findOne({shortId});
    if(!url){
        return res.status(404).json({msg:"unable to find url"})
    }
    console.log(url);
    await client.set(shortId,url.longUrl,{
        EX:cacheTTL,
    })
    url.clicks+=1;
    await url.save();
    console.log("return from db")
    return res.redirect(url.longUrl);
}

module.exports={createShortUrl,redirectUrl};