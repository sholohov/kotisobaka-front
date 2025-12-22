import type { Strapi5Error } from '@nuxtjs/strapi'

export const isApiError = (error: unknown): error is Strapi5Error => {
  if (error === null || typeof error !== 'object') return false

  const errObj = error as Record<string, unknown>
  if (!('error' in errObj)) return false

  const strapiError = errObj.error
  if (strapiError === null || typeof strapiError !== 'object') return false

  const strapiErrorObj = strapiError as Record<string, unknown>
  return typeof strapiErrorObj.status === 'number'
    && typeof strapiErrorObj.message === 'string'
}
