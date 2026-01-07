import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ArticleResponse, Article } from './types'
import { strapi } from '../client'

export interface GetArticleParams {
  id: string
  params?: Strapi5RequestParams<Article>
}

/** Получить одну статью */
export const getOne = async (
  { id, params }: GetArticleParams,
): Promise<ArticleResponse> => {
  return strapi.findOne<Article>('articles', id, params)
}
