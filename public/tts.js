/* === TTS block START (drop-in) === */
(function () {
  const PREFERRED_VOICE_KEY = 'ttsPreferredVoice';

  function rememberVoice(v) {
    try { localStorage.setItem(PREFERRED_VOICE_KEY, v?.name || ''); } catch {}
  }
  function loadPreferredVoiceName() {
    try { return localStorage.getItem(PREFERRED_VOICE_KEY) || ''; } catch { return ''; }
  }

  function waitForVoices(timeout = 1500) {
    return new Promise((resolve) => {
      const existing = speechSynthesis?.getVoices?.() || [];
      if (existing.length) return resolve(existing);
      const done = () => resolve(speechSynthesis.getVoices());
      const timer = setTimeout(() => {
        speechSynthesis.removeEventListener?.('voiceschanged', on);
        done();
      }, timeout);
      function on() {
        clearTimeout(timer);
        speechSynthesis.removeEventListener?.('voiceschanged', on);
        done();
      }
      speechSynthesis.addEventListener?.('voiceschanged', on);
    });
  }

  function mapLangToBCP47(code) {
    switch ((code || '').toLowerCase()) {
      case 'tl':  return 'fil-PH';
      case 'ceb': return 'en-US';  // fallback
      case 'en':
      default:    return 'en-US';
    }
  }

  // Prefer your previously used female voice; else pick a female voice for the lang; else fallback
  function pickVoice(langCode) {
    const voices = speechSynthesis?.getVoices ? speechSynthesis.getVoices() : [];
    if (!voices.length) return null;

    const saved = loadPreferredVoiceName();
    if (saved) {
      const v = voices.find(v => v.name === saved);
      if (v) return v;
    }

    const targets = {
      en:  ['en-PH','en-US','en-GB','en-AU','en'],
      tl:  ['fil-PH','tl-PH','en-PH','en-US','en-GB','en'],
      ceb: ['ceb-PH','fil-PH','tl-PH','en-PH','en-US','en-GB','en']
    };
    const wanted = (targets[langCode] || ['en-US']).map(s => s.toLowerCase());
    const byLang = voices.filter(v => wanted.some(code => (v.lang || '').toLowerCase().startsWith(code)));

    const isFemale = v => /female|woman|fem|wavenet-f|salli|joanna|ivy|kimberly|olivia|ava|samantha|victoria/i
      .test((v.name || '') + ' ' + (v.voiceURI || ''));

    const chosen =
      byLang.find(isFemale) ||
      byLang.find(v => v.default) ||
      byLang[0] ||
      voices.find(isFemale) ||
      voices.find(v => v.default) ||
      voices[0] || null;

    if (chosen) rememberVoice(chosen);
    return chosen;
  }

  // Try native bridge first when inside APK
  function tryNativeSpeak(text) {
    try {
      if (window.AndroidTTS?.speak)        { window.AndroidTTS.speak(String(text)); return true; }
      if (window.Android?.speak)           { window.Android.speak(String(text));     return true; }
      if (window.WebToNative?.speak)       { window.WebToNative.speak(String(text)); return true; }
      if (window.ReactNativeWebView?.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'speak', text: String(text) }));
        return true;
      }
    } catch (e) { console.warn('Native speak bridge error:', e); }
    return false;
  }

  // One-time warmup to unlock audio in WebView
  async function primeTTS(lang = 'en') {
    if (tryNativeSpeak('.')) return true; // warm native
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return false;
    await waitForVoices();
    const voice = pickVoice(lang);
    try {
      const u = new SpeechSynthesisUtterance(' '); // silent warmup
      u.volume = 0;
      if (voice) u.voice = voice; else u.lang = mapLangToBCP47(lang);
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
      return true;
    } catch (e) {
      console.warn('primeTTS failed:', e);
      return false;
    }
  }

  function speak(text, { lang } = {}) {
    // Prefer native in APK
    if (tryNativeSpeak(text)) return;
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return;

    const lc = (lang || 'en').toLowerCase();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(lc);
    if (v) u.voice = v; else u.lang = mapLangToBCP47(lc);
    u.rate = 1.0; u.pitch = 1.0; u.volume = 1.0;

    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // Warm up after first user gesture
  ['startCameraBtn','uploadBtn','captureBtn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      const sel = document.getElementById('languageSelector')?.value || 'en';
      primeTTS(sel);
    }, { once: true });
  });

  // Keep your existing call site: announceResults(detections)
  window.announceResults = function (detections = []) {
    const sel = document.getElementById('languageSelector');
    const lang = sel?.value || (typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en');

    const _t = (k, d) => (typeof t === 'function' ? (t(k) || d) : d);
    const complete  = _t('voiceAnalysisComplete', 'Analysis complete');
    const detected  = _t('voiceDetected',          'Detected');
    const withWord  = _t('voiceWith',              'with');
    const confWord  = _t('voiceConfidence',        'confidence');
    const noneText  = _t('voiceNoObjects',         'No objects detected in this image');

    const arr = Array.isArray(detections) ? detections : [];
    const sorted = [...arr].sort((a, b) => (b?.conf || 0) - (a?.conf || 0));

    let line;
    if (!sorted.length) {
      line = `${complete}. ${noneText}.`;
    } else {
      const top = sorted[0];
      const pct = Math.round((top?.conf || 0) * 100);
      // EXACT phrasing you asked for: finished analyzing + type of object
      line = `${complete}. ${detected} ${top?.label || ''} ${withWord} ${pct}% ${confWord}.`;
    }
    speak(line, { lang });
  };
})();
/* === TTS block END === */
