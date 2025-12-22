import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type {AnimalData} from "../animals/types";
import type {ArticleData} from "../articles/types";
import type { SingleMedia } from '../types'

export interface MemberData {
  photo: SingleMedia
  firstName: string
  lastName?: string
  phone: string
  bio?: string
  animals?: Strapi5ResponseData<AnimalData>[]
  articles?: Strapi5ResponseData<ArticleData>[]
}

export type Member = Strapi5ResponseData<MemberData>
export type MemberResponse = Strapi5ResponseSingle<MemberData>
export type MembersResponse = Strapi5ResponseMany<MemberData>