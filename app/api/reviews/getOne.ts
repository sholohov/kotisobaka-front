import type { Strapi5RequestParams } from '@/api/types/params'

import type { ReviewResponse, Review } from './types'
import { strapi } from '../client'

export interface GetReviewParams {
  id: string
  params?: Strapi5RequestParams<Review>
}

export const getOne = async (
  { id, params }: GetReviewParams,
): Promise<ReviewResponse> => {
  return strapi.findOne<Review>('reviews', id, params)
}
