const { nanoid } = require("nanoid");

const { Url } = require("../model/Url");
const { client } = require("../cache/redisCache");

const { generateQRcode } = require("../utils/generateQRcode");

const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");

const baseUrl = process.env.BASE_URL;
const cacheTTL = Number(process.env.CACHE_TTL);

async function createShortUrl(req, res) {
    const { longUrl, customUrl } = req.body;

    // ❌ Remove this if Zod already validates longUrl
    // if (!longUrl) {
    //     throw new BadRequestError("URL not provided.");
    // }

    let shortId;

    if (customUrl) {
        const exists = await Url.findOne({
            shortId: customUrl
        });

        if (exists) {
            throw new ConflictError(
                "Custom URL is already in use."
            );
        }

        shortId = customUrl;
    } else {
        shortId = nanoid(8);
    }

    // Critical operation first
    await Url.create({
        longUrl,
        shortId
    });

    // Derived operation afterwards
    const qrcode = await generateQRcode(
        `${baseUrl}/${shortId}`
    );

    return res.status(201).json({
        shortUrl: `${baseUrl}/${shortId}`,
        custom: Boolean(customUrl),
        qrcode
    });
}

async function redirectUrl(req, res) {
    const { shortId } = req.params;

    const cachedUrl = await client.get(shortId);

    if (cachedUrl) {
        console.log("Returned from Redis");

        return res.redirect(cachedUrl);
    }

    const url = await Url.findOne({
        shortId
    });

    if (!url) {
        throw new NotFoundError("Short URL not found.");
    }

    await client.set(shortId, url.longUrl, {
        EX: cacheTTL
    });

    url.clicks += 1;
    await url.save();

    console.log("Returned from MongoDB");

    return res.redirect(url.longUrl);
}

module.exports = {
    createShortUrl,
    redirectUrl
};