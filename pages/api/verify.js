const adminPassword = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  const { password } = req.body;
  return res.json({ status: password === adminPassword });
}
