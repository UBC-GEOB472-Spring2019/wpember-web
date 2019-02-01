	// Create a variable to hold our map
	let myMap;
	// Create a variable to hold our canvas
	let canvas;
	// Create a new Mappa instance using Leaflet.
	const mappa = new Mappa('Leaflet');

	// p5.js setup

	const options = {
	lat: 0,
	lng: 0,
	zoom: 4,
	style: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
	}
	function setup(){
	// Create a canvas 640x640
	canvas = createCanvas(640,640);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas)

  //load the data
  meteorites = loadTable("Meteorite_Landings.csv", 'csv', 'header');

	// Add a grey background
	background(100);

	fill(255,30,30);
  stroke(100);

	myMap.onChange(drawMeteorites);

	}

	// p5.js draw
	function drawMeteorites(){

    // Clear the canvas
    clear();

    for (let i = 0; i < meteorites.getRowCount(); i++) {
      // Get the lat/lng of each meteorite
      const latitude = Number(meteorites.getString(i, 'reclat'));
      const longitude = Number(meteorites.getString(i, 'reclong'));

      // Only draw them if the position is inside the current map bounds. We use a
      // Leaflet method to check if the lat and lng are contain inside the current
      // map. This way we draw just what we are going to see and not everything. See
      // getBounds() in http://leafletjs.com/reference-1.1.0.html
      if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
        // Transform lat/lng to pixel position
        const pos = myMap.latLngToPixel(latitude, longitude);
        // Get the size of the meteorite and map it. 60000000 is the mass of the largest
        // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
        let size = meteorites.getString(i, 'mass (g)');
        size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
        ellipse(pos.x, pos.y, size, size);
