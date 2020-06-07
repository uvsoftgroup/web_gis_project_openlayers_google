var map;

function osmAndgoogleMapTemplateTest(){
	 var pointFeatures=[];
       // The location of our marker and popup. We usually think in geographic coordinates ('EPSG:4326'), but the map is projected ('EPSG:4326')
    var mapCenterPoint=new OpenLayers.Geometry.Point(90.00, 24.00).transform('EPSG:4326', 'EPSG:900913');
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
  var stationLinkLayer=new OpenLayers.Layer.Vector("Station or Site Link");
  // to make Coverage layer 
  var coverAreaRadiusLayer=new OpenLayers.Layer.Vector("Coverage Area");
  // to get the osm layer
  var osmlayer=new OpenLayers.Layer.OSM();
  var editablelayer = new OpenLayers.Layer.Vector( "Measurement" );
  
  var addedlayers=[
  osmlayer,
  gmap,
  google_hybrid,
  google_terrian,
  google_satellite, 
  stationLayer, 
  stationLinkLayer, 
  coverAreaRadiusLayer, 
  editablelayer];
  
  // station or site link
  var startPt=dynamicStationPointLayer(92.00, 23.00);
 // station or site for linked
 var endPt=dynamicStationPointLayer(90.87, 24.00);
  //var endPtRaj=dynamicStationPointLayer(89.00, 26.00);
 //make the line:
 var stationLinkLine=new OpenLayers.Geometry.LineString(
 [startPt, endPt]);
 //style
 var style={strokeColor:"yellow", strokeWidth:5};
 //make vector 
 var stationLinkfeaure=new OpenLayers.Feature.Vector(
 stationLinkLine, {}, style);

// station or site
 var startTestStation= dynamicStationLayer(92.00, 23.00);
 var endTestStation= dynamicStationLayer(90.45, 24.00);
 var endTestStation= dynamicStationLayer(90.87, 24.00);
 var endPtRong=dynamicStationPointLayer(89.00, 25.00);
 var endPtRong=dynamicStationPointLayer(89.00, 26.00);
 var endPtRa=dynamicStationPointLayer(90.00, 25.00);
 // station or site linking
 var startTestStationLink= dynamicStationPointLayer();
 var endTestStationLink= dynamicStationPointLayer();
 var stationLinkLineTest1=new OpenLayers.Geometry.LineString([startTestStationLink, 
 endTestStationLink]);
 var stationLinkfeaureTest1=new OpenLayers.Feature.Vector(stationLinkLineTest1, {}, style);
 
 var startTestLink2=dynamicStationPointLayer(92.00, 23.00);
 var endTestLink2=dynamicStationPointLayer(90.87, 24.00);
 var endTestLink3=dynamicStationPointLayer(90.87, 24.00);
 var startTestLink4=dynamicStationPointLayer(90.00, 25.00);
 var startTestLink5=dynamicStationPointLayer(90.00, 25.00);
 var endTestLink5=dynamicStationPointLayer(89.00, 26.00);
 var startTestLink6=dynamicStationPointLayer(89.00, 26.00);
 var endTestLink6=dynamicStationPointLayer(89.00, 25.00);
 var startTestLink6=dynamicStationPointLayer(89.00, 25.00);
 var endTestLink6=dynamicStationPointLayer(90.45, 24.00);
 
 var stationLinkLineTest2=new OpenLayers.Geometry.LineString(
 [startTestLink2, 
 endTestLink2, 
 endTestLink3, 
 startTestLink4, 
 startTestLink5, 
 endTestLink5, 
 startTestLink6, 
 endTestLink6
 ]);
 
 var stationLinkfeaureTest2=new OpenLayers.Feature.Vector(stationLinkLineTest2, {}, style);
 var startTestLink3=dynamicStationPointLayer();
 var endTestLink3=dynamicStationPointLayer();
 var stationLinkLineTest3=new OpenLayers.Geometry.LineString([startTestLink3, endTestLink3]);
 var stationLinkfeaureTest3=new OpenLayers.Feature.Vector(stationLinkLineTest3, {}, style);

 //add the feature
 stationLinkLayer.addFeatures([stationLinkfeaureTest1, stationLinkfeaureTest2, stationLinkfeaureTest3]);
 // dynamic function calling
 var pointFeature1=dynamicStationLayer(89.00, 26.00);
 var pointFeature2=dynamicStationLayer(90.00, 25.00);
 var pointFeature3= dynamicStationLayer(90.50, 24.00);
  // add station into the map
  // Station and site with popup   
    pointFeatures.push(pointFeature1);
    pointFeatures.push(pointFeature2);
    pointFeatures.push(pointFeature3);
    pointFeatures.push(startTestStation);
    pointFeatures.push(endTestStation);
    stationLayer.addFeatures(pointFeatures);
   //stationLayer.addFeatures(stationLinkfeaureTest3);
 
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
            ];
			
      // Finally we create the map
      map=new OpenLayers.Map({
            div:"map",
            controls:controls_arrays,
            projection:"EPSG:4326",
            layers:addedlayers,
            displayProjection:"EPSG:4326",
            center:mapCenterPoint.getBounds().getCenterLonLat(),
            zoom:7
            });       
      // add select feature control required to trigger events on the vector layer
      var selectControl=new OpenLayers.Control.SelectFeature(stationLayer, {
       hover:false,
       onSelect:function(feature){
       
	   var layer=feature.layer;
       feature.style.fillOpacity=1;
       feature.style.pointRadius=20;
       layer.drawFeature(feature);
   
    var content="<table border=1><th>Station for Mobile communication:</th>" +
   	"<tr><td>Licensee Name:</td><td>Govet UVSOFTGROUP DEMO</td></tr> " +
   	"<tr><td>Service Name:</td><td>Fixed Service</td></tr> " +
   	"<tr><td>Sub-Service Name:</td><td>Point to Point</td></tr> " +
   	"<tr><td>License Name:</td><td>Govet UVSOFTGROUP DEMO 00001</td> </tr> " +
   	"<tr><td>License Status:</td><td>Govet UVSOFTGROUP DEMO Live</td> </tr> " +
   	"<tr><td>Station Name:</td><td>Govet UVSOFTGROUP DEMO Centeral Station 01</td> </tr> " +
   	"<tr><td>Station Type:</td><td>Govet UVSOFTGROUP DEMO Centeral Station Base </td> </tr> " +
   	"<tr><td>Equipment Model:</td><td>Erricson tt66688</td> </tr> " +
   	"<tr><td>Equipment Manufacturer:</td><td>Erricson</td> </tr> " +
   	"<tr><td>Equipment Serial Number:</td><td>ER888888888888</td> </tr> " +
   	"<tr><td>Frequency:</td><td>16.888 MHz</td> </tr> " +
   	"<tr><td>Antenna Type:</td><td>Directional</td> </tr> " +
   	"<tr><td>Mean Sea Level Height:</td><td>2.01 M</td> </tr> " +
   	"<tr><td>Antenna Height from MSL:</td><td>30.01 M</td> </tr> </table>";
       
       var popup2=new OpenLayers.Popup.FramedCloud(feature.id+"_popup",
       feature.geometry.getBounds().getCenterLonLat(),
       new OpenLayers.Size(250, 100),
       content,
       null,
       true);
       feature.popup2=popup2;
       map.addPopup(popup2);
       },
       onUnSelect:function(feature){
       var layer=feature.layer;
       feature.style.fillOpacity=0.7;
       feature.style.pointRadius=16;
       feature.style.renderIntent=null;
       layer.drawFeature(feature);
       map.removePopup(feature.popup2);
       }
       });
     
      map.addControl(selectControl);
      selectControl.activate();
  
} 
