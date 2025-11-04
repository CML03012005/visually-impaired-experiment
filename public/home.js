// home.js (or inside a <script> on index.html)
document.addEventListener('DOMContentLoaded', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      () => console.log('✅ Location permission granted (or already allowed).'),
      (err) => console.warn('⚠️ Location permission denied or blocked:', err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
});
