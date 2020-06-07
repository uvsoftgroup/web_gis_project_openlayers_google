// to set the map center point and zoom level
var lon =119.41406;
var lat = -5.452350;
var zoom = 5;
function init() {

// to set arrays of map controls
var controls_arrays=[
	new OpenLayers.Control.Navigation({}),
	new OpenLayers.Control.PanZoomBar({}),
	new OpenLayers.Control.LayerSwitcher({div: document.getElementById('layer_switcher_control'), roundedCorner: false}),
	new OpenLayers.Control.Permalink({}),
	new OpenLayers.Control.MousePosition({}),
	new OpenLayers.Control.ScaleLine({}),
    new OpenLayers.Control.KeyboardDefaults({}),
    //new OpenLayers.Control.Graticule({}),
	//new OpenLayers.Control.NavigationHistory({}),
	
   
];

/*to set map with projection information and added base layer and overlay layers.
Then set the controls into the map.
*/
  var  map = new OpenLayers.Map({
        div: "map",
		controls:controls_arrays,
		zoom:16,
		allOverlays:false,
        projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326")
    });
	var wmslayer = new OpenLayers.Layer.WMS( "WMS Layer",
                        "http://vmap0.tiles.osgeo.org/wms/vmap0", 
						{layers: 'basic'},
						 {}
					);
    // to get open street map
   var osm = new OpenLayers.Layer.OSM();  
	// to get google street map
   var gmap = new OpenLayers.Layer.Google("Google Streets");
   // to get google hybrid map
   var google_hybrid=new OpenLayers.Layer.Google("Google Hybrid",
   { type: google.maps.MapTypeId.HYBRID}
   );
   // to get google terrain map
   var google_terrian=new OpenLayers.Layer.Google("Google Terrain",
   { type: google.maps.MapTypeId.TERRAIN}
   );
   // to get google satellite map
   var google_satellite=new OpenLayers.Layer.Google("Google Satellite",
   { type: google.maps.MapTypeId.SATELLITE}
   );
   /* to get vector map: This is only graphical representation with geometry. 
   Its has no impact in the stored database level and the service level.
   */
	vector_layer = new OpenLayers.Layer.Vector('Editable', {
					isVector:true,
					isBaseLayer:false,
					renderers: ['canvas', 'SVG', 'VML']
						});
						
	var point_indonesia=new OpenLayers.Geometry.Point(12461477.48328 -792950.46861912);
			     			   
    var feature_point=new OpenLayers.Feature.Vector(point_indonesia, {
			   'location': 'Center of Indonesia',
			   'description': 'Heart of Indonesia'
		        }
				);
	
	
	// add vector layer control into the map
	map.addControl(new OpenLayers.Control.EditingToolbar(vector_layer));
	
	var vector_style=new OpenLayers.Style({
			  'fillColor': '#669933',
			  'fillOpacity': .8,
			  'fontColor': '#f0f0f0',
			  'fontFamily': 'arial, sans.serif',
			  'fontSize': '.9em',
			  'fontWeight': 'bold',
			  'strokeColor': '#aaee77',
			  'strokWidth': 3
			  });
	
	var vector_style_map= new OpenLayers.StyleMap(
			   {
			    'default': vector_style
			   });
	vector_layer.styleMap=vector_style_map;
	
	//map.addLayers([wmslayer, vector_layer]);
	 vector_layer.onFeatureInsert = function(feature){
				alert('onFeatureInsert-geometry:'+feature.geometry)
				};
	  vector_layer.addFeatures([feature_point]);
	 
	// to set the event
	var select_feature_control=new OpenLayers.Control.SelectFeature(
			   vector_layer,
			   {
			   multiple: false,
			   toggle: true,
			   multipleKey: 'ShiftKey'
			   }
			   );
			   map.addControl(select_feature_control);
			   
			   // active feature feature
			   select_feature_control.activate();
			   
 	// add maps into the map layer		   
  map.addLayers([wmslayer, osm, gmap, google_hybrid, google_terrian,google_satellite, vector_layer]);
	// to set the center of map and transform the projection from EPSG:4326 to EPSG:900913
    map.setCenter(
        new OpenLayers.LonLat(lon,lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 
        zoom
    );
}




