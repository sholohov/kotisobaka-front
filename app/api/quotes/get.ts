import type { Strapi5RequestParams } from '@/api/types/params'

import type { QuotesResponse, Quote } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Quote>,
): Promise<QuotesResponse> => {
  return strapi.find<Quote>('quotes', params)
}
