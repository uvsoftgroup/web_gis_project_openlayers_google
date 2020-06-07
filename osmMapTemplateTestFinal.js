var map;

function osmMapTemplateTestFinal(){
	
 
  map=osmMapTemplate();

  /*
  for(var i=0;i<map.layers.length;i++) { 
	  if(map.layers[i].name=="Station or Site")
		stationLayer=map.layers[i].name;
    
  }
  alert("hhhhhhhhhhhh" +stationLayer);
  */
  var distance= distanceBetweenPoints(119.99999, -2.999999, 106.1777, -6.77777);
  
  alert("distnace:jjjjjjjjjjjjjjjjjj" + distance);
  
  var startPt=new OpenLayers.Geometry.Point(106.1777, -6.77777);
   startPt.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    var pointGeometryStart=new OpenLayers.Geometry.Point(startPt.lon, startPt.lat);
    var pointFeatureStart=new OpenLayers.Feature.Vector(pointGeometryStart, null, {
      pointRadius: 16,
      fillOpacity: 0.7,
      externalGraphic:'jslib/img/Site.png'
      });
     
  // station for linked

  var endPt=new OpenLayers.Geometry.Point(119.99999, -2.999999);
  endPt.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    var pointGeometryEnd=new OpenLayers.Geometry.Point(endPt.lon, endPt.lat);
    var pointFeatureEnd=new OpenLayers.Feature.Vector(pointFeatureEnd, null, {
      pointRadius: 16,
      fillOpacity: 0.7,
      externalGraphic:'jslib/img/Site.png'
      });
     
    
  //make the line:
  var stationLinkLine=new OpenLayers.Geometry.LineString([startPt, endPt]);

  //style
  var style={strokeColor:"yellow", strokeWidth:5};
  //make vector 
  var stationLinkfeaure=new OpenLayers.Feature.Vector(stationLinkLine, {}, style);



  var startTestLink= dynamicStationLayer(115.88, -5.888);
  var endTestLink= dynamicStationLayer(116.88, -6.888);

  var startTestLink2= dynamicStationPointLayer(115.88, -5.888);
  var endTestLink2=dynamicStationPointLayer(116.88, -6.888);
  var endTestLink3=dynamicStationPointLayer(118.88, -5.888);
  var startTestLink4=dynamicStationPointLayer(123.99, -6.888);

  var stationLinkLineTest2=new OpenLayers.Geometry.LineString([startTestLink2, endTestLink2, endTestLink3, startTestLink4]);
  var stationLinkfeaureTest2=new OpenLayers.Feature.Vector(stationLinkLineTest2, {}, style);


  var startTestLink3=dynamicStationPointLayer(123.99, -6.888);
  var endTestLink3=dynamicStationPointLayer(127.88, -11.888);
  var stationLinkLineTest3=new OpenLayers.Geometry.LineString([startTestLink3, endTestLink3]);
  var stationLinkfeaureTest3=new OpenLayers.Feature.Vector(stationLinkLineTest3, {}, style);



  //add the feature
  stationLayer.addFeatures([stationLinkfeaure, stationLinkfeaureTest2]);

  // dynamic function calling

  var pointFeature1=dynamicStationLayer(106.1777, -6.77777);
  var pointFeature2=dynamicStationLayer(119.99999, -2.999999);
  var pointFeature3= dynamicStationLayer(118.88, -5.888);

  // add station into the map
    var pointFeatures=[];

     // Station and site with popup   
     pointFeatures.push(pointFeature1);
     pointFeatures.push(pointFeature2);
     pointFeatures.push(pointFeature3);
   
     pointFeatures.push(startTestLink);
     pointFeatures.push(endTestLink);


     stationLayer.addFeatures(pointFeatures);
     stationLayer.addFeatures(stationLinkfeaureTest3);
  
     
    
    // add select feature control required to trigger events on the vector layer
   var selectControl=new OpenLayers.Control.SelectFeature(stationLayer, {
    hover:true,
    onSelect:function(feature){
    
    var layer=feature.layer;
    feature.style.fillOpacity=1;
    feature.style.pointRadius=20;
    layer.drawFeature(feature);
   // var content="<div> <strong>Feature:</strong> <br/>" + feature.id + "<br/> <br/><strong> Location:</strong><br/>" +feature.geometry+"</div>";
    
    
    var content="<table border=1><th> License info:</th>" +
	"<tr><td>Licensee Name:</td><td>Govet Indonesia</td></tr> " +
	"<tr><td>Service Name:</td><td>Fixed Service</td></tr> " +
	"<tr><td>Sub-Service Name:</td><td>Point to Point</td></tr> " +
	"<tr><td>License Name:</td><td>Govet Indonesia 00001</td> </tr> " +
	"<tr><td>License Status:</td><td>Govet Indonesia Live</td> </tr> " +
	"<tr><td>Station Name:</td><td>Govet Indonesia Centeral Station 01</td> </tr> " +
	"<tr><td>Station Type:</td><td>Govet Indonesia Centeral Station Base </td> </tr> " +
	"<tr><td>Equipment Model:</td><td>Erricson tt66688</td> </tr> " +
	"<tr><td>Equipment Manufacturer:</td><td>Erricson</td> </tr> " +
	"<tr><td>Equipment Serial Number:</td><td>ER888888888888</td> </tr> " +
	"<tr><td>Frequency:</td><td>16.888 MHz</td> </tr> " +
	"<tr><td>Antenna Type:</td><td>Directional</td> </tr> " +
	"<tr><td>Mean Sea Level Height:</td><td>2.01 M</td> </tr> " +
	"<tr><td>Antenna Height from MSL:</td><td>30.01 M</td> </tr> " +
	"<tr><td><strong>Station Location:</strong></td><td>"+feature.geometry+"</td></tr> </table>";
    
    
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
