import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

/**
 * Интерфейс для сущности "Цитата" (quotes).
 */
export interface QuoteData {
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

export type Quote = Strapi5ResponseData<QuoteData>
export type QuoteResponse = Strapi5ResponseSingle<QuoteData>
export type QuotesResponse = Strapi5ResponseMany<QuoteData>
