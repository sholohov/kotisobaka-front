import type { MemberResponse, MemberData } from './types'
import { strapi } from '../client'
import type {Strapi5RequestParams} from "@nuxtjs/strapi";

export interface GetMemberParams {
  id: string | number
  params?: Strapi5RequestParams<MemberData>
}

export const getOne = async (
    { id, params }: GetMemberParams
): Promise<MemberResponse> => {
  return strapi.findById<MemberData>('members', id, params)
}