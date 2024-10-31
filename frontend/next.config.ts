import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['technical-frontend-api.bokokode.com'], // Añade el dominio aquí
  },
};

export default nextConfig;
