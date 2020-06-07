/**
 * This function is for building the dynamic station from the station or site geo coordinate points.
 * This generated feature object as a transformed object with different projection systems.
 * 
 */

   function dynamicStationLayer(px, py){
		// to build the array of geo point coordinates
		 var lonlat=new OpenLayers.LonLat(px, py);
		// to transform the first point from EPSG:4326 to EPSG:900913
		 lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
		  
		 // to generate the geo point geometry 
		  var pointGeometry=new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
		  
		  // to genarate the geo point feature with station symbolizer
		  var pointFeature=new OpenLayers.Feature.Vector(pointGeometry, null, {
		    pointRadius: 16, // point radius for the symbolizer
		    fillOpacity: 1.0, // point filling opacity for the sybolizer
		    externalGraphic:'img/Site.png' // station or site symbol
		    });
		 // finally return the feature
		  return pointFeature;
		 
   }