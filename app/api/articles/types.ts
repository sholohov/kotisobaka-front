import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
  Strapi5RequestParams
} from '@nuxtjs/strapi'
import type {MemberData} from "../members/types";
import type { SingleMedia, MultipleMedia } from '../types'

/** Поля статьи */
export interface ArticleData {
  title: string
  slug: string
  excerpt: string
  readingTime?: number
  coverImage: SingleMedia
  gallery: MultipleMedia
  tag?: 'cat' | 'dog' | 'news' | 'stories' | 'advice' | 'help' | 'events'
  content: string
  author?: Strapi5ResponseData<MemberData> | null
  publishedDate?: string
}

export type Article = Strapi5ResponseData<ArticleData>
export type ArticleResponse = Strapi5ResponseSingle<ArticleData>
export type ArticlesResponse = Strapi5ResponseMany<ArticleData>