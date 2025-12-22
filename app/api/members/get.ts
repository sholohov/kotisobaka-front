import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { MembersResponse, MemberData } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<MemberData>,
): Promise<MembersResponse> => {
  return strapi.find<MemberData>('members', params)
}
