import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { QuoteResponse, QuoteData } from './types'
import { strapi } from '../client'

export interface GetQuoteParams {
  id: string
  params?: Strapi5RequestParams<QuoteData>
}

export const getOne = async (
  { id, params }: GetQuoteParams,
): Promise<QuoteResponse> => {
  return strapi.findOne<QuoteData>('quotes', id, params)
}
