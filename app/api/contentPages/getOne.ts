import type { Strapi5RequestParams } from '@/api/types/params'

import type { ContentPageResponse, ContentPage } from './types'
import { strapi } from '../client'

export interface GetContentPageParams {
  id: string
  params?: Strapi5RequestParams<ContentPage>
}

export const getOne = async (
  { id, params }: GetContentPageParams,
): Promise<ContentPageResponse> => {
  return strapi.findOne<ContentPage>('content-pages', id, params)
}
