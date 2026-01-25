import type { UseSeoMetaInput } from '@unhead/vue'

export const usePageSeo = (meta?: Partial<UseSeoMetaInput>) => {
  const appConfig = useAppConfig()
  const requestUrl = useRequestURL()
  const siteName = appConfig.seo.site.name
  const defaultImage = `${requestUrl.origin}${appConfig.seo.og.image}`
  const title = meta?.title ? `${meta.title} | ${siteName}` : appConfig.seo.site.title
  const pageUrl = `${requestUrl.origin}${requestUrl.pathname}`

  const ogImage = typeof meta?.ogImage === 'string'
    ? meta.ogImage.startsWith('http') ? meta.ogImage : requestUrl.origin + meta.ogImage
    : meta?.ogImage

  useSeoMeta({
    ...meta,

    // Основные мета-теги
    title,
    description: meta?.description || appConfig.seo.site.description,
    keywords: appConfig.seo.site.keywords,

    // OpenGraph
    ogTitle: title,
    ogDescription: meta?.description || appConfig.seo.site.description,
    ogImage: ogImage || defaultImage,
    ogUrl: pageUrl,
    ogType: meta?.ogType || appConfig.seo.og.type as UseSeoMetaInput['ogType'],
    ogSiteName: siteName,
    ogLocale: appConfig.seo.og.locale,
    ogImageWidth: appConfig.seo.og.imageWidth,
    ogImageHeight: appConfig.seo.og.imageHeight,
    ogImageAlt: appConfig.seo.og.imageAlt,

    // Twitter
    twitterCard: appConfig.seo.twitter.card  as UseSeoMetaInput['twitterCard'],
    twitterTitle: title,
    twitterDescription: meta?.description || appConfig.seo.site.description,
    twitterImage: ogImage || defaultImage,
  })
}
