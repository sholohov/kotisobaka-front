declare module 'vue-router' {
  interface RouteMeta {
    /** Заголовок страницы, который будет отображаться в PageTitle */
    pageTitle?: string

    /** Ключ для выбора иконки из словаря icons в PageTitle */
    pageTitleIcon?: string

    /** флаг приоритета страницы для установки сео параметров */
    seoPageOverride: true,
  }
}
