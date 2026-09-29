# Femura Pharma — Premium Modern Frontend (2026 Edition)

Welcome to the newly re-engineered, high-performance web frontend for **Femura Pharmaceuticals Private Limited** ([femurapharma.com](https://femurapharma.com)).

Designed to deliver **immediate visual impact within the first 3–5 seconds**, featuring cutting-edge 2026 aesthetics, molecular gradients, glassmorphism, responsive micro-interactions, dark/light theme persistence, and a future-proof decoupled frontend architecture.

---

## 🔬 Brand Identity & Heritage
The name **Femura** represents the synergy of two medical pillars:
* **"Fem"**: Devotion to Women’s Obstetrics, Maternal Care, and Gynaecological Health.
* **"Femur"**: The body's strongest bone, anchoring our leadership in Orthopaedic Bio-Peptides and bone remodeling.

---

## 🚀 Key Features & Highlights

### 1. 2026 Visual Design & Hero
* **Instant Impression**: Deep navy/slate backdrop (`#0c1322`) infused with Femura's signature magenta (`#d2157b`), bioactive cyan, and emerald glows.
* **Interactive 3D Formulation Card**: Toggle between flagship products (*Calmagic HD* vs *Osteopep XT*) with real-time bioavailability assay visualizers.
* **Dual Action CTAs**: Instant catalog jump or dedicated Doctor Clinical Sample request.
* **Live Search**: Instant autocomplete formulary search directly in the hero and top navigation.

### 2. Evidence-Based Formulary & Interactive Catalog
* **Therapeutic Division Filtering**: Gynecology, Orthopaedics, Gastroenterology, Critical Care, Endocrinology, and Neurology.
* **Dosage Form Selector**: Filter by Tablets, Softgels, Nanoshots, Syrups, Injections, and Sachets.
* **Interactive Formulation Comparison Matrix**: Compare up to 3 formulations side-by-side (Composition, Pharmacokinetics, MRP, B2B Pricing, and Indications).
* **Clinical Monograph Modal**: Tabbed view displaying Clinical Overview, Full Composition Assay, Mechanism of Action (MOA), Prescribing Guidelines, and simulated PDF download.
* **Realistic UI States**:
  * Dedicated **Skeleton Loader** (with interactive "Test Loader" button for demonstration).
  * Error state with retry handling.
  * Empty state with filter reset.

### 3. Physician & Institutional Portals
* **Doctor Evaluation Sample Kit Modal**: Multi-step request for Registered Medical Practitioners (RMPs) with verification number, clinic address, and formulation checklist.
* **Sample Basket / B2B RFQ Drawer**: Slide-over cart managing sample quantities with confetti celebration upon dispatch confirmation.
* **PCD Pharma Franchise Portal**: State & district territory checker with monopoly rights inquiry.
* **Interactive Contact Section**: Pre-configured WhatsApp direct chat link, toll-free helpline, and validated contact form.

### 4. Technical Architecture (Frontend-First, API-Ready)
Built strictly following **clean architecture** to allow 100% painless backend replacement:

```text
src/
├── api/
│   └── client.js             # Abstracted API client with mock latency simulator
├── components/               # Modular UI components (Navbar, Hero, Catalog, Modals, etc.)
│   ├── AboutSection.jsx
│   ├── B2BFranchiseModal.jsx
│   ├── ClinicalInsights.jsx
│   ├── ContactSection.jsx
│   ├── DivisionShowcase.jsx
│   ├── DoctorSampleModal.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductCatalog.jsx
│   ├── ProductComparisonModal.jsx
│   ├── ProductModal.jsx
│   ├── QualitySection.jsx
│   ├── SampleBasketDrawer.jsx
│   ├── TestimonialsSection.jsx
│   └── TrustBar.jsx
├── context/
│   └── ToastContext.jsx      # Global toast notification provider
├── data/                     # Realistic, clinically accurate Femura datasets
│   ├── company.js            # Registered Basavanagudi address, certifications, stats
│   ├── divisions.js          # The 6 core therapeutic divisions
│   ├── faq.js                # Frequently asked clinical & franchise questions
│   ├── products.js           # 14 complete formulations (Calmagic, Osteopep, Livmax, etc.)
│   ├── research.js           # Peer-reviewed whitepapers & trial monographs
│   └── testimonials.js       # Verified doctor quotes & partner hospital chains
├── hooks/
│   ├── useProducts.js        # Products filter, search, sort, and comparison state
│   ├── useSampleBasket.js    # Doctor sample cart & RFQ drawer state
│   └── useTheme.js           # Dark / Light theme toggle with local storage persistence
└── services/
    ├── articleService.js     # Research article service
    ├── companyService.js     # Corporate & testimonial service
    ├── inquiryService.js     # Sample requests, RFQs, franchise inquiries
    └── productService.js     # Formulary query, filter, and detail service
```

---

## 🛠️ Running Locally

The application is currently running at:
**[http://localhost:3000](http://localhost:3000)**

To run commands manually in PowerShell:
```powershell
# Set Node into path if needed
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH

# Start Vite Development Server
npm.cmd run dev

# Generate Production Build
npm.cmd run build

# Preview Production Build
npm.cmd run preview
```

---

## 🔌 Connecting to a Real Backend Later
1. Open `src/api/client.js`.
2. Toggle `USE_MOCK = false` and set `API_BASE_URL` to your production endpoint (e.g. `https://api.femurapharma.com/v1`).
3. The services in `src/services/` (`productService.js`, `inquiryService.js`) will seamlessly route to the live REST API without changing UI components!
