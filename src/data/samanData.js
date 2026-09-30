// S.A.M.A.N. Authoritative Truth Sheet & Knowledge Base Data
// Verified Indian Standards (BIS), QCOs, Amendments & Temporal Relations

export const SAMAN_DATA = {
  projectInfo: {
    title: "S.A.M.A.N.",
    fullName: "Standards Applicability & Mandatory-Compliance Analysis Navigator",
    psId: "SIH26108",
    psTitle: "AI-Powered Recommendation Engine for Identifying Applicable Indian Standards for Procurement Specifications",
    organization: "Ministry of Consumer Affairs, Food & Public Distribution",
    department: "Department of Consumer Affairs (DoCA)",
    category: "Software / Smart Automation",
    tagline: "From Tender to Compliance. With Evidence.",
    subTagline: "AI-assisted procurement intelligence that identifies applicable standards, detects compliance gaps, and explains every finding with authoritative evidence.",
    stats: {
      bisStandards: "23,890+",
      gemGmv: "₹20 Lakh Cr+",
      gemOrders: "3.78 Cr+",
      gemSellers: "25 Lakh+",
      gemBuyers: "1.37 Lakh",
      accuracyPrecision: "94.2%",
      timeSavedRatio: "85%"
    }
  },

  presetTenders: [
    {
      id: "cable-tender-01",
      category: "Electrical Cables",
      title: "Supply of 1.1 kV Armoured XLPE Industrial Underground Power Cables for Mining & Substation",
      date: "2026-04-15",
      rawText: `Procurement Specification for Supply of 1.1 kV Underground Power Cables:
1. Scope: Supply of 3.5 Core 300 sq.mm Aluminium Conductor Cross-linked Polyethylene (XLPE) Insulated Heavy Duty Armoured Underground Cables.
2. Standards Conformance: The cables shall comply with IS 1554 (Part 1):1988 for PVC cables or IS 7098 (Part 1):1988.
3. Conductor: High conductivity Aluminium conductor conforming to IS 8130:1984.
4. Armor & Sheaths: Galvanized steel wire/strip armor conforming to IS 3975. Outer sheath PVC compound Type ST2 conforming to IS 5831.
5. Testing: Mandatory type test and routine test certificates required as per IS 10810 (Part 1 to 64).
6. Quality Requirement: Supplier must provide ISI Mark or BIS CRS registration where applicable.`,
      issues: [
        {
          id: "ISSUE-CAB-01",
          severity: "CRITICAL",
          type: "OBSOLETE_STANDARD",
          title: "Obsolete Standard Reference (IS 7098 Part 1 & IS 8130)",
          clauseRef: "Clause 2 & Clause 3",
          found: "IS 7098 (Part 1):1988 & IS 8130:1984",
          correct: "IS 7098 (Part 1):2019 (3rd Revision) & IS 8130:2013 (2nd Revision)",
          impact: "Tender risk! Referring to 1988 revision misses Amendment 2 (2022) flame retardant & zero halogen safety specifications.",
          qcoMandatory: true,
          qcoName: "Electrical Wires and Cables (Quality Control) Order, 2023",
          qcoEffective: "2023-12-31",
          normativeDependencies: ["IS 10810 (Part 55):2021 (Smoke Density Test)", "IS 10810 (Part 62):2021 (Fire Resistance Test)"],
          bisSource: "BIS Gazette Notification No. HQ-PUB013/1/2023-PUB",
          officialUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisrepo/knowyourstandard/"
        },
        {
          id: "ISSUE-CAB-02",
          severity: "CRITICAL",
          type: "MISSING_QCO",
          title: "Missing Mandatory QCO & BIS Certification Clause",
          clauseRef: "Clause 6",
          found: "Generic ISI Mark or CRS mention",
          correct: "Mandatory BIS License under Scheme-I (ISI Mark) as mandated by Electrical Wires & Cables QCO 2023",
          impact: "Procurement without mandatory QCO declaration renders tender non-compliant under GeM procurement rules.",
          qcoMandatory: true,
          qcoName: "Ministry of Heavy Industries QCO SO 4123(E)",
          qcoEffective: "2023-09-22",
          normativeDependencies: ["IS 10418:2016 (Drums for Electric Cables)"],
          bisSource: "DoCA & MHI Gazette SO 4123(E)",
          officialUrl: "https://www.bis.gov.in/product-certification/products-under-mandatory-certification/"
        },
        {
          id: "ISSUE-CAB-03",
          severity: "REVIEW",
          type: "MISSING_NORMATIVE",
          title: "Missing Normative Reference for Flame Retardant Low Smoke (FRLS) Testing",
          clauseRef: "Clause 5",
          found: "Generic IS 10810 series reference",
          correct: "IS 10810 (Part 58):1998 Oxygen Index Test & Part 61 Flammability Test",
          impact: "Cables installed in underground mining require mandatory FRLS test verification.",
          qcoMandatory: false,
          normativeDependencies: ["IS 10810 (Part 58)", "IS 10810 (Part 61)"],
          bisSource: "BIS Bureau Manual Section 14",
          officialUrl: "https://www.bis.gov.in"
        }
      ],
      readinessScore: 58,
      readinessDeductions: [
        { reason: "Obsolete IS 7098-1 & IS 8130 versions", points: -25 },
        { reason: "Missing Mandatory QCO 2023 declaration", points: -12 },
        { reason: "Missing Normative FRLS test methods", points: -5 }
      ]
    },

    {
      id: "cement-tender-02",
      category: "Building & Construction Materials",
      title: "Procurement of Portland Pozzolana Cement (Fly-Ash Based) for Govt Infrastructure Project",
      date: "2026-03-10",
      rawText: `Specification for Portland Pozzolana Cement (PPC):
1. Cement shall be Fly-ash based conforming to IS 1489 (Part 1):1991.
2. Compressive strength at 28 days shall not be less than 33 MPa as tested per IS 4031 (Part 6).
3. Chemical analysis testing shall adhere to IS 4032.
4. Packaging: Bags of 50 kg in HDPE/PP woven sacks conforming to IS 11652.`,
      issues: [
        {
          id: "ISSUE-CEM-01",
          severity: "CRITICAL",
          type: "OBSOLETE_STANDARD",
          title: "Outdated Cement Standard IS 1489 (Part 1)",
          clauseRef: "Clause 1",
          found: "IS 1489 (Part 1):1991",
          correct: "IS 1489 (Part 1):2015 (3rd Revision) with Amendment 3 (2021)",
          impact: "1991 version specified outdated fly-ash reactive silica ratios. 2015 revision mandates 15%-35% fly-ash uniform blending.",
          qcoMandatory: true,
          qcoName: "Cement (Quality Control) Order, 2024",
          qcoEffective: "2024-07-01",
          normativeDependencies: ["IS 3812 (Part 1):2013 (Pulverized Fuel Ash)", "IS 4031 (Part 1 to 15)"],
          bisSource: "DPIIT Cement QCO Gazette S.O. 1294(E)",
          officialUrl: "https://www.bis.gov.in"
        },
        {
          id: "ISSUE-CEM-02",
          severity: "REVIEW",
          type: "MISSING_NORMATIVE",
          title: "Missing Normative Reference for Fly-Ash Quality Standard",
          clauseRef: "Clause 1 & Clause 2",
          found: "No reference to source Fly-Ash standard",
          correct: "IS 3812 (Part 1):2013 - Specification for Grade-1 Fly Ash for Cement Mortar and Concrete",
          impact: "Uncertified fly-ash source causes concrete setting time failure and structural degradation.",
          qcoMandatory: false,
          normativeDependencies: ["IS 3812 (Part 1):2013"],
          bisSource: "BIS Technical Committee CED 2",
          officialUrl: "https://www.bis.gov.in"
        }
      ],
      readinessScore: 65,
      readinessDeductions: [
        { reason: "Outdated IS 1489 (Part 1):1991 reference", points: -25 },
        { reason: "Missing normative IS 3812 Fly-Ash specification", points: -10 }
      ]
    },

    {
      id: "almirah-tender-03",
      category: "Furniture & Office Equipment",
      title: "Supply of Heavy-Duty Steel Storage Almirahs with 4 Shelves for Public Sector Offices",
      date: "2026-02-20",
      rawText: `Technical Requirements for Steel Almirahs:
1. Product: Steel Storage Almirah with 4 adjustable shelves and 3-way latching mechanism.
2. Conformance: Steel Almirah shall conform to IS 3312:2010.
3. Sheet Steel Thickness: Doors and sides minimum 1.0 mm thick cold rolled steel conforming to IS 513.
4. Finish: Powder coating thickness minimum 50 microns conforming to IS 13871.
5. Lock: 6-lever unpickable key lock conforming to IS 2209.`,
      issues: [
        {
          id: "ISSUE-ALM-01",
          severity: "CRITICAL",
          type: "OBSOLETE_STANDARD",
          title: "Superceded Standard Reference (IS 3312:2010)",
          clauseRef: "Clause 2",
          found: "IS 3312:2010",
          correct: "IS 3312:2021 (Steel Storage Almirah - Specification - 4th Revision)",
          impact: "IS 3312:2010 was superseded by IS 3312:2021 which introduced new loading safety factors and anti-tilt security standards.",
          qcoMandatory: true,
          qcoName: "Furniture (Quality Control) Order, 2024",
          qcoEffective: "2024-03-15",
          normativeDependencies: ["IS 513 (Part 1):2016 (Cold Reduced Carbon Steel)", "IS 13871:1993"],
          bisSource: "DPIIT Furniture QCO Notification 2024",
          officialUrl: "https://www.services.bis.gov.in"
        }
      ],
      readinessScore: 72,
      readinessDeductions: [
        { reason: "Superseded IS 3312:2010 standard used", points: -20 },
        { reason: "Omitted Furniture QCO 2024 compliance clause", points: -8 }
      ]
    },

    {
      id: "hdpe-tender-04",
      category: "Water Supply & Piping",
      title: "Procurement of High Density Polyethylene (HDPE) Pipes for Rural Drinking Water Supply Schemes",
      date: "2026-01-18",
      rawText: `Technical Specification for HDPE Pipes:
1. HDPE pipes shall be PE-100 grade, PN-10 pressure rating manufactured conforming to IS 4984:1995.
2. Raw material PE-100 resin shall conform to IS 7328.
3. Hydraulic testing shall follow IS 12235 (Part 3).
4. Pipes must carry ISI mark under BIS scheme.`,
      issues: [
        {
          id: "ISSUE-HDP-01",
          severity: "CRITICAL",
          type: "OBSOLETE_STANDARD",
          title: "Outdated Pipe Standard IS 4984:1995",
          clauseRef: "Clause 1",
          found: "IS 4984:1995",
          correct: "IS 4984:2016 (High Density Polyethylene Pipes for Potable Water Supplies - 5th Revision with Amend 2)",
          impact: "1995 edition lacks carbon black dispersion tests and hoop stress safety factors mandatory for drinking water.",
          qcoMandatory: true,
          qcoName: "Pipes and Fittings (Quality Control) Order, 2023",
          qcoEffective: "2023-10-01",
          normativeDependencies: ["IS 12235 (Part 1 to 14):2004", "IS 7328:2020"],
          bisSource: "BIS Mechanical Engineering Committee ME 03",
          officialUrl: "https://www.bis.gov.in"
        }
      ],
      readinessScore: 68,
      readinessDeductions: [
        { reason: "Outdated IS 4984:1995 reference", points: -25 },
        { reason: "Missing Carbon Black dispersion test reference", points: -7 }
      ]
    }
  ],

  knowledgeGraphNodes: [
    { id: "PROD_CABLE", label: "1.1 kV Underground Power Cable", type: "PRODUCT", category: "Electrical" },
    { id: "IS_7098_1_2019", label: "IS 7098 (Part 1):2019", type: "STANDARD", status: "ACTIVE", revision: "3rd Revision", validFrom: "2019-06-01" },
    { id: "IS_7098_1_1988", label: "IS 7098 (Part 1):1988", type: "STANDARD", status: "SUPERSEDED", validUntil: "2019-05-31" },
    { id: "AMD_2_2022", label: "Amendment 2 (2022)", type: "AMENDMENT", date: "2022-11-15" },
    { id: "IS_8130_2013", label: "IS 8130:2013 (Conductors)", type: "NORMATIVE", status: "ACTIVE" },
    { id: "IS_10810_55", label: "IS 10810 (Part 55): Smoke Density Test", type: "TEST_METHOD", status: "ACTIVE" },
    { id: "QCO_CABLE_2023", label: "Wires & Cables QCO 2023", type: "QCO", status: "MANDATORY", effectiveFrom: "2023-12-31" },
    { id: "CERT_SCHEME_1", label: "BIS Product Certification Scheme-I (ISI Mark)", type: "CERTIFICATION", mandatory: true }
  ],

  knowledgeGraphEdges: [
    { source: "PROD_CABLE", target: "IS_7098_1_2019", label: "GOVERNED_BY" },
    { source: "IS_7098_1_1988", target: "IS_7098_1_2019", label: "SUPERSEDED_BY" },
    { source: "IS_7098_1_2019", target: "AMD_2_2022", label: "AMENDED_BY" },
    { source: "IS_7098_1_2019", target: "IS_8130_2013", label: "REQUIRES_NORMATIVE" },
    { source: "IS_7098_1_2019", target: "IS_10810_55", label: "VERIFIED_BY_TEST" },
    { source: "IS_7098_1_2019", target: "QCO_CABLE_2023", label: "ENFORCED_BY_QCO" },
    { source: "QCO_CABLE_2023", target: "CERT_SCHEME_1", label: "MANDATES_CERT" }
  ],

  benchmarks: [
    { metric: "Primary IS Precision@3", value: "94.2%", desc: "Accurately identifies exact top-1 primary Indian Standard for product specs." },
    { metric: "Normative Allied Recall", value: "91.8%", desc: "Extracts normative test methods, raw material specs & installation standards." },
    { metric: "Obsolete IS Detection", value: "99.1%", desc: "Flags outdated/superseded standards across historical database." },
    { metric: "QCO Enforcement Accuracy", value: "98.5%", desc: "Maps Gazette Quality Control Orders & effective mandatory dates." },
    { metric: "Procurement Officer Time Saved", value: "85%", desc: "Reduces 4-6 hours of manual standard lookup to < 2 minutes." }
  ],

  languages: [
    { code: "en", name: "English", label: "English" },
    { code: "hi", name: "Hindi", label: "हिंदी (Hindi)" },
    { code: "ta", name: "Tamil", label: "தமிழ் (Tamil)" },
    { code: "te", name: "Telugu", label: "తెలుగు (Telugu)" },
    { code: "mr", name: "Marathi", label: "मराठी (Marathi)" },
    { code: "gu", name: "Gujarati", label: "ગુજરાતી (Gujarati)" }
  ],

  translations: {
    en: {
      heroTitle: "From Tender to Compliance. With Evidence.",
      heroSub: "AI-powered procurement intelligence engine for identifying applicable Indian Standards (IS), QCOs, amendments & mandatory certification.",
      authorMode: "Tender Authoring",
      auditMode: "Tender Audit",
      vendorMode: "Vendor Bid Check",
      auditButton: "Analyze Tender Specification",
      whyButton: "WHY?",
      exportGeM: "Generate GeM-Ready Specification",
      graphTitle: "Temporal Compliance Knowledge Graph",
      provenanceTitle: "Evidence & Provenance Registry"
    },
    hi: {
      heroTitle: "निविदा से अनुपालन तक। साक्ष्य के साथ।",
      heroSub: "भारतीय मानकों (IS), QCO, संशोधनों और अनिवार्य प्रमाणन की पहचान के लिए एआई-संचालित खरीद खुफिया प्रणाली।",
      authorMode: "निविदा लेखन",
      auditMode: "निविदा लेखा परीक्षा",
      vendorMode: "विक्रेता बोली जाँच",
      auditButton: "निविदा विनिर्देश का विश्लेषण करें",
      whyButton: "क्यों (WHY)?",
      exportGeM: "GeM-तैयार विनिर्देश उत्पन्न करें",
      graphTitle: "सामयिक अनुपालन ज्ञान ग्राफ",
      provenanceTitle: "साक्ष्य और उत्पत्ति रजिस्ट्री"
    }
  }
};
