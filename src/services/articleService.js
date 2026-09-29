import { researchArticles } from '../data/research';

export const articleService = {
  async getArticles(category = 'all') {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (category === 'all') {
      return researchArticles;
    }
    return researchArticles.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));
  },

  async getArticleBySlug(slug) {
    await new Promise(resolve => setTimeout(resolve, 80));
    const article = researchArticles.find(a => a.slug === slug || a.id === slug);
    if (!article) {
      throw new Error(`Article not found: ${slug}`);
    }
    return article;
  }
};
