import type { ArticleData } from '~/api/articles/types';

export interface ArticlesFilters {
  species: ArticleData['species'] | null
  age: string | null
  gender: ArticleData['gender'] | null
  compatibility: ('cat' | 'dog' | 'children')[]
  specialNeeds: boolean | null
  beginners: boolean | null
}

export function makeArticlesFilters(): ArticlesFilters {
  return {
    species: null,
    age: null,
    gender: null,
    compatibility: [],
    specialNeeds: null,
    beginners: null,
  }
}
