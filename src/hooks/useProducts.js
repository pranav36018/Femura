import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dosageForms, setDosageForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDosageForm, setSelectedDosageForm] = useState('All Forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null); // For Monograph modal
  const [comparisonList, setComparisonList] = useState([]); // Up to 3 products

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({
        category: selectedCategory,
        dosageForm: selectedDosageForm,
        search: searchQuery,
        sortBy: sortBy
      });
      setProducts(data.products);
    } catch (err) {
      setError(err.message || 'Failed to load formulations');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedDosageForm, searchQuery, sortBy]);

  // Initial load of categories and dosage forms
  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, forms] = await Promise.all([
          productService.getCategories(),
          productService.getDosageForms()
        ]);
        setCategories(cats);
        setDosageForms(forms);
      } catch (err) {
        console.error('Error loading product meta:', err);
      }
    }
    loadMeta();
  }, []);

  // Reload products whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Toggle comparison
  const toggleComparison = (product) => {
    setComparisonList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDosageForm('All Forms');
    setSearchQuery('');
    setSortBy('featured');
  };

  return {
    products,
    categories,
    dosageForms,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    selectedDosageForm,
    setSelectedDosageForm,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    comparisonList,
    setComparisonList,
    toggleComparison,
    clearFilters,
    refresh: fetchProducts
  };
}
