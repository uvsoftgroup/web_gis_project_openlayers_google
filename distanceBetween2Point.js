

function distanceBetweenPoints(px1,py1, px2, py2){
	
	var lonlat1=new OpenLayers.LonLat(px1, py1);
	// to transform the first point from EPSG:4326 to EPSG:900913
	 lonlat1.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    var point1=new OpenLayers.Geometry.Point(lonlat1.lon, lonlat1.lat);
    
    var lonlat2=new OpenLayers.LonLat(px2, py2);
	// to transform the first point from EPSG:4326 to EPSG:900913
	 lonlat2.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    var point2=new OpenLayers.Geometry.Point(lonlat2.lon, lonlat2.lat);
   
        return point1.distanceTo(point2);
}