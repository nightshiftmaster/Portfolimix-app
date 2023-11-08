/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "prefacestudios.com",
      "bookeep.co.il",
      "www.pictureframesexpress.co.uk",
      "assets.bluethumb.com.au",
      "via.placeholder.com",
      "i.dummyjson.com",
      "cdn.pixabay.com",
      "ichef.bbci.co.uk",
      "media.istockphoto.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
