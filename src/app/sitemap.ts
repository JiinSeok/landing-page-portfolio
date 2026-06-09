import { metaData } from '@/app/config'
import { MetadataRoute } from 'next'

const BaseUrl = metaData.baseUrl.endsWith('/')
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split('T')[0]

  return [
    { url: BaseUrl, lastModified },
    { url: `${BaseUrl}settlement-design`, lastModified },
    { url: `${BaseUrl}recommendation`, lastModified },
    { url: `${BaseUrl}tappytype/waitlist`, lastModified },
    { url: `${BaseUrl}tappytype/waitlist/ko`, lastModified },
    { url: `${BaseUrl}tappytype/waitlist/en`, lastModified },
  ]
}
