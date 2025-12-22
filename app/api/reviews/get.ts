import type { Strapi5RequestParams } from '@nuxtjs/strapi'
import type { ReviewsResponse, ReviewData } from './types'
import { strapi } from '../client'

export const get = async (
    params?: Strapi5RequestParams<ReviewData>
): Promise<ReviewsResponse> => {
  return strapi.find<ReviewData>('reviews', params)
}