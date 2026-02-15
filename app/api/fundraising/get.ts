import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { FundraisingsResponse, Fundraising } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Fundraising>,
): Promise<FundraisingsResponse> => {
  return strapi.find<Fundraising>('fundraisings', params)
}
