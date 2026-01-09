import type { Strapi5RequestParams } from '@nuxtjs/strapi'

import type { OrgDocumentResponse, OrgDocument } from './types'
import { strapi } from '../client'

export interface GetOrgDocumentParams {
  id: string
  params?: Strapi5RequestParams<OrgDocument>
}

export const getOne = async (
  { id, params }: GetOrgDocumentParams,
): Promise<OrgDocumentResponse> => {
  return strapi.findOne<OrgDocument>('org-documents', id, params)
}
