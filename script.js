mapboxgl.accessToken = 'pk.eyJ1IjoiZWtmaXNrZSIsImEiOiJjbTFpYWE2eXUwYTU4MmxvZHpsMXB0MGFoIn0.PgmkPVfsppBuKfRqLuI66A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/ekfiske/cmh9rhpsg00ql01smehfzb583',
    center: [-122.272781, 37.875], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12.5 // starting zoom
      });

const minDate = 1850;
const maxDate = 1976;

function filterBy(date) {
  const filters = ['<=', ['to-number', ['get', "original_date"]], date];
  map.setFilter('points-layer', filters);

  // Set the label to the month
  document.getElementById('year').textContent = date;
}

map.on('load', function() {

    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/ekfiske/geog183bahamap/refs/heads/main/data/baha_points_gcd.geojson'
    });

    map.addSource('fill-data', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/ekfiske/geog183bahamap/refs/heads/main/data/1923FireArea_3.geojson'
    });

    map.addLayer({
      id: 'fill-layer',
      type: 'fill',
      source: 'fill-data',
      paint: {
        'fill-color': '#FF0000',
        'fill-opacity': .5
      }
  });
    
    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#504178',
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
        }
    });

    filterBy(maxDate);

    document.getElementById('slider').addEventListener('input', (e) => {
      const date = parseInt(e.target.value, 10);
      filterBy(date);
  });

  });

    // Add click event for popups
     map.on('click', 'points-layer', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content using the actual data properties
        const popupContent = `
            <div>
                <h3>${properties.original_name}</h3>
                <p><strong>Address:</strong> ${properties.original_adress}</p>
                <p><strong>Architect & Date:</strong> ${properties.original_architect_date}</p>
                <p><strong>Designated:</strong> ${properties.original_designated}</p>
                ${properties.Link ? `<p><a href="${properties.original_attribution_url}" target="_blank">More Information</a></p>` : ''}
                <!-- ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.original_notes}</p>` : ''} -->
            </div>
        `;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Add click event for popups
    map.on('click', 'fill-layer', (f) => {
      // Create popup content using the actual data properties
      const firepopupContent = `
          <div>
              <h3>1923 Berkeley Fire</h3>
              <p><a href="https://www.berkeleyside.org/2023/09/14/berkeley-1923-fire-centennial-part-1" target="_blank">More Information</a></p>
          </div>
      `;

        new mapboxgl.Popup()
          .setLngLat(f.lngLat)
          .setHTML(firepopupContent)
          .addTo(map);
    });
