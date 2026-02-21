import type { Strapi5RequestParams } from '@/api/types/params'

import type { SettingsResponse, Settings } from './types'
import { strapi } from '../client'

/** Получить настройки */
export const get = async (
  params?: Strapi5RequestParams<Settings>,
): Promise<SettingsResponse> => {
  return strapi.findOne<Settings>('setting', undefined, params)
}
