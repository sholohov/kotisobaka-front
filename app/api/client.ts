import type {
  Strapi5RequestParams,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

export type { Strapi5RequestParams }

export const strapi = {
  // Для сингл-типов
  findOne: async <T>(
    contentType: string,
    params?: Strapi5RequestParams<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { findOne } = useStrapi<T>()
    return findOne(contentType, params)
  },

  // Для сингл-типов (обновление)
  update: async <T>(
    contentType: string,
    data: Partial<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { update } = useStrapi<T>()
    return update(contentType, data)
  },

  // Для коллекций
  find: async <T>(
    contentType: string,
    params?: Strapi5RequestParams<T>,
  ): Promise<Strapi5ResponseMany<T>> => {
    const { find } = useStrapi<T>()
    return find(contentType, params)
  },

  // Для коллекций (по ID)
  findById: async <T>(
    contentType: string,
    id: string | number,
    params?: Strapi5RequestParams<T>,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { findOne } = useStrapi<T>()
    const documentId = typeof id === 'number' ? id.toString() : id
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
    id: string,
  ): Promise<Strapi5ResponseSingle<T>> => {
    const { delete: _delete } = useStrapi<T>()
    return _delete(contentType, id)
  },
}
