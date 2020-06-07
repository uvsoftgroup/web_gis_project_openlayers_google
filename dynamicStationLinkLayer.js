/**
 * This function is for building the dynamic station link line between the station or site geo coordinate points.
 * This generated feature object as a transformed object with different projection systems.
 * 
 * 
 */
function dynamicStationLinkLayer(pxs, pys, pxe, pye) {
// to set the station link's first point
var startPointCoordinate=new OpenLayers.Geometry.Point(pxs, pys);
// to transform the first point from EPSG:4326 to EPSG:900913
 startPointCoordinate.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
 
//to set the station link's first point
var endPointCoordinate=new OpenLayers.Geometry.Point(pxe, pye);
//to transform the end or second point from EPSG:4326 to EPSG:900913
endPt.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));


//to generate the station link between the stations or sites:
var stationLinkLine=new OpenLayers.Geometry.LineString([startPointCoordinate, 
endPointCoordinate]);

//to build the style properties for station link line
var style={
strokeColor:"#0500bd", 
strokeWidth:5
};
//to generate a vector feature from the station link line
var stationLinkFeature=new OpenLayers.Feature.Vector(stationLinkLine, {}, style);

// finally return the building feature
return stationLinkFeature;
}