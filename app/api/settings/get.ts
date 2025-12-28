import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { SettingsResponse, SettingsData } from './types'
import { strapi } from '../client'

/** Получить настройки */
export const get = async (
  params?: Strapi5RequestParams<SettingsData>,
): Promise<SettingsResponse> => {
  return strapi.findOne<SettingsData>('setting', undefined, params)
}
