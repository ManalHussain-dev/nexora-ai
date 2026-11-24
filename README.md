# Nexora AI — Enterprise Operations & Market Intelligence Hub

A production-grade, enterprise AI operations platform combining real-time model telemetry, strategic market intelligence, automated scope-of-work generation, and customer sentiment triage.

![Nexora AI Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Executive Overview

**Nexora AI** is engineered for modern digital product studios, technical founders, and enterprise consulting teams who require automated intelligence pipelines, sub-second latency analytics, and production-ready deliverables.

* **Developer**: Manal Hussain
* **Architecture**: React 19, Vite, Tailwind CSS v4, Motion, Google Gemini API
* **Status**: Production Ready & Fully Deployed

---

## 🛠️ Key Modules & Capabilities

### 1. 📊 Executive Operations & Telemetry Dashboard
* Real-time monitoring of inference volume, token velocity (P95 latency), and cost efficiency.
* Interactive daily inference volume charts and model workload distribution (Gemini 2.5 Flash, Gemini 2.5 Pro, Text-Embedding-004).
* Live stream of automated workflow logs with sub-second timestamps and status indicators.

### 2. 🧠 Market & Competitor Intelligence Radar
* Ingests target company, industry, and competitor sets to generate complete executive SWOT analyses, feature gap matrixes, and strategic market positioning roadmaps.
* Instant 1-click presets for popular enterprise comparisons (Linear vs. Jira, Supabase vs. Firebase).
* One-click clipboard copy and markdown file export.

### 3. 📄 Proposal & SOW Architecture Studio
* Translates business requirements, budget limits, and timelines into structured, formal client Scopes of Work (SOW).
* Includes technical architecture blueprints, sprint-by-sprint milestones, and security SLAs.
* Formatted for instant client signature, PDF export, or printing.

### 4. 🔍 Customer Feedback & Sentiment Classifier
* Evaluates raw feedback across channels (Zendesk, G2, Trustpilot, App Store).
* Computes sentiment polarity, extracts urgent engineering bug tickets, and drafts empathetic support responses.

### 5. 💬 Interactive AI Co-Pilot Console
* Multi-turn conversational engineering console with enterprise prompt templates (PostgreSQL indexing, REST API design, security audits).
* Real-time streaming response simulation and instant code/markdown copy.

### 6. 🔑 API Key Management & RBAC Scopes
* Granular token generation (`pk_live_...`) with custom permission scopes (`read:analytics`, `write:ai_inferences`, `admin:billing`).
* Role-based access control with live toggle between **Administrator** and **Lead Analyst**.

---

## 💻 Tech Stack & Dependencies

* **Frontend**: React 19, Vite 8, Tailwind CSS v4
* **Animations**: Motion (`motion/react`), Canvas Confetti
* **Icons**: Lucide Icons
* **AI Engine**: Google Gemini API (`gemini-2.5-flash`) with high-fidelity fallback intelligence engine for zero-friction client demos

---

## 🚀 Quick Start Locally

```bash
# Clone the repository
git clone https://github.com/ManalHussain-dev/nexora-ai.git

# Enter project directory
cd nexora-ai

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
