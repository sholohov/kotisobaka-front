import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'

export interface ContentPage {
  path: string;
  title: string;
  category: 'info' | 'help'
  summary: string
  content: string
}

export type ContentPageData = Strapi5ResponseData<ContentPage>
export type ContentPageResponse = Strapi5ResponseSingle<ContentPage>
export type ContentPagesResponse = Strapi5ResponseMany<ContentPage>
