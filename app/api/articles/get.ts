import type { ArticlesResponse, ArticleData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

/** Получить список статей */
export const get = async (
    params?: Strapi5RequestParams<ArticleData>
): Promise<ArticlesResponse> => {
  return strapi.find<ArticleData>('articles', params)
}