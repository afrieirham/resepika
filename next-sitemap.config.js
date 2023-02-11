/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://resepi-khairulaming.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin", "/api/*"],
};
