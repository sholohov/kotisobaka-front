import type { Strapi5RequestParams } from '@/api/types/params'

import type { FundraisingResponse, Fundraising } from './types'
import { strapi } from '../client'

export interface GetFundraisingParams {
  id: string
  params?: Strapi5RequestParams<Fundraising>
}

export const getOne = async (
  { id, params }: GetFundraisingParams,
): Promise<FundraisingResponse> => {
  return strapi.findOne<Fundraising>('fundraisings', id, params)
}
