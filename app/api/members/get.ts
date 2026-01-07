import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { MembersResponse, Member } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Member>,
): Promise<MembersResponse> => {
  return strapi.find<Member>('members', params)
}
