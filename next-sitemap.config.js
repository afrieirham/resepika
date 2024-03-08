/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://resepika.com",
  generateRobotsTxt: true,
  exclude: ["/admin", "/api/*"],
};
