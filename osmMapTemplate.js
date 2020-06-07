var map;

function osmMapTemplate(){

       // The location of our marker and popup. We usually think in geographic coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857')
    var mapCenterPoint=new OpenLayers.Geometry.Point(119.888, -6.5555).transform('EPSG:4326', 'EPSG:900913');
  
  // to make station or site layer 
  var stationLayer=new OpenLayers.Layer.Vector("Station or Site", {
	  projection:"EPSG:900913"
	  });
	  
		// to make link layer 
  var stationLinkLayer=new OpenLayers.Layer.Vector("Station or Site Link");
		// to make Coverage layer 
  var coverAreaRadiusLayer=new OpenLayers.Layer.Vector("Service Coverage Area");
  
  // to get the osm layer
  var osm=new OpenLayers.Layer.OSM();
  
  var editablelayer = new OpenLayers.Layer.Vector( "Measurement and Calculation" );
  
  // all layers are added into the map
  var addedlayers=[osm, stationLayer,stationLinkLayer,coverAreaRadiusLayer,editablelayer];

 
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
 return map;
 
} 
