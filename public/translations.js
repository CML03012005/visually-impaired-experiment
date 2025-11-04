// public/translations.js
const translations = {
  en: {
    // Header
    siteName: "Object Recognition and Navigation",
    home: "Home",
    objectInfo: "Object Information",
    
    // Hero Section
    heroTitle: "Enhancing Object Recognition and Navigation for Visually Impaired Person using Deep Learning Algorithm",
    heroDescription: "Integrating deep-learning object detection to deliver real-time guidance and obstacle alerts for visually impaired users.",
    
    // Feature Cards
    captureTitle: "Capture Image",
    captureDesc: "Use your device camera to capture an object.",
    uploadTitle: "Upload Image",
    uploadDesc: "Upload an image from your gallery for analysis.",
    infoTitle: "Object Information",
    infoDesc: "Learn more about Object Recognition and Navigation and their impact.",
    
    // Detection Section
    detectTitle: "Detect Objects",
    detectInstructions: "Select or capture an image for object detection:",
    useCamera: "Use Camera",
    uploadImage: "Upload Image",
    capturePhoto: "Capture Photo",
    analyzeImage: "Analyze Image",
    
    // Image Boxes
    originalImage: "Original Image",
    detectionResult: "Detection Result",
    noImageSelected: "No image selected",
    resultWillAppear: "Analysis result will appear here",
    
    // Loading
    analyzing: "Analyzing Image...",
    mayTakeTime: "This may take 5-15 seconds",
    
    // Results
    detectedObjects: "Detected Objects",
    objects: "objects",
    object: "object",
    confidence: "confidence",
    noObjectsDetected: "No objects detected in this image",
    
    // Errors
    cameraNotReady: "Camera not ready yet.",
    cannotAccessCamera: "Cannot access camera.",
    failedToAnalyze: "Failed to analyze image.",
    noImageToAnalyze: "No image to analyze. Upload a photo or start the camera.",
    tooManyRequests: "Too many requests. Please try again later.",
    
    // Footer
    copyright: "© 2025 Object Recognition and Navigation. All rights reserved.",
    
    // Voice announcements
    voiceDetected: "Detected",
    voiceWith: "with",
    voiceConfidence: "confidence",
    voiceNoObjects: "No objects detected in this image",
    voiceAnalysisComplete: "Analysis complete"
  },
  
  tl: { // Tagalog
    // Header
    siteName: "Pagkilala ng Bagay at Nabigasyon",
    home: "Tahanan",
    objectInfo: "Impormasyon ng Bagay",
    
    // Hero Section
    heroTitle: "Pagpapahusay ng Pagkilala ng Bagay at Nabigasyon para sa Taong may Kapansanan sa Paningin gamit ang Deep Learning Algorithm",
    heroDescription: "Pagsasama ng deep-learning object detection upang magbigay ng real-time na gabay at babala sa sagabal para sa mga gumagamit na may kapansanan sa paningin.",
    
    // Feature Cards
    captureTitle: "Kunan ng Larawan",
    captureDesc: "Gamitin ang camera ng iyong device upang kunan ang isang bagay.",
    uploadTitle: "Mag-upload ng Larawan",
    uploadDesc: "Mag-upload ng larawan mula sa iyong gallery para sa pagsusuri.",
    infoTitle: "Impormasyon ng Bagay",
    infoDesc: "Matuto pa tungkol sa Pagkilala ng Bagay at Nabigasyon at ang kanilang epekto.",
    
    // Detection Section
    detectTitle: "Tuklasin ang mga Bagay",
    detectInstructions: "Pumili o kumuha ng larawan para sa pagkilala ng bagay:",
    useCamera: "Gamitin ang Camera",
    uploadImage: "Mag-upload ng Larawan",
    capturePhoto: "Kunan ng Litrato",
    analyzeImage: "Suriin ang Larawan",
    
    // Image Boxes
    originalImage: "Orihinal na Larawan",
    detectionResult: "Resulta ng Pagtuklas",
    noImageSelected: "Walang napiling larawan",
    resultWillAppear: "Ang resulta ng pagsusuri ay lalabas dito",
    
    // Loading
    analyzing: "Sinusuri ang Larawan...",
    mayTakeTime: "Maaaring tumagal ng 5-15 segundo",
    
    // Results
    detectedObjects: "Natuklasang mga Bagay",
    objects: "mga bagay",
    object: "bagay",
    confidence: "tiwala",
    noObjectsDetected: "Walang natuklasang bagay sa larawang ito",
    
    // Errors
    cameraNotReady: "Ang camera ay hindi pa handa.",
    cannotAccessCamera: "Hindi ma-access ang camera.",
    failedToAnalyze: "Nabigo ang pagsusuri ng larawan.",
    noImageToAnalyze: "Walang larawan na susuriin. Mag-upload ng litrato o simulan ang camera.",
    tooManyRequests: "Masyadong maraming kahilingan. Pakisubukan ulit mamaya.",
    
    // Footer
    copyright: "© 2025 Pagkilala ng Bagay at Nabigasyon. Lahat ng karapatan ay nakalaan."
  },
  
  ceb: { // Cebuano
    // Header
    siteName: "Pag-ila sa Butang ug Nabigasyon",
    home: "Balay",
    objectInfo: "Impormasyon sa Butang",
    
    // Hero Section
    heroTitle: "Pagpauswag sa Pag-ila sa Butang ug Nabigasyon alang sa Tawo nga Adunay Kakulangan sa Panan-aw gamit ang Deep Learning Algorithm",
    heroDescription: "Paghiusa sa deep-learning object detection aron makahatag og real-time nga giya ug pasidaan sa mga babag alang sa mga tiggamit nga adunay kakulangan sa panan-aw.",
    
    // Feature Cards
    captureTitle: "Kuhaa ang Hulagway",
    captureDesc: "Gamita ang camera sa imong device aron kuhaan ang usa ka butang.",
    uploadTitle: "Pag-upload og Hulagway",
    uploadDesc: "Pag-upload og hulagway gikan sa imong gallery alang sa pagsusi.",
    infoTitle: "Impormasyon sa Butang",
    infoDesc: "Tun-i pa bahin sa Pag-ila sa Butang ug Nabigasyon ug ang ilang epekto.",
    
    // Detection Section
    detectTitle: "Pangitaa ang mga Butang",
    detectInstructions: "Pilia o kuhaa ang hulagway alang sa pag-ila sa butang:",
    useCamera: "Gamita ang Camera",
    uploadImage: "Pag-upload og Hulagway",
    capturePhoto: "Kuhaa ang Litrato",
    analyzeImage: "Susiha ang Hulagway",
    
    // Image Boxes
    originalImage: "Orihinal nga Hulagway",
    detectionResult: "Resulta sa Pagpangita",
    noImageSelected: "Walay napiling hulagway",
    resultWillAppear: "Ang resulta sa pagsusi mogawas dinhi",
    
    // Loading
    analyzing: "Gisusihay ang Hulagway...",
    mayTakeTime: "Mahimong molungtad og 5-15 ka segundo",
    
    // Results
    detectedObjects: "Nakit-ang mga Butang",
    objects: "mga butang",
    object: "butang",
    confidence: "kasigurohan",
    noObjectsDetected: "Walay nakit-ang butang sa kini nga hulagway",
    
    // Errors
    cameraNotReady: "Ang camera wala pa andam.",
    cannotAccessCamera: "Dili ma-access ang camera.",
    failedToAnalyze: "Napakyas ang pagsusi sa hulagway.",
    noImageToAnalyze: "Walay hulagway nga susiha. Pag-upload og litrato o sugdi ang camera.",
    tooManyRequests: "Daghan kaayong mga hangyo. Palihug sulayi pag-usab sa ulahi.",
    
    // Footer
    copyright: "© 2025 Pag-ila sa Butang ug Nabigasyon. Tanang katungod gitagana."
  }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
  localStorage.setItem('language', lang);
}

