import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { AnimalsResponse, Animal } from './types'
import { strapi } from '../client'

/** Получить список животных */
export const get = async (
  params?: Strapi5RequestParams<Animal>,
): Promise<AnimalsResponse> => {
  return strapi.find<Animal>('animals', params)
}
