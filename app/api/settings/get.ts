import type { SettingsResponse, SettingsData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

/** Получить настройки */
export const get = async (
    params?: Strapi5RequestParams<SettingsData>
): Promise<SettingsResponse> => {
  return strapi.findOne<SettingsData>('setting', params)
}