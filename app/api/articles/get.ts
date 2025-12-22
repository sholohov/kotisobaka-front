import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ArticlesResponse, ArticleData } from './types'
import { strapi } from '../client'

/** Получить список статей */
export const get = async (
  params?: Strapi5RequestParams<ArticleData>,
): Promise<ArticlesResponse> => {
  return strapi.find<ArticleData>('articles', params)
}
