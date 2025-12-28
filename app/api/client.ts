import type {
  Strapi5RequestParams,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

export type { Strapi5RequestParams }

export const strapi = {
  update: async <T>(
    contentType: string,
    documentId: string,
    data: Partial<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { update } = useStrapi<T>()

    return update(contentType, documentId, data)
  },

  find: async <T>(
    contentType: string,
    params?: Strapi5RequestParams<T>,
  ): Promise<Strapi5ResponseMany<T>> => {
    const { find } = useStrapi<T>()

    return find(contentType, params)
  },

  findOne: async <T>(
    contentType: string,
    documentId?: string,
    params?: Strapi5RequestParams<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { findOne } = useStrapi<T>()

    return findOne(contentType, documentId, params)
  },

  create: async <T>(
    contentType: string,
    data: Partial<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { create } = useStrapi<T>()

    return create(contentType, data)
  },

  delete: async <T>(
    contentType: string,
    documentId: string,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { delete: _delete } = useStrapi<T>()

    return _delete(contentType, documentId)
  },
}
