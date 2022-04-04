const adminPassword = process.env.ADMIN_PASSWORD

export default async (req, res) => {
  const { password } = req.body
  return res.json({ status: password === adminPassword })
}
