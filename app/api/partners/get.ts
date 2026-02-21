import type { Strapi5RequestParams } from '@/api/types/params'

import type { PartnersResponse, Partner } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Partner>,
): Promise<PartnersResponse> => {
  return strapi.find<Partner>('partners', params)
}
