import type {
  PaginationByOffset,
  PaginationByPage,
  StrapiLocale,
  StrapiRequestParamField,
  StrapiRequestParamSort,
} from '@nuxtjs/strapi';

// 1-6. Операторы (фильтры) — оставляем, они работают
export type StrapiPrimitiveOperators<T> = { $eq?: T; $ne?: T; $in?: T[]; $notIn?: T[]; $null?: boolean; $notNull?: boolean; };
export type StrapiStringOperators = { $eqi?: string; $contains?: string; $notContains?: string; $containsi?: string; $notContainsi?: string; $startsWith?: string; $startsWithi?: string; $endsWith?: string; $endsWithi?: string; };
export type StrapiNumberOperators = { $lt?: number | string; $lte?: number | string; $gt?: number | string; $gte?: number | string; $between?: [number | string, number | string]; };
export type StrapiLogicalOperators<T> = { $or?: StrapiFilterRequestParam<T>[]; $and?: StrapiFilterRequestParam<T>[]; $not?: StrapiFilterRequestParam<T>; };
export type StrapiAllOperators<T> = StrapiPrimitiveOperators<T> & StrapiLogicalOperators<T> & (NonNullable<T> extends string ? StrapiStringOperators : object) & (NonNullable<T> extends number | string ? StrapiNumberOperators : object);
export type StrapiFilterRequestParam<T> = StrapiAllOperators<T> & (NonNullable<T> extends object ? { [K in keyof NonNullable<T>]?: StrapiFilterRequestParam<NonNullable<T>[K]>; } : object);

// 7. Вспомогательный интерфейс параметров
export interface Strapi5RequestPopulateParams<T> {
  fields?: Array<StrapiRequestParamField<T>>;
  sort?: StrapiRequestParamSort<T> | Array<StrapiRequestParamSort<T>>;
  filters?: StrapiFilterRequestParam<T>;
  populate?: Strapi5RequestPopulateParam<T>;
}

// 8. ГЛАВНЫЙ ТИП POPULATE (Финальная версия с индексом)
export type Strapi5RequestPopulateParam<T> =

    | '*'
    | Array<Exclude<keyof T, symbol>>
    | string[]

    | {
      [K in keyof T]?: T[K] extends object
        ? (T[K] extends (infer I)[]
          ? boolean | Strapi5RequestPopulateParams<I> | string[]
          : boolean | Strapi5RequestPopulateParams<T[K]> | string[])
        : boolean;
    }

    | { [key: string]: unknown }; // ЭТА СТРОКА УБИРАЕТ ОШИБКУ ДЛЯ ГЛУБОКОЙ ВЛОЖЕННОСТИ

// 9. ИТОГОВЫЙ ИНТЕРФЕЙС ПАРАМЕТРОВ
export interface Strapi5RequestParams<T> {
  fields?: Array<StrapiRequestParamField<T>>;
  populate?: Strapi5RequestPopulateParam<T>;
  sort?: StrapiRequestParamSort<T> | Array<StrapiRequestParamSort<T>>;
  pagination?: PaginationByOffset | PaginationByPage;
  filters?: StrapiFilterRequestParam<T>;
  status?: 'published' | 'draft';
  locale?: StrapiLocale | null;
}
