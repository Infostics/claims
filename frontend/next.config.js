/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env:{
    BACKEND_DOMAIN:"https://claims-backend-apis.onrender.com",
    CRYPTO_SECRET_KEY: "gjfdkhslbreif847593rewfdkjbcm34woebkdjcnx43oihefdkcnx",
    COOKIE_PASSWORD: "ierfkgj439802vfckdh5438909endck",
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:"dcrq3m6dx",
    CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    NEXT_PUBLIC_CLOUDINARY_API_KEY: "121866971488326",
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: "FFNmV8H7NH3euKmH0wf1bFqfZjI",
    
  }
  ,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "*.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
