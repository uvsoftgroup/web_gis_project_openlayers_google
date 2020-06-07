var map;

function osmAndgoogleMapTemplate(){

       // The location of our marker and popup. We usually think in geographic coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857')
    var mapCenterPoint=new OpenLayers.Geometry.Point(119.888, -6.5555).transform('EPSG:4326', 'EPSG:900913');
  
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
   
  // to make station or site layer 
  var stationLayer=new OpenLayers.Layer.Vector("Station or Site", {
	  projection:"EPSG:900913"
	  });
	  
		// to make link layer 
  var linkLayer=new OpenLayers.Layer.Vector("Station or Site Link");
		// to make Coverage layer 
  var coverAreaRadiusLayer=new OpenLayers.Layer.Vector("Service Coverage Area");
  
  // to get the osm layer
  var osm=new OpenLayers.Layer.OSM();
  var editablelayer = new OpenLayers.Layer.Vector("Measurement and Calculation");
  
  // all layers are added into the map
  var addedlayers=[osm, stationLayer,linkLayer,coverAreaRadiusLayer,editablelayer, gmap, google_hybrid, google_terrian, google_satellite];
 
  var controls_arrays=[
                       new OpenLayers.Control.Navigation({}),
                       new OpenLayers.Control.PanZoomBar({}),
                       new OpenLayers.Control.LayerSwitcher({div: document.getElementById('layer_switcher_control'), roundedCorner: false}),
                       new OpenLayers.Control.Permalink({}),
                       new OpenLayers.Control.MousePosition({}),
                       new OpenLayers.Control.ScaleLine({}),
                       new OpenLayers.Control.KeyboardDefaults({}),
                       new OpenLayers.Control.Graticule({}),
                       new OpenLayers.Control.Scale({}),
                       new OpenLayers.Control.EditingToolbar(editablelayer),
                       new OpenLayers.Control.OverviewMap({maximized: true})
                       //new OpenLayers.Control.NavigationHistory({}),
                       ];
  
       // Finnaly we sreate the map
       map=new OpenLayers.Map({
             div:"map",
             controls:controls_arrays,
             projection:"EPSG:4326",
             layers:addedlayers,
             displayProjection:"EPSG:4326",
             center:mapCenterPoint.getBounds().getCenterLonLat(),
             zoom:5
             });
                  
  
} 
