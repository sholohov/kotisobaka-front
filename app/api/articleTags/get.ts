import type { Strapi5RequestParams } from '@/api/types/params'

import type { ArticleTag, ArticleTagsResponse } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<ArticleTag>,
): Promise<ArticleTagsResponse> => {
  return strapi.find<ArticleTag>('article-tags', params)
}
