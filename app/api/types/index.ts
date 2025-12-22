import type {
  Strapi5ResponseSingle,
  Strapi5ResponseMany
} from '@nuxtjs/strapi'

/** Базовые ответы Strapi v5 */
export type {
  Strapi5ResponseSingle,
  Strapi5ResponseMany
}

export type ApiSuccess<T> = T

export type ApiMethod<TParams = any, TResponse = any> =
    (params: TParams) => Promise<ApiSuccess<TResponse>>

export type ApiModule = Record<string, ApiMethod>

export * from './link'
export * from './media'
