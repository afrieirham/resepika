const axios = require("axios");
const url = process.env.NEXT_PUBLIC_PROFILE_URL;

export default async function handler(req, res) {
  try {
    const position = req.query.position;

    // Fetch data using url
    const { data } = await axios.get(url);

    // Use request body if available
    const source = Boolean(req.body) ? req.body : data;

    // Go to relevant node
    const content =
      source.data.user.edge_owner_to_timeline_media.edges[position - 1].node;

    // Get only needed data
    const photoUrl = content.display_url;
    const postUrl = `https://instagram.com/p/${content.shortcode}`;
    const caption = content.edge_media_to_caption.edges[0].node.text;

    return res.json({ photoUrl, postUrl, caption });
  } catch (error) {
    return res.json({ error: "Something went wrong" });
  }
}
