import { apiAnimals } from './animals'
import { apiArticles } from './articles'
import { apiHeroAnimal } from './hero-animal'
import { apiMembers } from './members'
import { apiPartners } from './partners'
import { apiReviews } from './reviews'
import { apiSettings } from './settings'
import { apiStatistic } from './statistic'
import { apiQuotes } from './quotes'
import { apiArticleTags } from './articleTags';
import { apiDocuments } from './documents';
import { apiContentPages } from './contentPages';
import { apiSeoPages } from './seoPages';
import { apiQuestions } from './questions';

export const api = {
  settings: apiSettings,
  animals: apiAnimals,
  articles: apiArticles,
  heroAnimal: apiHeroAnimal,
  members: apiMembers,
  partners: apiPartners,
  reviews: apiReviews,
  statistic: apiStatistic,
  quotes: apiQuotes,
  articleTags: apiArticleTags,
  documents: apiDocuments,
  contentPages: apiContentPages,
  seoPages: apiSeoPages,
  questions: apiQuestions,
}
