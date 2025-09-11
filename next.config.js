/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // força o Turbopack a usar a pasta do projeto como raiz
  },
};

module.exports = nextConfig;
