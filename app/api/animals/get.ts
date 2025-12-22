import type { AnimalsResponse, AnimalData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

/** Получить список животных */
export const get = async (
    params?: Strapi5RequestParams<AnimalData>
): Promise<AnimalsResponse> => {
  return strapi.find<AnimalData>('animals', params)
}