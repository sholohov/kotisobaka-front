import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
} from '@nuxtjs/strapi'

export interface Statistic {
  adoptedPets: number
  savedLives: number
  yearsOfCare: number
  patientsInTreatment: number
}

export type StatisticData = Strapi5ResponseData<Statistic>
export type StatisticResponse = Strapi5ResponseSingle<Statistic>
