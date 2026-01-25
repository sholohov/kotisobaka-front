import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { QuestionsResponse, Question } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Question>,
): Promise<QuestionsResponse> => {
  return strapi.find<Question>('faqs', params)
}
