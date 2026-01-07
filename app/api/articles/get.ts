import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ArticlesResponse, Article } from './types'
import { strapi } from '../client'

/** Получить список статей */
export const get = async (
  params?: Strapi5RequestParams<Article>,
): Promise<ArticlesResponse> => {
  return strapi.find<Article>('articles', params)
}
