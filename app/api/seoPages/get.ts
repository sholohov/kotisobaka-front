import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { SeoPagesResponse, SeoPage } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<SeoPage>,
): Promise<SeoPagesResponse> => {
  return strapi.find<SeoPage>('seo-pages', params)
}
