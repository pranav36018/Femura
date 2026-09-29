import { productsData, categoriesData, dosageForms } from '../data/products';
import { apiClient } from '../api/client';

export const productService = {
  /**
   * Fetch filtered and sorted products
   */
  async getProducts({ category = 'all', dosageForm = 'All Forms', search = '', sortBy = 'featured' } = {}) {
    // In future: return apiClient.get('/products', { category, dosageForm, search, sortBy });
    await new Promise(resolve => setTimeout(resolve, 180)); // Realistic network latency

    let result = [...productsData];

    // Filter by Category
    if (category && category !== 'all') {
      result = result.filter(p => p.categorySlug === category || p.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Filter by Dosage Form
    if (dosageForm && dosageForm !== 'All Forms') {
      result = result.filter(p => p.dosageForm.toLowerCase() === dosageForm.toLowerCase());
    }

    // Filter by Search Query
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.indications.some(ind => ind.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.mrp - b.mrp);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.mrp - a.mrp);
    } else {
      // Default: featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return {
      products: result,
      total: result.length,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Get single product by slug or id
   */
  async getProductBySlug(slug) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const product = productsData.find(p => p.slug === slug || p.id === slug);
    if (!product) {
      throw new Error(`Product not found for slug: ${slug}`);
    }
    return product;
  },

  /**
   * Get featured formulations
   */
  async getFeaturedProducts() {
    await new Promise(resolve => setTimeout(resolve, 120));
    return productsData.filter(p => p.featured);
  },

  /**
   * Get list of therapeutic categories
   */
  async getCategories() {
    return categoriesData.map(cat => ({
      ...cat,
      count: cat.id === 'all' 
        ? productsData.length 
        : productsData.filter(p => p.categorySlug === cat.id || p.category.toLowerCase().includes(cat.id.toLowerCase())).length
    }));
  },

  /**
   * Get available dosage forms
   */
  async getDosageForms() {
    return dosageForms;
  }
};
