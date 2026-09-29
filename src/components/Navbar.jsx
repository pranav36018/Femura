import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Stethoscope, 
  Building2
} from 'lucide-react';

export function Navbar({ 
  theme, 
  toggleTheme, 
  sampleCount = 0, 
  onOpenBasket, 
  onOpenDoctorModal, 
  onOpenFranchiseModal,
  onSearchSelect
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [divisionsDropdown, setDivisionsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onSearchSelect(localSearch.trim());
      setSearchOpen(false);
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Formulations', href: '#catalog-section' },
    { label: 'Specialties', href: '#divisions-section' },
    { label: 'Philosophy', href: '#philosophy-section' },
    { label: 'Conferences', href: '#gallery-section' },
    { label: 'Quality & R&D', href: '#quality-section' },
    { label: 'Clinical Research', href: '#insights-section' },
    { label: 'About Us', href: '#about-section' },
    { label: 'Contact', href: '#contact-section' }
  ];

  const divisionsList = [
    { name: "Gynecology & Maternal Care", cat: "gynecology" },
    { name: "Orthopaedics & Joint Science", cat: "orthopaedics" },
    { name: "Gastroenterology & Hepatology", cat: "gastroenterology" },
    { name: "Critical Care & ICU Nutrition", cat: "critical-care" },
    { name: "Endocrinology & Nanoshots", cat: "endocrinology" },
    { name: "Neurology & Nerve Repair", cat: "neurology" }
  ];

  return (
    <>
      {/* Top Professional Medical Bar */}
      <div className="bg-slate-900 text-slate-200 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-bio-emerald/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>WHO-GMP CERTIFIED</span>
            </span>
            <span className="hidden md:inline text-slate-300 text-[11px] truncate">
              Specialty Therapeutics in Women's Health (<span className="text-rose-400 font-semibold">Fem</span>) & Orthopaedics (<span className="text-cyan-400 font-semibold">Femur</span>)
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-[10px] sm:text-[11px] shrink-0">
            <a 
              href="tel:18004253368" 
              className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-medical-400 shrink-0" />
              <span>1800-425-3368</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <button 
              onClick={onOpenFranchiseModal}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-medical-300 font-semibold transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-medical-400" />
              <span>PCD Franchise Inquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 shadow-card backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 py-1.5 sm:py-2' 
            : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60 py-1.5 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Real Brand Logo - Responsive for Mobile & Desktop */}
          <a href="#" className="flex items-center gap-2 focus:outline-none group shrink-0">
            <div className="h-11 sm:h-16 lg:h-20 flex items-center dark:bg-white/95 dark:px-2.5 sm:dark:px-3.5 dark:py-1 sm:dark:py-1.5 dark:rounded-xl sm:dark:rounded-2xl dark:shadow-md transition-all">
              <img 
                src="/images/logo.png" 
                alt="Femura Pharma Logo" 
                className="h-9 sm:h-14 lg:h-16 w-auto max-w-[135px] sm:max-w-none object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://femurapharma.com/wp-content/uploads/2024/04/logo.png";
                }}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 xl:px-3 py-2 rounded-xl hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Specialty Divisions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDivisionsDropdown(true)}
              onMouseLeave={() => setDivisionsDropdown(false)}
            >
              <button 
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                onClick={() => setDivisionsDropdown(!divisionsDropdown)}
              >
                <span>Specialties</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${divisionsDropdown ? 'rotate-180' : ''}`} />
              </button>

              {divisionsDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 p-2 rounded-2xl bg-white dark:bg-slate-900 shadow-float border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {divisionsList.map((divItem) => (
                    <a
                      key={divItem.name}
                      href="#catalog-section"
                      onClick={() => {
                        setDivisionsDropdown(false);
                        onSearchSelect('', divItem.cat);
                      }}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-medical-50 dark:hover:bg-slate-800 hover:text-medical-700 dark:hover:text-medical-300 transition-colors"
                    >
                      {divItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            
            {/* Search Trigger */}
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileMenuOpen(false);
              }}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search Formulations"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark/Light Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Sample Basket Trigger */}
            <button
              onClick={onOpenBasket}
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center"
              title="Clinical Sample Basket"
              aria-label="View Sample Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {sampleCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-medical-600 text-white text-[11px] font-bold shadow-md animate-bounce">
                  {sampleCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Prestige Royal Blue) */}
            <button
              onClick={onOpenDoctorModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-sm hover:shadow-card-hover transform active:scale-95 transition-all duration-200"
            >
              <Stethoscope className="w-4 h-4 text-medical-200" />
              <span>Doctor Sample Kit</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setSearchOpen(false);
              }}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Live Search Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 px-3 sm:px-4 py-3 shadow-md animate-in slide-in-from-top-1">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search formulations (Calmagic, Osteopep, Livmax)..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  autoFocus
                  className="w-full pl-10 sm:pl-12 pr-24 sm:pr-28 py-2.5 sm:py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-medical-500 text-base sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 px-3.5 sm:px-4 py-1.5 rounded-lg bg-medical-600 text-white text-xs font-bold hover:bg-medical-700 transition-colors"
                >
                  Search
                </button>
              </form>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto no-scrollbar py-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Popular:</span>
                {['Calmagic HD', 'Osteopep XT', 'Livmax Syrup', 'D-Serve 60K', 'Aldofem Inj', 'Femgesic SP'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      onSearchSelect(tag);
                      setSearchOpen(false);
                      const catalogEl = document.getElementById('catalog-section');
                      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-50 hover:text-medical-600 dark:hover:bg-slate-700 dark:hover:text-medical-300 transition-colors whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu (Scrollable on all phone sizes) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 space-y-4 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-medical-50 dark:hover:bg-slate-800 hover:text-medical-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Quick Specialty Jump on Mobile */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Therapeutic Specialties
              </span>
              <div className="flex flex-wrap gap-1.5">
                {divisionsList.map((divItem) => (
                  <a
                    key={divItem.name}
                    href="#catalog-section"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSearchSelect('', divItem.cat);
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-medical-50/70 dark:bg-slate-800 text-medical-700 dark:text-medical-300 border border-medical-100 dark:border-slate-700"
                  >
                    {divItem.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDoctorModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-medical-600 shadow-md active:scale-95 transition-transform"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Evaluation Sample Kit</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchiseModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 active:scale-95 transition-transform"
              >
                <Building2 className="w-4 h-4 text-medical-600" />
                <span>PCD Pharma Franchise Inquiry</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick-Action Bar (Phones only) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl">
        <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
          <a
            href="#catalog-section"
            className="flex flex-col items-center justify-center py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 active:bg-slate-100 dark:active:bg-slate-800"
          >
            <Sparkles className="w-4 h-4 text-medical-600 dark:text-medical-400 mb-0.5" />
            <span>Formulary</span>
          </a>

          <button
            onClick={() => {
              setSearchOpen(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 active:bg-slate-100 dark:active:bg-slate-800"
          >
            <Search className="w-4 h-4 text-medical-600 dark:text-medical-400 mb-0.5" />
            <span>Search</span>
          </button>

          <button
            onClick={onOpenDoctorModal}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-medical-600 text-white shadow-sm active:scale-95 transition-transform"
          >
            <Stethoscope className="w-4 h-4 mb-0.5" />
            <span>Sample Kit</span>
          </button>

          <button
            onClick={onOpenBasket}
            className="relative flex flex-col items-center justify-center py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 active:bg-slate-100 dark:active:bg-slate-800"
          >
            <ShoppingBag className="w-4 h-4 text-medical-600 dark:text-medical-400 mb-0.5" />
            <span>Basket {sampleCount > 0 ? `(${sampleCount})` : ''}</span>
          </button>
        </div>
      </div>
    </>
  );
}
