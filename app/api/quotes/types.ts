import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

/**
 * Интерфейс для сущности "Цитата" (quotes).
 */
export interface Quote {
  /**
   * Хэштег (строка).
   * Обязательное поле.
   * Минимум 5 символов, максимум 20 символов.
   */
  tag: string;

  /**
   * Текст цитаты.
   * Обязательное поле.
   * Минимум 5 символов, максимум 110 символов.
   */
  text: string;
}

export type QuoteData = Strapi5ResponseData<Quote>
export type QuoteResponse = Strapi5ResponseSingle<Quote>
export type QuotesResponse = Strapi5ResponseMany<Quote>
