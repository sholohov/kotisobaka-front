declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Заголовок страницы, который будет отображаться в PageTitle
     */
    pageTitle?: string

    /**
     * Ключ для выбора иконки из словаря icons
     */
    pageTitleIcon?: string
  }
}
