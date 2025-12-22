import type { Strapi5Error } from '@nuxtjs/strapi'

/**
 * Проверить является ли ошибкой Strapi API
 */
export const isApiError = (error: any): error is Strapi5Error => {
  return error &&
      typeof error === 'object' &&
      'error' in error &&
      typeof error.error === 'object' &&
      'status' in error.error &&
      'message' in error.error &&
      typeof error.error.status === 'number' &&
      typeof error.error.message === 'string'
}