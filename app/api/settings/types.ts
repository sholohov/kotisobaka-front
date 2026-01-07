import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
} from '@nuxtjs/strapi'

/** Поля настроек */
export interface Settings {
  isTechnicalWorks: boolean
}

export type SettingsData = Strapi5ResponseData<Settings>
export type SettingsResponse = Strapi5ResponseSingle<Settings>
