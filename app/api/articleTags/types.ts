import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type { Article } from '~/api/articles/types';

export interface ArticleTag {
  name: string
  slug: string
  color: string
  description?: string
  articles?: Strapi5ResponseData<Article>[] | null
}

export type ArticleTagData = Strapi5ResponseData<ArticleTag>
export type ArticleTagResponse = Strapi5ResponseSingle<ArticleTag>
export type ArticleTagsResponse = Strapi5ResponseMany<ArticleTag>