// Get translation
function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['en'][key] || key;
}

// Apply translations to page
function applyTranslations() {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];
    
    if (translation) {
      // Check if it's a placeholder
      if (element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Update language selector
  const langSelector = document.getElementById('languageSelector');
  if (langSelector) {
    langSelector.value = lang;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      // Save selected language
      setLanguage(langSelect.value);
      applyTranslations();

      // 🔁 Refresh map language dynamically (if we're on location.html)
      const iframe = document.getElementById('gmIframe');
      if (iframe) {
        const coordsText = document.getElementById('gmCoords')?.textContent || '';
        const [lat, lon] = coordsText.split(',').map(s => s?.trim());
        if (lat && lon) {
          const hl = (langSelect.value === 'tl') ? 'fil' : 'en';
          iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=16&hl=${hl}&output=embed`;
        } else if (typeof autoAskAndEmbed === 'function') {
          // 🧭 Re-run your location logic if no coords yet
          autoAskAndEmbed();
        }
      }
    });
  }

  // 🧩 Optional: On the location page, ensure map updates after translation
  if (document.getElementById('gmIframe') && typeof autoAskAndEmbed === 'function') {
    autoAskAndEmbed();
  }
});



// ====== Voice Announcement for Detection Results ======
window.announceResults = function (detections) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  const lang = getCurrentLanguage();
  let utteranceText = '';

  if (!detections || detections.length === 0) {
    utteranceText = translations[lang]?.voiceNoObjects || translations['en'].voiceNoObjects;
  } else {
    // Build announcement like: "Detected: person, chair, with confidence 85%"
    const detectedLabels = detections.map(d => d.label).join(', ');
    utteranceText = `${translations[lang]?.voiceDetected || 'Detected'} ${detectedLabels}. ${translations[lang]?.voiceAnalysisComplete || 'Analysis complete.'}`;
  }

  const utterance = new SpeechSynthesisUtterance(utteranceText);
  utterance.lang = lang === 'tl' ? 'tl-PH' : (lang === 'ceb' ? 'en-US' : 'en-US'); // Cebuano uses English TTS
  utterance.rate = 1;
  utterance.pitch = 1;
  
  // Stop any ongoing speech before speaking again
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

