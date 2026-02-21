import type { Strapi5RequestParams } from '@/api/types/params'

import type { ContentPagesResponse, ContentPage } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<ContentPage>,
): Promise<ContentPagesResponse> => {
  return strapi.find<ContentPage>('content-pages', params)
}
