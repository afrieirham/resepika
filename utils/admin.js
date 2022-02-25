const contentful = require('contentful-management')

export const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_API_KEY,
})
