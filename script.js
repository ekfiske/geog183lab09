mapboxgl.accessToken = 'pk.eyJ1IjoiZWtmaXNrZSIsImEiOiJjbTFpYWE2eXUwYTU4MmxvZHpsMXB0MGFoIn0.PgmkPVfsppBuKfRqLuI66A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/ekfiske/cmh9rhpsg00ql01smehfzb583',
    center: [-122.272781, 37.871666], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 11 // starting zoom
      });