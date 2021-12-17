import { createClient } from 'contentful'

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  })

  const response = await client.getEntries({
    content_type: 'recipe',
    'fields.title[match]': '',
  })

  return {
    props: {
      items: response.items,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60 * 60 * 1, // In seconds
  }
}

export default function Home({ items }) {
  return (
    <div>
      {items.map(({ fields }) => {
        const thumbnailUrl = fields.thumbnail.fields.file.url
        return (
          <div key={fields.postUrl}>
            <a href={fields.postUrl} target='_blank'>
              {fields.title}
            </a>
            <span dangerouslySetInnerHTML={{ __html: fields.embed }}></span>
            <img src={thumbnailUrl} />
          </div>
        )
      })}
    </div>
  )
}
