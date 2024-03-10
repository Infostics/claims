/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    // BACKEND_DOMAIN: "https://claims-backend-apis.onrender.com",
    BACKEND_DOMAIN: "http://localhost:3006",
    CRYPTO_SECRET_KEY: "gjfdkhslbreif847593rewfdkjbcm34woebkdjcnx43oihefdkcnx",
    COOKIE_PASSWORD: "ierfkgj439802vfckdh5438909endck",
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    NEXT_PUBLIC_CLOUDINARY_API_KEY: "121866971488326",
<<<<<<< Updated upstream
   
=======
    S3_BUCKET:'',
    REGION:'',
    AWS_ACCESS_KEY_ID:'',
    AWS_SECRET_ACCESS_KEY:''
>>>>>>> Stashed changes
  }
  ,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "*.cloudinary.com",
      'cmsdocv1.s3.ap-south-1.amazonaws.com',
      'https://th.bing.com'],

  },
};

module.exports = nextConfig;
