/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yofjxcueoomwfiiimisf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-images/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
