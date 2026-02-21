import type { Strapi5RequestParams } from '@/api/types/params'

import type { OrgDocumentsResponse, OrgDocument } from './types'
import { strapi } from '../client'

export const get = async (
  params?: Strapi5RequestParams<OrgDocument>,
): Promise<OrgDocumentsResponse> => {
  return strapi.find<OrgDocument>('org-documents', params)
}
