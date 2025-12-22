import type { PartnersResponse, PartnerData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

export const get = async (
    params?: Strapi5RequestParams<PartnerData>
): Promise<PartnersResponse> => {
  return strapi.find<PartnerData>('partners', params)
}