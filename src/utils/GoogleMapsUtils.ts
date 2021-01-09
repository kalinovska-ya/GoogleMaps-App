export const LoadMapAPI = () => {
  const googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC1RxBwFCI5may63paqpyDNJYzvC_svJqU&region=BY&language=ru&v=weekly";
  const scripts = document.getElementsByTagName('script');

  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(googleMapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapsScript = document.createElement('script');
  googleMapsScript.src = googleMapsURL;
  googleMapsScript.async = true;
  googleMapsScript.defer = true;
  window.document.body.appendChild(googleMapsScript);

  return googleMapsScript;
};