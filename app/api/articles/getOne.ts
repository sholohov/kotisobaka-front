import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ArticleResponse, ArticleData } from './types'
import { strapi } from '../client'

export interface GetArticleParams {
  id: string
  params?: Strapi5RequestParams<ArticleData>
}

/** Получить одну статью */
export const getOne = async (
  { id, params }: GetArticleParams,
): Promise<ArticleResponse> => {
  return strapi.findOne<ArticleData>('articles', id, params)
}
