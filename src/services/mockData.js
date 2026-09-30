export const HOSPITALS = [
  {
    id: "h1",
    name: "Grama Care Primary Health & Triage Hospital",
    country: "India",
    state: "Andhra Pradesh / Telangana",
    district: "Guntur / Rural Hub",
    lat: 16.3067,
    lng: 80.4365,
    zone: "green", // green = adequate resources, red = overloaded, yellow = moderate
    bedsAvailable: 45,
    totalBeds: 60,
    icuBeds: 12,
    specialties: ["General Medicine", "Pediatrics", "Maternity", "Cardiology"],
    schemesSupported: ["Arogya Sri", "Ayushman Bharat", "Government Free Health Card"],
    rating: 4.8,
    phone: "+91 98480 12345",
    antiCorruptionScore: "100% Compliant (Zero Overcharging)",
    priceTariff: [
      { disease: "Normal Delivery", govtCap: "₹0 - Free", privateAvg: "₹35,000", status: "Covered by Arogya Sri" },
      { disease: "Dialysis Session", govtCap: "₹0 (Capped)", privateAvg: "₹4,500/session", status: "Covered" },
      { disease: "Cardiac Angioplasty", govtCap: "₹65,000 (Capped)", privateAvg: "₹2,20,000", status: "Protected Tariff" }
    ]
  },
  {
    id: "h2",
    name: "District Government Multi-Specialty Hospital",
    country: "India",
    state: "Telangana",
    district: "Warangal",
    lat: 17.9784,
    lng: 79.5941,
    zone: "yellow",
    bedsAvailable: 14,
    totalBeds: 150,
    icuBeds: 3,
    specialties: ["Emergency Trauma", "Orthopedics", "Neurology", "General Surgery"],
    schemesSupported: ["Arogya Sri", "Ayushman Bharat"],
    rating: 4.5,
    phone: "+91 870 245 8899",
    antiCorruptionScore: "Verified Transparent Pricing",
    priceTariff: [
      { disease: "Fracture Surgery", govtCap: "₹12,000", privateAvg: "₹75,000", status: "Govt Scheme Eligible" },
      { disease: "Appendectomy", govtCap: "₹15,000", privateAvg: "₹60,000", status: "Govt Scheme Eligible" }
    ]
  },
  {
    id: "h3",
    name: "Red-Alert Emergency PHC Center #4",
    country: "India",
    state: "Andhra Pradesh",
    district: "Kurnool Rural",
    lat: 15.8281,
    lng: 78.0373,
    zone: "red", // Red triage: high bed shortage / emergency overload
    bedsAvailable: 2,
    totalBeds: 25,
    icuBeds: 0,
    specialties: ["First Aid Triage", "Snakebite Care", "Basic Delivery"],
    schemesSupported: ["Arogya Sri"],
    rating: 4.1,
    phone: "+91 8518 220011",
    antiCorruptionScore: "Monitored by Jarvis AI",
    priceTariff: [
      { disease: "Snake Venom Anti-Serum", govtCap: "₹0 - Free Emergency", privateAvg: "₹8,000", status: "100% Free" }
    ]
  },
  {
    id: "h4",
    name: "Kyoto Rural Community Health Center (京都地域医療)",
    country: "Japan",
    state: "Kyoto Prefecture",
    district: "Kameoka",
    lat: 35.0116,
    lng: 135.5768,
    zone: "green",
    bedsAvailable: 30,
    totalBeds: 40,
    icuBeds: 8,
    specialties: ["Geriatric Care", "Rehabilitation", "Tele-Neurology"],
    schemesSupported: ["Japan National Health Insurance (国民健康保険)", "High-Cost Medical Care Benefit"],
    rating: 4.9,
    phone: "+81 75 123 4567",
    antiCorruptionScore: "Strict Ministry Tariff Compliant",
    priceTariff: [
      { disease: "Senior Rehab Session", govtCap: "¥1,500 (30% Co-pay)", privateAvg: "¥12,000", status: "NHI Covered" },
      { disease: "MRI Brain Scan", govtCap: "¥8,000", privateAvg: "¥30,000", status: "NHI Covered" }
    ]
  }
];

