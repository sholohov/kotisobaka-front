import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ReviewResponse, ReviewData } from './types'
import { strapi } from '../client'

export interface GetReviewParams {
  id: string
  params?: Strapi5RequestParams<ReviewData>
}

export const getOne = async (
  { id, params }: GetReviewParams,
): Promise<ReviewResponse> => {
  return strapi.findOne<ReviewData>('reviews', id, params)
}
