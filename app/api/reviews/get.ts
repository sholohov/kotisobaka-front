import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ReviewsResponse, Review } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Review>,
): Promise<ReviewsResponse> => {
  return strapi.find<Review>('reviews', params)
}
