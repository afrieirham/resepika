const axios = require('axios')
const url = process.env.NEXT_PUBLIC_PROFILE_URL

export default async (_, res) => {
  try {
    // Fetch data using url
    const { data } = await axios.get(url)

    // Go to relevant node
    const content = data.data.user.edge_owner_to_timeline_media.edges[0].node

    // Get only needed data
    const photoUrl = content.display_url
    const postUrl = `https://instagram.com/p/${content.shortcode}`
    const caption = content.edge_media_to_caption.edges[0].node.text

    return res.json({ photoUrl, postUrl, caption })
  } catch (error) {
    return res.json({ error })
  }
}
