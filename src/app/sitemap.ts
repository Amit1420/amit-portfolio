import { MetadataRoute } from 'next'

// Single-page site: section anchors are not separate documents, so only the root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://amitk1420.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
