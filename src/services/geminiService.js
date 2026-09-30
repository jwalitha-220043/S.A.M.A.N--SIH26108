import { GoogleGenAI } from '@google/genai';

// Initialize Gemini SDK if VITE_GEMINI_API_KEY is present
let aiClient = null;
try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.log('Gemini API key not found in environment, running in smart fallback mode.');
}

export const askJarvisAI = async (userPrompt, activeTab, language = 'English') => {
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are GramaJarvis, an empathetic, highly intelligent AI Healthcare Assistant for rural and urban populations in India and Japan.
User's current language: ${language}.
Current active page tab in app: ${activeTab}.
User's question: "${userPrompt}"

Provide a clear, warm, actionable response (max 3-4 sentences). If they ask about navigation, suggest which feature tab to check (Geo Triage Map, Doctors, Government Schemes, PHC Offline Sync, or Family Vault).`,
      });
      return response.text;
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent built-in fallback:', err);
    }
  }

  // Built-in intelligent context-aware fallback response generator
  const textLower = userPrompt.toLowerCase();
  
  if (textLower.includes('doctor') || textLower.includes('specialist') || textLower.includes('availability')) {
    return `I can help you find top-rated doctors! Check the "Doctors & Hospitals" tab where you can see live availability, degrees, and capped treatment costs under government schemes like Arogya Sri and Ayushman Bharat.`;
  }
  
  if (textLower.includes('map') || textLower.includes('triage') || textLower.includes('red') || textLower.includes('hospital')) {
    return `Navigating to the Smart Geo Triage Map! Red zones indicate high emergency bed shortage, Yellow is moderate, and Green zones have full bed & ICU capacity.`;
  }

  if (textLower.includes('scheme') || textLower.includes('arogya') || textLower.includes('ayushman') || textLower.includes('card') || textLower.includes('free')) {
    return `In the "Government Schemes" section, I can explain Ayushman Bharat and Arogya Sri in simple "Granny Mode" language so you know your 5 Lakh Rupees cashless entitlement without getting cheated by hospital counters!`;
  }

  if (textLower.includes('offline') || textLower.includes('phc') || textLower.includes('record') || textLower.includes('internet')) {
    return `Our PHC Offline Sync keeps all patient vitals and prescriptions safely stored on your phone even without cellular signal. It automatically syncs to government health servers as soon as signal returns!`;
  }

  if (textLower.includes('family') || textLower.includes('member') || textLower.includes('alert') || textLower.includes('sms')) {
    return `You can register your entire family—grandparents, parents, and children—under one phone number in the "Family Vault". GramaJarvis sends SMS and voice message alerts for medicine timings and scheme updates!`;
  }

  return `Greetings! I am GramaJarvis, your voice-activated healthcare assistant. You are currently viewing the ${activeTab} section. How can I assist your health and hospital search today?`;
};

export const explainSchemeGrannyMode = async (schemeName, language = 'Telugu/Hindi/English') => {
  return `Grandma & Grandpa, listen closely! Under ${schemeName}, your family gets up to ₹5,00,000 free treatment every year! You don't need to pay cash at the hospital counter. Just show your health card, and the government covers all surgeries and medicines directly. GramaJarvis is here to protect you from any hospital cheating!`;
};

export const inspectBillAntiCorruption = (treatmentName, billedPrice, govtCapPrice) => {
  const billedNum = parseFloat(billedPrice.replace(/[^0-9.]/g, '')) || 0;
  const capNum = parseFloat(govtCapPrice.replace(/[^0-9.]/g, '')) || 0;

  if (billedNum > capNum && capNum > 0) {
    const diff = billedNum - capNum;
    return {
      isOvercharging: true,
      message: `🚨 WARNING: Potential Hospital Overcharging Detected! Billed amount (₹${billedNum.toLocaleString()}) exceeds standard Government Capped Tariff (₹${capNum.toLocaleString()}) by ₹${diff.toLocaleString()}! GramaJarvis anti-corruption shield flags this for immediate review.`,
      severity: "RED ALERT"
    };
  } else {
    return {
      isOvercharging: false,
      message: `✅ PRICE VERIFIED: The billed price of ₹${billedNum.toLocaleString()} is within the legal government tariff limit (₹${capNum.toLocaleString()}). No corruption detected.`,
      severity: "GREEN SAFE"
    };
  }
};
