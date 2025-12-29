import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { AnimalResponse, AnimalData } from './types'
import { strapi } from '../client'

export interface GetAnimalParams {
  id: string
  params?: Strapi5RequestParams<AnimalData>
}

/** Получить одно животное */
export const getOne = async (
  { id, params }: GetAnimalParams,
): Promise<AnimalResponse> => {
  return strapi.findOne<AnimalData>('animals', id, params)
}
