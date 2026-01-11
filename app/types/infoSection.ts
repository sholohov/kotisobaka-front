import type { Component } from 'vue';

export interface InfoCardItem {
  key: string
  title: string
  position: number
  description: string
  buttonText: string
  buttonLink: string
}

export interface InfoSectionItem {
  key: string
  title: string
  subtitle: string
  description: string
  sectionIcon: Component
  cardIcon: Component
  color: 'green' | 'pink' | 'orange'
  cards: InfoCardItem[]
}
