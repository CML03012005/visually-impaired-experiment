// Helpers
  function setStatus(msg){ const el = document.getElementById('mapStatus'); if (el) el.textContent = msg || ''; }
  function setCoords(lat, lon){ const el = document.getElementById('gmCoords'); if (el) el.textContent = (lat && lon) ? `${lat}, ${lon}` : '--'; }
  function mapsLangParam() {
    const sel = document.getElementById('langSelect');
    const v = (sel && sel.value) ? sel.value : 'en';
    // Google Maps web UI supports 'en' and 'fil' (walang 'ceb'), kaya ceb -> en
    return (v === 'tl') ? 'fil' : 'en';
  }
  function embedMap(lat, lon, acc) {
    const iframe = document.getElementById('gmIframe');
    const hl = mapsLangParam();
    iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=16&hl=${hl}&output=embed`;
    iframe.style.display = 'block';
    setStatus(`Embedded at your location (±${acc} m).`);
  }

  // Core geolocation (will trigger permission prompt)
  function requestLocationOnce() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) return reject(new Error('Geolocation not supported.'));
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = +pos.coords.latitude.toFixed(6);
          const lon = +pos.coords.longitude.toFixed(6);
          const acc = Math.round(pos.coords.accuracy || 0);
          resolve({ lat, lon, acc });
        },
        err => reject(err),
        { enableHighAccuracy:true, timeout:10000, maximumAge:5000 }
      );
    });
  }

  async function autoAskAndEmbed() {
    // Require HTTPS (or localhost) para gumana ang geolocation
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      setStatus('Geolocation requires HTTPS (or localhost).');
      return;
    }

    // If Permissions API is available, check state for nicer UX
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const p = await navigator.permissions.query({ name: 'geolocation' });
        if (p.state === 'granted') {
          const { lat, lon, acc } = await requestLocationOnce();
          setCoords(lat, lon);
          embedMap(lat, lon, acc);
          return;
        }
        if (p.state === 'denied') {
          setStatus('Location permission is blocked. Enable it in your browser settings.');
          document.getElementById('enableLocationBtn').style.display = 'inline-block';
          return;
        }
        // p.state === 'prompt' → proceed to immediate request (will show prompt)
      }
    } catch (_) { /* ignore */ }

    // Aggressive auto-prompt on first paint
    try {
      setStatus('Asking for your location…');
      const { lat, lon, acc } = await requestLocationOnce();
      setCoords(lat, lon);
      embedMap(lat, lon, acc);
    } catch (e) {
      console.warn('Geo error:', e);
      const btn = document.getElementById('enableLocationBtn');
      btn.style.display = 'inline-block';
      if (e && e.code === 1) setStatus('Permission denied by user.');
      else if (e && e.code === 2) setStatus('Position unavailable.');
      else if (e && e.code === 3) setStatus('Location request timed out.');
      else setStatus('Unable to get your location.');
    }
  }

  // Fallback button if the browser blocked auto-prompt (some Safari/iOS configs)
  document.getElementById('enableLocationBtn')?.addEventListener('click', async () => {
    try {
      setStatus('Requesting location…');
      const { lat, lon, acc } = await requestLocationOnce();
      setCoords(lat, lon);
      embedMap(lat, lon, acc);
      document.getElementById('enableLocationBtn').style.display = 'none';
    } catch (e) {
      console.warn('Geo error:', e);
      if (e && e.code === 1) setStatus('Permission denied. Please allow location.');
      else if (e && e.code === 2) setStatus('Position unavailable.');
      else if (e && e.code === 3) setStatus('Timeout. Try again.');
      else setStatus('Unable to get your location.');
    }
  });

  // Auto-request on page load (this will prompt immediately)
  // New — only use location if already granted
document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (navigator.permissions && navigator.permissions.query) {
      const p = await navigator.permissions.query({ name: 'geolocation' });
      if (p.state === 'granted') {
        // ✅ Already granted — safe to get and embed silently
        const { lat, lon, acc } = await requestLocationOnce();
        setCoords(lat, lon);
        embedMap(lat, lon, acc);
      } else {
        // 🚫 Not granted — don’t ask again, just show friendly message
        setStatus('Location access not yet granted. Please allow it from the home page.');
        document.getElementById('enableLocationBtn').style.display = 'inline-block';
      }
      return;
    }
  } catch (e) {
    console.warn('Permission query failed', e);
    setStatus('Unable to check location permission.');
  }
});


  // Optional: kapag nagpalit ng language sa dropdown, i-refresh lang ang iframe para magbago ang map labels
  document.getElementById('langSelect')?.addEventListener('change', () => {
    const iframe = document.getElementById('gmIframe');
    if (!iframe || !iframe.src) return;
    const [lat, lon] = (document.getElementById('gmCoords')?.textContent || '').split(',').map(s=>s?.trim());
    if (lat && lon) {
      const hl = mapsLangParam();
      iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=16&hl=${hl}&output=embed`;
    }
  });