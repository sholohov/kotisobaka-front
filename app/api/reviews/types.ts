import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { SingleMedia } from '../types'

export interface ReviewData {
  name: string
  date: string
  text: string
  photo: SingleMedia
  priority: number
  showOnMain: boolean
  tags: 'cat' | 'dog'
  publishedDate?: string | null
}

export type Review = Strapi5ResponseData<ReviewData>
export type ReviewResponse = Strapi5ResponseSingle<ReviewData>
export type ReviewsResponse = Strapi5ResponseMany<ReviewData>
