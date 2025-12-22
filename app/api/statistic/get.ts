import type { StatisticResponse, StatisticData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

export const get = async (
    params?: Strapi5RequestParams<StatisticData>
): Promise<StatisticResponse> => {
  // singular API ID: 'statistic'
  return strapi.findOne<StatisticData>('statistic', params)
}