/**
 * This function is for building the dynamic station from the station or site geo coordinate points.
 * This generated feature object as a transformed object with different projection systems.
 * 
 */

   function dynamicStationPointLayer(px,py){
	  
	   var lonlat=new OpenLayers.LonLat(px, py);
		// to transform the first point from EPSG:4326 to EPSG:900913
		 lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
	   var startTestLink=new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
	   
	   return startTestLink;
		 
   }