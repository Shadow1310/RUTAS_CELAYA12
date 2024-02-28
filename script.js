var map = L.map('map').setView([51.505, -0.09], 13);
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// Función para obtener la geolocalización
function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        showMessage("Geolocalización no soportada por este navegador.");
    }
}

// Función para mostrar la posición en el mapa
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    L.marker([lat, lon]).addTo(map)
        .bindPopup('¡Estás aquí!')
        .openPopup();

    map.setView([lat, lon], 15);
}

// Función para manejar errores de geolocalización
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessage("El usuario denegó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Información de ubicación no disponible.");
            break;
        case error.TIMEOUT:
            showMessage("Se agotó el tiempo de espera para obtener la ubicación.");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("Error desconocido.");
            break;
    }
}

// Función para mostrar mensajes en la página
function showMessage(message) {
    document.getElementById("message").innerHTML = message;
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
