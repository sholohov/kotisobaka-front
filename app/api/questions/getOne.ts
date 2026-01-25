import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { QuestionResponse, Question } from './types'
import { strapi } from '../client'

export interface GetQuestionParams {
  id: string
  params?: Strapi5RequestParams<Question>
}

export const getOne = async (
  { id, params }: GetQuestionParams,
): Promise<QuestionResponse> => {
  return strapi.findOne<Question>('quotes', id, params)
}
