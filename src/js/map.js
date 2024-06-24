(function() {
  const lat = 19.040956;
  const lng = -98.2043882;
  const mapa = L.map('mapa').setView([lat, lng ], 13);
  let marker;

  //utilizar provider y geocoder
  const geocodeservice = L.esri.Geocoding.geocodeService();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  //Pin
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  })
  .addTo(mapa)

  //Detectar el movimiento del pin
  marker.on('moveend', function(e){
    marker = e.target

    const posicion = marker.getLatLng();

    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))
    //obtener la info de la calle al soltar el pin 
    geocodeservice.reverse().latlng(posicion, 13).run(function(error, resultado){
      console.log(resultado);
      marker.bindPopup(resultado.address.LongLabel)
    })
  })


})()