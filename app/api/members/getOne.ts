import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { MemberResponse, MemberData } from './types'
import { strapi } from '../client'

export interface GetMemberParams {
  id: string
  params?: Strapi5RequestParams<MemberData>
}

export const getOne = async (
  { id, params }: GetMemberParams,
): Promise<MemberResponse> => {
  return strapi.findOne<MemberData>('members', id, params)
}