export const DOCTORS = [
  {
    id: "d1",
    name: "Dr. Ananya Reddy, MD",
    qualification: "MBBS, MD (General Medicine - AIIMS Delhi)",
    specialty: "General Medicine & Rural Health Specialist",
    hospitalId: "h1",
    hospitalName: "Grama Care Primary Health Hospital",
    experience: "14 Years",
    availability: "Available Now (On Duty)",
    rating: 4.9,
    languages: ["Telugu", "English", "Hindi"],
    fee: "₹0 (Free via Scheme) / ₹150 Private",
    bio: "Dedicated rural health champion. Specializes in diabetes management, infectious diseases, and preventive maternal care."
  },
  {
    id: "d2",
    name: "Dr. K. Srinivas Rao, MS, MCh",
    qualification: "MBBS, MS (Surgery), MCh (Cardiothoracic - Osmania)",
    specialty: "Cardiology & Emergency Heart Care",
    hospitalId: "h1",
    hospitalName: "Grama Care Primary Health Hospital",
    experience: "18 Years",
    availability: "On Call (Emergency)",
    rating: 4.9,
    languages: ["Telugu", "English"],
    fee: "₹0 (Arogya Sri Covered)",
    bio: "Performs free pediatric heart surgeries under government Arogya Sri package."
  },
  {
    id: "d3",
    name: "Dr. Kenji Sato (佐藤 健二)",
    qualification: "MD, PhD (Kyoto University School of Medicine)",
    specialty: "Geriatric Medicine & Stroke Triage",
    hospitalId: "h4",
    hospitalName: "Kyoto Rural Community Health Center",
    experience: "16 Years",
    availability: "Available Now",
    rating: 5.0,
    languages: ["Japanese", "English"],
    fee: "¥1,200 (NHI Standard)",
    bio: "Expert in stroke rehabilitation and tele-monitoring for rural elderly residents."
  },
  {
    id: "d4",
    name: "Dr. Rajesh Kumar, DCH",
    qualification: "MBBS, DCH (Pediatrics - JIPMER)",
    specialty: "Child Health & Immunization",
    hospitalId: "h2",
    hospitalName: "District Government Multi-Specialty Hospital",
    experience: "9 Years",
    availability: "Next Shift: 4:00 PM",
    rating: 4.7,
    languages: ["Telugu", "Hindi", "English"],
    fee: "₹0 (Govt Free OPD)",
    bio: "Specialist in childhood malnutrition, seasonal fever triage, and neonatal intensive care."
  }
];

export const SCHEMES = [
  {
    id: "s1",
    title: "Dr. YSR Aarogyasri / Telangana Health Scheme",
    applicableCountry: "India",
    targetGroup: "BPL Families, Rural Farmers & White Ration Card Holders",
    coverageAmount: "Up to ₹5,00,000 per family per year",
    diseasesCovered: "3,250+ surgeries & treatments including Cardiac, Cancer, Kidney Transplant, Polytrauma",
    hospitalsCount: "1,400+ Empaneled Hospitals across AP & TS",
    grannyExplanation: "Grandma, listen! If anyone in our family gets sick, gets heart trouble, or needs a surgery, this card pays the hospital directly up to 5 Lakh Rupees! You don't have to give even one single rupee to doctors or hospital counters. Just show the card!",
    voiceAudioText: "నమస్కారం నాయన/అమ్మ! ఆరోగ్య శ్రీ ద్వారా మీకు 5 లక్షల వరకు ఉచిత వైద్యం లభిస్తుంది. పైసా కూడా చెల్లించనక్కర్లేదు."
  },
  {
    id: "s2",
    title: "Ayushman Bharat (PM-JAY)",
    applicableCountry: "India",
    targetGroup: "Bottom 40% vulnerable families nationwide (SECC Data)",
    coverageAmount: "₹5,00,000 cashless secondary & tertiary hospital care",
    diseasesCovered: "1,949 medical packages (Oncology, Neurosurgery, Orthopedics)",
    hospitalsCount: "28,000+ Empaneled Govt & Private Hospitals across India",
    grannyExplanation: "Grandpa, this is the Central Government Prime Minister health card! It works in any big hospital across India. If you go to Delhi, Hyderabad, or Bangalore, this card gives 5 Lakhs cashless treatment for your family every single year.",
    voiceAudioText: "आयुष्मान भारत योजना के तहत आपके परिवार को हर साल 5 लाख रुपये तक का मुफ्त इलाज किसी भी बड़े अस्पताल में मिलेगा।"
  },
  {
    id: "s3",
    title: "Japan Kokumin Kenko Hoken (国民健康保険)",
    applicableCountry: "Japan",
    targetGroup: "All residents and foreign nationals living in Japan",
    coverageAmount: "70% to 90% of total medical costs paid by state",
    diseasesCovered: "All consultations, surgeries, prescription medicines, emergency ambulance",
    hospitalsCount: "All national clinics and regional hospitals",
    grannyExplanation: "Grandma in Japan, this national health system ensures you only pay 10% to 30% of any doctor bill. Seniors over 75 pay only 10%! And if the bill is big, the High-Cost Benefit caps the maximum you pay each month.",
    voiceAudioText: "国民健康保険により、医療費の負担は1割〜3割に軽減されます。高額医療費制度も適用されます。"
  }
];

export const INITIAL_FAMILY = [
  {
    id: "f1",
    name: "Rameshamma (Grandmother)",
    relation: "Grandmother",
    age: 72,
    gender: "Female",
    bloodGroup: "O+",
    chronicConditions: "Hypertension, Mild Diabetes",
    lastVitals: "BP: 130/85 | Sugar: 140 mg/dL",
    phone: "+91 98765 43210",
    healthCardId: "AROGYA-AP-992812"
  },
  {
    id: "f2",
    name: "Venkata Rao (Father)",
    relation: "Primary Account Holder",
    age: 48,
    gender: "Male",
    bloodGroup: "B+",
    chronicConditions: "None",
    lastVitals: "BP: 120/80 | Normal",
    phone: "+91 98765 43210",
    healthCardId: "ABPMJAY-IND-882190"
  },
  {
    id: "f3",
    name: "Sai Teja (Son)",
    relation: "Son",
    age: 12,
    gender: "Male",
    bloodGroup: "B+",
    chronicConditions: "Seasonal Asthma",
    lastVitals: "SpO2: 98% | Pulse: 78",
    phone: "+91 98765 43210",
    healthCardId: "AROGYA-AP-992813"
  }
];
