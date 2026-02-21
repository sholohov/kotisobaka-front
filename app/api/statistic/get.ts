import type { Strapi5RequestParams } from '@/api/types/params'

import type { StatisticResponse, Statistic } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<Statistic>,
): Promise<StatisticResponse> => {
  return strapi.findOne<Statistic>('statistic', undefined, params)
}
