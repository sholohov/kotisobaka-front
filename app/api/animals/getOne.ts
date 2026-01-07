import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { AnimalResponse, Animal } from './types'
import { strapi } from '../client'

export interface GetAnimalParams {
  id?: string
  params?: Strapi5RequestParams<Animal>
}

/** Получить одно животное */
export const getOne = async (
  { id, params }: GetAnimalParams,
): Promise<AnimalResponse> => {
  return strapi.findOne<Animal>('animals', id, params)
}
