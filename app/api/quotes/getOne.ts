import type { Strapi5RequestParams } from '@/api/types/params'

import type { QuoteResponse, Quote } from './types'
import { strapi } from '../client'

export interface GetQuoteParams {
  id: string
  params?: Strapi5RequestParams<Quote>
}

export const getOne = async (
  { id, params }: GetQuoteParams,
): Promise<QuoteResponse> => {
  return strapi.findOne<Quote>('quotes', id, params)
}
