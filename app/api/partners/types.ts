import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { LinkComponent, SingleMedia } from '../types'

export interface Partner {
  name: string
  logo?: SingleMedia | null
  link?: LinkComponent | null
  priority: number
}

export type PartnerData = Strapi5ResponseData<Partner>
export type PartnerResponse = Strapi5ResponseSingle<Partner>
export type PartnersResponse = Strapi5ResponseMany<Partner>
