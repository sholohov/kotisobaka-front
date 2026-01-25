import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type { MediaFile } from '~/api/types';

export interface SeoPage {
  slug: string;
  title: string;
  description?: string;
  robots?: 'index, follow' | 'noindex, nofollow';
  image?: MediaFile | null;
}

export type SeoPageData = Strapi5ResponseData<SeoPage>
export type SeoPageResponse = Strapi5ResponseSingle<SeoPage>
export type SeoPagesResponse = Strapi5ResponseMany<SeoPage>
