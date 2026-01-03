import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';

export interface ButtonNavigationProps {
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  key: string
  label: string
  icon?: string
  items?: ButtonNavigationProps[]
}
