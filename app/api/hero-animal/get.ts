import type { Strapi5RequestParams } from '@/api/types/params'

import type { HeroAnimalResponse, HeroAnimal } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<HeroAnimal>,
): Promise<HeroAnimalResponse> => {
  return strapi.findOne<HeroAnimal>('hero-animal', undefined, params)
}
