import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ContentPagesResponse, ContentPage } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<ContentPage>,
): Promise<ContentPagesResponse> => {
  return strapi.find<ContentPage>('content-pages', params)
}
