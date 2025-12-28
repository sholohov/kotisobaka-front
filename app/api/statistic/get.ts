import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { StatisticResponse, StatisticData } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<StatisticData>,
): Promise<StatisticResponse> => {
  return strapi.findOne<StatisticData>('statistic', params)
}
