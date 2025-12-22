import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
} from '@nuxtjs/strapi'

import type { AnimalData } from '../animals/types'

export interface HeroAnimalData {
  animals: Strapi5ResponseData<AnimalData>[]
}

export type HeroAnimal = Strapi5ResponseData<HeroAnimalData>
export type HeroAnimalResponse = Strapi5ResponseSingle<HeroAnimalData>
