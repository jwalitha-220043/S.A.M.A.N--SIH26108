// Universal Speech Synthesis and Recognition Service for GramaJarvis

class SpeechService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.currentLanguage = 'en-IN'; // Default India English

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.currentLanguage;
    }
  }

  setLanguage(langCode) {
    // Map standard language codes (te-IN, hi-IN, en-IN, ja-JP, ta-IN, kn-IN)
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  speak(text, lang = null, onEndCallback = null) {
    if (!this.synthesis) return;

    // Stop any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = lang || this.currentLanguage;
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly slower for warmth & clarity
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = this.synthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLang) || v.lang.includes(targetLang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  startListening(onResult, onError, onEnd) {
    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      if (onError) onError('Speech Recognition is not supported in this browser.');
      return;
    }

    if (this.isListening) return;

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      this.isListening = false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
