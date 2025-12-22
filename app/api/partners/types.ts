import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { LinkComponent, SingleMedia } from '../types'

export interface PartnerData {
  name: string
  logo: SingleMedia
  link: LinkComponent
  priority: number
  isActive: boolean
}

export type Partner = Strapi5ResponseData<PartnerData>
export type PartnerResponse = Strapi5ResponseSingle<PartnerData>
export type PartnersResponse = Strapi5ResponseMany<PartnerData>
