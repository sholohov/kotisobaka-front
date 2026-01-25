import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

export interface Question {
  tag: string
  question: string
  answer: string
  tagColor: string
}

export type QuestionData = Strapi5ResponseData<Question>
export type QuestionResponse = Strapi5ResponseSingle<Question>
export type QuestionsResponse = Strapi5ResponseMany<Question>
