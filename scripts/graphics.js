button.addEventListener('click', geocode, true);

let lat;
let lng;

function geocode(e) {
    // Prevent actual submit
    e.preventDefault();



    let location = document.getElementById('location-input').value;
    let z = 15.5;

    if (location == "") {
        z = 4.8;
        location = "Mexico";
    }

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyAzQ_TTpXCQtW7eXJU2AJ1Sf985pl9rJUo'
            }
        })
        .then(function(response) {
            // Log full response
            console.log(response);

            // Formatted Address
            var formattedAddress = response.data.results[0].formatted_address;
            var formattedAddressOutput = `
                  <ul class="list-group">
                    <li class="list-group-item">${formattedAddress}</li>
                  </ul>
                `;

            // Address Components
            var addressComponents = response.data.results[0].address_components;
            var addressComponentsOutput = '<ul class="list-group">';
            for (var i = 0; i < addressComponents.length; i++) {
                addressComponentsOutput += `
                    <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
                  `;
            }
            addressComponentsOutput += '</ul>';

            // Geometry
            lat = response.data.results[0].geometry.location.lat;
            lng = response.data.results[0].geometry.location.lng;

            initMap(lat, lng, z);

            // Output to app
            document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
            document.getElementById('address-components').innerHTML = addressComponentsOutput;
            // document.getElementById('geometry').innerHTML = geometryOutput;
        })
        .catch(function(error) {
            console.log(error);
        });

}

function initMap(x, y, z) {
    new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: x,
            lng: y
        },
        zoom: z,
    });
}

geocode(new Event('build'));