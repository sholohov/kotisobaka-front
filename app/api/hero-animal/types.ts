import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
} from '@nuxtjs/strapi'
import type { Animal } from '~/api/animals/types';

export interface HeroAnimal {
  animals?: Strapi5ResponseData<Animal>[] | null
}

export type HeroAnimalData = Strapi5ResponseData<HeroAnimal>
export type HeroAnimalResponse = Strapi5ResponseSingle<HeroAnimal>
