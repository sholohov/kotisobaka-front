import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
} from '@nuxtjs/strapi'

/** Поля настроек */
export interface SettingsData {
  isTechnicalWorks: boolean
}

export type Settings = Strapi5ResponseData<SettingsData>
export type SettingsResponse = Strapi5ResponseSingle<SettingsData>
