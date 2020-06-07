/**
 * 
 */
function dynamicStationsLinksLayer(px, py){
		
	// WGS-1984 world projection system=EPSG:4326
	var  wgs1984Projection =  new OpenLayers.Projection("EPSG:4326");
	// Spherical Mercator projection system=EPSG:900913
	var  wgs1984ProjectionToSphericalMercator= map.getProjectionObject(); 
	// to build the geo point coordinates array
	var pointFeatures=[];	
	
	// to build a geo point coordinate
	var pointGeometry=new OpenLayers.Geometry.Point(px, py);
	
	// to transform the first point from EPSG:4326 to EPSG:900913
	  pointGeometry.transform(new OpenLayers.Projection("EPSG:4326"), wgs1984ProjectionToSphericalMercator);
	  
	 // to generate the geo point geometry 
	  var pointGeometry=new OpenLayers.Geometry.Point(pointGeometry.lon, pointGeometry.lat);
	  
	  // to genarate the geo point feature with station symbolizer
	  var pointFeature=new OpenLayers.Feature.Vector(pointGeometry, null, {
	    pointRadius: 16, // point radius for the symbolizer
	    fillOpacity: 0.7, // point filling opacity for the sybolizer
	    externalGraphic:'jslib/img/Site.png' // station or site symbol
	    });
	  
	 // push the generated feature into the feature array
	 pointFeatures.push(pointFeature);
	 
	//to build the style properties for station link line
	 var style={
	 strokeColor:"#0500bd", 
	 strokeWidth:5
	 };
	
	 // to generated the stations links feature	    
	var stationsLinksFeature= new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointFeatures), {}, style);
	 
	 // finally return the stations links
	return stationsLinksFeature;
	
		}