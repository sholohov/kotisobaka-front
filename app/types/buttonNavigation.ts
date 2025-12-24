import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router";

export interface ButtonNavigationItemProps {
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric,
  key: string
  label: string
}

export interface ButtonNavigationProps {
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  key: string
  label: string
  items?: ButtonNavigationItemProps[]
}
