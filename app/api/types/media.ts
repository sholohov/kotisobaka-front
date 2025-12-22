/** Формат медиа файла */
export interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

/** Медиа файл из Strapi */
export interface MediaFile {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: {
    large?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    thumbnail?: MediaFormat
    // могут быть другие форматы
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/** Одиночное медиа поле */
export type SingleMedia = MediaFile

/** Множественное медиа поле */
export type MultipleMedia = MediaFile[]
