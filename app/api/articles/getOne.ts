import type { ArticleResponse, ArticleData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

export interface GetArticleParams {
  id: string | number
  params?: Strapi5RequestParams<ArticleData>
}

/** Получить одну статью */
export const getOne = async (
    { id, params }: GetArticleParams
): Promise<ArticleResponse> => {
  return strapi.findById<ArticleData>('articles', id, params)
}