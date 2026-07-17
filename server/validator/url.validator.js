const {z} = require("zod")

const createShortUrlSchema=z.object({
  longUrl:z.string().trim().url(),
  customUrl:z.string().min(3).max(20).optional()  
})

module.exports = {
    createShortUrlSchema
};