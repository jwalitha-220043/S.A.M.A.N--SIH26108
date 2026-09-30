# S.A.M.A.N. — Standards Applicability & Mandatory-Compliance Analysis Navigator

> **Smart India Hackathon 2026 Problem Statement SIH26108**  
> **Organization:** Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution  
> **Tagline:** *From Tender to Compliance. With Evidence.*

---

## 📌 Executive Overview

**S.A.M.A.N.** is an AI-powered, evidence-backed procurement compliance intelligence system designed for Indian Standards (BIS), Quality Control Orders (QCOs), amendments, and mandatory certification verification.

Unlike standard black-box RAG implementations or simple search tools, S.A.M.A.N. evaluates compliance risks deterministically using a **Temporal Compliance Knowledge Graph** (`PRODUCT → APPLICABLE_STANDARD → VERSION → AMENDMENT → TEST_REQUIREMENT → QCO`).

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons, FontAwesome
- **Engine Stack:** Model-Agnostic LLM Layer, Temporal Compliance Knowledge Graph Engine, Evidence Provenance Engine
- **Data Integrations:** BIS Published Standards (23,890+), Gazette Quality Control Orders (QCOs), GeM e-Procurement Portal Specification Exporter

---

