import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { QuotesResponse, QuoteData } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<QuoteData>,
): Promise<QuotesResponse> => {
  return strapi.find<QuoteData>('quotes', params)
}
