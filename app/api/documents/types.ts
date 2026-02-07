import type {
  Strapi5ResponseData,
  Strapi5ResponseSingle,
  Strapi5ResponseMany,
} from '@nuxtjs/strapi'
import type { MediaFile } from '~/api/types';

export type OrgDocumentSection =
    | 'legal_docs'
    | 'financial_reports'
    | 'activity_reports';

export interface OrgDocument {
  id: number;
  date: string;
  description: string;
  section: OrgDocumentSection;
  file?: MediaFile | null;
}

export type OrgDocumentData = Strapi5ResponseData<OrgDocument>
export type OrgDocumentResponse = Strapi5ResponseSingle<OrgDocument>
export type OrgDocumentsResponse = Strapi5ResponseMany<OrgDocument>
