import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type { Animal } from '~/api/animals/types';

export interface Fundraising {
  title: string
  description: string
  amountTarget: number
  amountCollected: number
  animals?: Strapi5ResponseData<Animal>[] | null
}

export type FundraisingData = Strapi5ResponseData<Fundraising>
export type FundraisingResponse = Strapi5ResponseSingle<Fundraising>
export type FundraisingsResponse = Strapi5ResponseMany<Fundraising>
