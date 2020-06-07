/**
 * This function is for building the dynamic station or site cover area.
 * This generated feature object as a transformed object with different projection systems.
 * 
 */

// for generating coverage area layer
	function dynamicStationCoverAreaLayer(px, py){
		
				var pointGeometries= [];
				var pointGeometry= new OpenLayers.Geometry.Point(px, py);
				
				pointGeometry.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
				 
				pointGeometries.push(pointGeometry);
				var linearGeometry=new OpenLayers.Geometry.LinearRing(pointGeometries);
				
				var polygonGeometry=new OpenLayers.Geometry.Polygon([linearGeometry]);
				var polygonFeature=new OpenLayers.Feature.Vector(polygonGeometry);
				
		   
		        return polygonFeature;
		}

  