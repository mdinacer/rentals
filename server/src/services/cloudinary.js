const cloudinary = require('cloudinary').v2;
const { createReadStream } = require('streamifier');

require('dotenv').config();

const cloudName = process.env.CLOUDINARY_CLOUDNAME;
const apiKey = process.env.CLOUDINARY_APIKEY;
const apiSecret = process.env.CLOUDINARY_APISECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function SaveImageAsync(
  buffer,
  folder = 'test',
  width = 500,
  height = 500,
  crop = 'fit',
  tags = ''
) {
  try {
    const result = await cloudinary.uploader.upload_stream();
  } catch (error) {}
}

function SaveImage(
  fileBuffer,
  folder = 'test',
  width = 500,
  height = 500,
  crop = 'fit',
  tags = ''
) {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        tags,
        width,
        height,
        crop,
        folder,
      },
      (error, result) => {
        if (result) {
          resolve({
            pictureUrl: result.secure_url,
            publicId: result.public_id,
          });
        }
        if (error) {
          reject(error);
        }
      }
    );

    createReadStream(fileBuffer).pipe(stream);
  });
}

function DeleteImage(publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { SaveImage, DeleteImage };
