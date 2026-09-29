import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useProducts } from './hooks/useProducts';
import { useSampleBasket } from './hooks/useSampleBasket';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { DivisionShowcase } from './components/DivisionShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { SampleBasketDrawer } from './components/SampleBasketDrawer';
import { DoctorSampleModal } from './components/DoctorSampleModal';
import { B2BFranchiseModal } from './components/B2BFranchiseModal';
import { QualitySection } from './components/QualitySection';
import { PhilosophySection } from './components/PhilosophySection';
import { CorporateGallery } from './components/CorporateGallery';
import { ClinicalInsights } from './components/ClinicalInsights';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function MainApp() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  // Products & Formulation State
  const {
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
    refresh
  } = useProducts();

  // Doctor Clinical Sample / RFQ Cart State
  const {
    basket,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    totalItems,
    isDrawerOpen,
    setIsDrawerOpen
  } = useSampleBasket();

  // Modal Visibility States
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Quick navigation handler from search or dropdowns
  const handleQuickSearch = (query, cat = null) => {
    if (query !== undefined && query !== null) {
      setSearchQuery(query);
    }
    if (cat) {
      setSelectedCategory(cat);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-femura-500 selection:text-white transition-colors duration-300">
      
      {/* Premium Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        sampleCount={totalItems}
        onOpenBasket={() => setIsDrawerOpen(true)}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
        onSearchSelect={handleQuickSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* High-Impact Hero Section */}
        <Hero
          onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
          onSearchSubmit={(q) => handleQuickSearch(q)}
        />

        {/* Clinical Trust & Institutional Stats Bar */}
        <TrustBar />

        {/* The Four Tenets, Quality Motto & Strategic Operating Divisions */}
        <PhilosophySection onOpenDoctorModal={() => setIsDoctorModalOpen(true)} />

        {/* 6 Core Therapeutic Divisions Showcase */}
        <DivisionShowcase
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* Comprehensive Product Formulary with Filters & Skeletons */}
        <ProductCatalog
          products={products}
          categories={categories}
          dosageForms={dosageForms}
          loading={loading}
          error={error}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDosageForm={selectedDosageForm}
          setSelectedDosageForm={setSelectedDosageForm}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onViewProduct={(product) => setSelectedProduct(product)}
          onAddToBasket={addToBasket}
          comparisonList={comparisonList}
          toggleComparison={toggleComparison}
          onOpenComparisonModal={() => setIsCompareModalOpen(true)}
          clearFilters={clearFilters}
          onRefresh={refresh}
        />

        {/* Quality, R&D, and Cold Chain Infrastructure */}
        <QualitySection />

        {/* Peer-Reviewed Clinical Insights & Whitepapers */}
        <ClinicalInsights />

        {/* Medical Conferences & Scientific Symposia (8 Real Photographic Records) */}
        <CorporateGallery />

        {/* Doctor Testimonials & Partner Hospitals */}
        <TestimonialsSection />

        {/* About Femura ("Fem" + "Femur") & FAQ */}
        <AboutSection />

        {/* Interactive Contact & Office Locations */}
        <ContactSection />
      </main>

      {/* Premium Corporate Footer */}
      <Footer
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
        onSelectCategory={(catId) => handleQuickSearch('', catId)}
      />

      {/* Modals & Overlays */}
      
      {/* 1. Full Product Monograph Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToBasket={addToBasket}
        />
      )}

      {/* 2. Side-by-Side Product Comparison Modal */}
      {isCompareModalOpen && (
        <ProductComparisonModal
          comparisonList={comparisonList}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveFromCompare={(prod) => toggleComparison(prod)}
          onAddToBasket={addToBasket}
        />
      )}

      {/* 3. Sample Basket & RFQ Slide-over Drawer */}
      <SampleBasketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        basket={basket}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromBasket}
        onClearBasket={clearBasket}
      />

      {/* 4. Dedicated Doctor Sample Kit Modal */}
      <DoctorSampleModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
      />

      {/* 5. PCD Franchise / Dealership Rights Modal */}
      <B2BFranchiseModal
        isOpen={isFranchiseModalOpen}
        onClose={() => setIsFranchiseModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
