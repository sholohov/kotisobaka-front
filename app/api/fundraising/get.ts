import type { Strapi5RequestParams } from '@/api/types/params'

import type { FundraisingsResponse, Fundraising } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Fundraising>,
): Promise<FundraisingsResponse> => {
  return strapi.find<Fundraising>('fundraisings', params)
}
