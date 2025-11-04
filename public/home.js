document.addEventListener('DOMContentLoaded', () => {
  if (!('geolocation' in navigator)) {
    console.warn('❌ Geolocation not supported.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = +pos.coords.latitude.toFixed(6);
      const lon = +pos.coords.longitude.toFixed(6);
      const acc = Math.round(pos.coords.accuracy || 0);
      console.log('✅ Location permission granted. Coordinates:', lat, lon);

      // ✅ Save to localStorage so other pages can use it
      localStorage.setItem('userLocation', JSON.stringify({ lat, lon, acc }));
    },
    (err) => {
      console.warn('⚠️ Location permission denied or blocked:', err);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});
