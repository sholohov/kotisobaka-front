import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle
} from '@nuxtjs/strapi'

export interface StatisticData {
  adoptedPets: number
  savedLives: number
  yearsOfCare: number
  patientsInTreatment: number
}

export type Statistic = Strapi5ResponseData<StatisticData>
export type StatisticResponse = Strapi5ResponseSingle<StatisticData>
