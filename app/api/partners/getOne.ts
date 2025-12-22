import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { PartnerResponse, PartnerData } from './types'
import { strapi } from '../client'

export interface GetPartnerParams {
  id: string | number
  params?: Strapi5RequestParams<PartnerData>
}

export const getOne = async (
  { id, params }: GetPartnerParams,
): Promise<PartnerResponse> => {
  return strapi.findById<PartnerData>('partners', id, params)
}
