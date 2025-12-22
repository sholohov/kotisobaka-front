import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { ReviewResponse, ReviewData } from './types'
import { strapi } from '../client'

export interface GetReviewParams {
  id: string | number
  params?: Strapi5RequestParams<ReviewData>
}

export const getOne = async (
  { id, params }: GetReviewParams,
): Promise<ReviewResponse> => {
  return strapi.findById<ReviewData>('reviews', id, params)
}
