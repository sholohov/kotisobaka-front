import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { MemberResponse, Member } from './types'
import { strapi } from '../client'

export interface GetMemberParams {
  id: string
  params?: Strapi5RequestParams<Member>
}

export const getOne = async (
  { id, params }: GetMemberParams,
): Promise<MemberResponse> => {
  return strapi.findOne<Member>('members', id, params)
}
