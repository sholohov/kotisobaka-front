import type { Strapi5RequestParams } from '@/api/types/params'

import type { SeoPageResponse, SeoPage } from './types'
import { strapi } from '../client'

export interface GetSeoPageParams {
  id: string
  params?: Strapi5RequestParams<SeoPage>
}

export const getOne = async (
  { id, params }: GetSeoPageParams,
): Promise<SeoPageResponse> => {
  return strapi.findOne<SeoPage>('quotes', id, params)
}
