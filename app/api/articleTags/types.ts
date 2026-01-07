import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type { Article } from '~/api/articles/types';

/**
 * Интерфейс для сущности "Статья / Тэг" (article-tag).
 */
export interface ArticleTag {
  /** Название тега на русском в camelCase (например: "всеОКошках") */
  name: string
  /** Уникальный идентификатор для URL (например: "all-about-cats") */
  slug: string
  /** Цвет тега в HEX формате (например: "#3B82F6") */
  color: string
  /** Описание тега (макс. 150 символов) */
  description?: string
  /** Связанные статьи (обратная связь) */
  articles?: Strapi5ResponseData<Article>[] | null
}

export type ArticleTagData = Strapi5ResponseData<ArticleTag>
export type ArticleTagResponse = Strapi5ResponseSingle<ArticleTag>
export type ArticleTagsResponse = Strapi5ResponseMany<ArticleTag>
