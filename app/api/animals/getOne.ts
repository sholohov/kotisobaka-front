import type { AnimalResponse, AnimalData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

export interface GetAnimalParams {
  id: string | number
  params?: Strapi5RequestParams<AnimalData>
}

/** Получить одно животное */
export const getOne = async (
    { id, params }: GetAnimalParams
): Promise<AnimalResponse> => {
  return strapi.findById<AnimalData>('animals', id, params)
}