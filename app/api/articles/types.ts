import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { Member } from '../members/types'
import type { SingleMedia, MultipleMedia } from '../types'
import type { ArticleTag } from '~/api/articleTags/types';

/** Поля статьи */
export interface Article {
  title: string
  slug: string
  excerpt: string
  readingTime: number
  coverImage?: SingleMedia | null
  gallery?: MultipleMedia | null
  type: 'news' | 'blog'
  tag?: Strapi5ResponseData<ArticleTag> | null
  content: string
  author?: Strapi5ResponseData<Member> | null
  publishedDate: string
}

export type ArticleData = Strapi5ResponseData<Article>
export type ArticleResponse = Strapi5ResponseSingle<Article>
export type ArticlesResponse = Strapi5ResponseMany<Article>
