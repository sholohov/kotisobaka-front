import type { Strapi5RequestParams } from '@/api/types/params'

import type { PartnerResponse, Partner } from './types'
import { strapi } from '../client'

export interface GetPartnerParams {
  id: string
  params?: Strapi5RequestParams<Partner>
}

export const getOne = async (
  { id, params }: GetPartnerParams,
): Promise<PartnerResponse> => {
  return strapi.findOne<Partner>('partners', id, params)
}
