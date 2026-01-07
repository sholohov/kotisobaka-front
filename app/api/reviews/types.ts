import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

import type { SingleMedia } from '../types'

export interface Review {
  name: string
  date: string
  text: string
  photo?: SingleMedia | null
  priority: number
  showOnMain: boolean
  tag: 'cat' | 'dog'
}

export type ReviewData = Strapi5ResponseData<Review>
export type ReviewResponse = Strapi5ResponseSingle<Review>
export type ReviewsResponse = Strapi5ResponseMany<Review>
