import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { HeroAnimalResponse, HeroAnimalData } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<HeroAnimalData>,
): Promise<HeroAnimalResponse> => {
  return strapi.findOne<HeroAnimalData>('hero-animal', params)
}
