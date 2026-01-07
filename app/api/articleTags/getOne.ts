import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ArticleTag, ArticleTagResponse } from './types'
import { strapi } from '../client'

export interface GetQuoteParams {
  id: string
  params?: Strapi5RequestParams<ArticleTag>
}

export const getOne = async (
  { id, params }: GetQuoteParams,
): Promise<ArticleTagResponse> => {
  return strapi.findOne<ArticleTag>('article-tags', id, params)
}
