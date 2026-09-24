# VidyaPrayog

> **Unified Academia–Industry Collaboration Platform**  
> Bridging the gap between academic learning and industry expectations through AI-driven skill assessment, tailored upskilling roadmaps, verified digital portfolios, and seamless recruitment workflows.

---

## Problem Statement

A substantial gap exists between academic curriculum outcomes and real-world industrial expectations:
- **Students** struggle to identify required skills for target career paths and lack visibility into active hiring rubrics.
- **Industries** spend excessive cycles sifting through unranked resumes to identify job-ready candidates.
- **Academicians & Faculty** lack structured channels to pursue industry sabbaticals, industrial training, Faculty Development Programs (FDPs), and collaborative R&D.
- **Institutions** lack real-time visibility into student skill readiness and industry placement trends.

**VidyaPrayog** delivers a centralized, multi-stakeholder ecosystem connecting Students, Academicians, Industry Recruiters, and Institutional Administrators.

---

## Key Features

### 1. Intelligent Skill Assessment & Gap Profiling
- **Adaptive Evaluation:** Domain-specific questionnaires and technical aptitude tests benchmarked against live industry rubrics.
- **Competency Mapping:** Generates real-time skill spider charts identifying technical and soft-skill deficiencies.
- **Personalized Upskilling Paths:** Automated recommendations of industry-relevant certifications, workshops, and courses to bridge detected gaps before applying.

### 2. Centralized Internship & Placement Hub
- **Semantic Role Matching:** Matches candidates to internships and full-time listings using cosine similarity over skill vectors.
- **Transparent Application Tracking:** Real-time lifecycle tracking across application stages: *Applied -> Shortlisted -> Interview -> Offer*.
- **Candidate Shortlisting:** Skill-first eligibility ranking for recruiters, eliminating manual screening lag.

### 3. Faculty & Academician Portal
- **Faculty Sabbaticals & Training:** Direct access to apply for industry sabbaticals, consultancy roles, and Faculty Development Programs (FDPs).
- **Curriculum Modernization:** Real-time demand signals to help educators align academic coursework with enterprise tech stacks.
- **Collaborative R&D:** Joint innovation initiatives, research grants, and corporate mentorship channels.

### 4. Verifiable Digital Portfolios
- **Proof of Work:** Centralized repository showcasing tamper-proof verified credentials, live projects, hackathons, and internship completion reports.
- **One-Click Export:** Industry-standard verifiable profiles for recruiters and audit bodies.

### 5. Institutional Placement Analytics
- **Readiness Dashboards:** Macro trends for Training & Placement Officers (TPOs) and leadership on batch readiness and hiring rates.
- **Accreditation Support:** Automated records and metrics supporting NAAC/NBA compliance audits.

---

## Architecture & Technical Approach

VidyaPrayog follows an end-to-end modular pipeline:

1. **Ingestion Layer:** Multi-tenant onboarding for Students, Faculty, Recruiters, and Institutions.
2. **AI & Profiling Layer:** Resume parsing (spaCy / LayoutLM), skill extraction, and vectorization using embedding models.
3. **Recommendation Engine:** Vector indexing (Pinecone / Vector DB) and ranking algorithms (Cosine Similarity, XGBoost) for candidate-role matching.
4. **Lifecycle & Alert Services:** Real-time tracking with notification triggers (Twilio / SendGrid) and role-based access control (RBAC).

---

## Tech Stack

- **Frontend:** TypeScript, React.js, Tailwind CSS
- **Mobile Support:** React Native / Progressive Web App (PWA)
- **Backend & APIs:** Node.js / Express, RESTful Services
- **Database & Storage:** PostgreSQL, Redis (Caching), Secure Document Storage
- **AI & Analytics:** Python, LangChain, Vector Embeddings, Scikit-learn / XGBoost
- **Authentication:** Role-Based Access Control (RBAC) / JWT

---

## Getting Started

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/japanchicken898-droid/VidyaPrayog-capfly.git](https://github.com/japanchicken898-droid/VidyaPrayog-capfly.git)
   cd VidyaPrayog-capfly
