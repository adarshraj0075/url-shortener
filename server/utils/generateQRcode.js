const QRCode=require("qrcode");

const generateQRcode=async(url)=>{
    try {
        return await QRCode.toDataURL(url);
    } catch (error) {
        console.log(`error getting qr ${error}`);
    }
}

module.exports={generateQRcode};