import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type {MemberData} from "../members/types";
import type {MultipleMedia, SingleMedia} from "../types";

/** Поля животного */
export interface AnimalData {
  name: string
  slug: string
  internalId?: string
  species: 'cat' | 'dog'
  gender: 'male' | 'female'
  weightKg?: number
  birthDate: string
  arrivalDate: string
  color?: string
  breed?: string
  animalStatus: 'available' | 'under_treatment' | 'trial_period' | 'adopted'
  priorityAdoption: number
  goodWithChildren: boolean
  goodWithCats: boolean
  goodWithDogs: boolean
  forBeginners: boolean
  specialNeeds: boolean
  sterilized: boolean
  vaccinated: boolean
  photo: SingleMedia
  gallery?: MultipleMedia | null
  description: string
  featuresNotes?: string
  healthNotes?: string
  financeNotes?: string
  fundsIsNeeded: boolean
  fundsPriority?: number
  fundsAmountTarget?: number
  fundsAmountCollected?: number
  fundsOpenedAt?: string
  metaTitle?: string
  metaDescription?: string
  curator?: Strapi5ResponseData<MemberData> | null
}

export type Animal = Strapi5ResponseData<AnimalData>
export type AnimalResponse = Strapi5ResponseSingle<AnimalData>
export type AnimalsResponse = Strapi5ResponseMany<AnimalData>