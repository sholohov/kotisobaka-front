import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { Article } from '../articles/types'
import type { SingleMedia } from '../types'
import type { Animal } from '~/api/animals/types';

export interface Member {
  photo?: SingleMedia | null
  firstName: string
  lastName?: string
  phone: string
  bio?: string
  animals?: Strapi5ResponseData<Animal>[] | null
  articles?: Strapi5ResponseData<Article>[] | null
}

export type MemberData = Strapi5ResponseData<Member>
export type MemberResponse = Strapi5ResponseSingle<Member>
export type MembersResponse = Strapi5ResponseMany<Member>
