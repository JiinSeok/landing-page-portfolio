import { metaData } from '@/app/config'
import { MetadataRoute } from 'next'

const BaseUrl = metaData.baseUrl.endsWith('/')
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BaseUrl,
      lastModified: new Date().toISOString().split('T')[0],
    },
  ]
}
