import type { Animal } from '~/api/animals/types';

export interface AnimalsFilters {
  species: Animal['species'] | null
  age: string | null
  gender: Animal['gender'] | null
  compatibility: ('cat' | 'dog' | 'children')[]
  specialNeeds: boolean | null
  beginners: boolean | null
}

export function makeAnimalsFilters(): AnimalsFilters {
  return {
    species: null,
    age: null,
    gender: null,
    compatibility: [],
    specialNeeds: null,
    beginners: null,
  }
}
