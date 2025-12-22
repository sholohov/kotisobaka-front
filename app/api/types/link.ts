/** Компонент components_link_ssylka (Link) */
export interface LinkComponent {
  id: number
  url: string
  label?: string
  target: '_self' | '_blank' | '_parent' | '_top' | 'framename'
}