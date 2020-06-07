function graph(){
   var data = {
					items: [{label:'Grameen Phone[20%]', data: 20},
						   {label:'RAD', data: 11},
						   {label:'PKW', data: 56},
						   {label:'ÖV', data: 12},
						   {label:'SONST', data: 1}]
					};

		  // FLOT
		  jQuery(function () {
		    jQuery.plot(jQuery("#MOP_pie_graph"), data.items, {
				pie: { 
					show: true, 
					pieStrokeLineWidth:1, 
					pieStrokeColor: '#FFF', 
					pieChartRadius: 80, 			// by default it calculated by 
					centerOffsetTop:5,
					centerOffsetLeft:5, 			// if 'auto' and legend position is "nw" then centerOffsetLeft is equal a width of legend.
					showLabel: false,				//use ".pieLabel div" to format looks of labels
					labelOffsetFactor: 4/5, 		// part of radius (default 5/6)
				//	labelOffset: 10,        		// offset in pixels if > 0 then labelOffsetFactor is ignored
					labelBackgroundOpacity: 0.50, 	// default is 0.85
					labelFormatter: function(serie){// default formatter is "serie.label"
					return serie.label +'<br/>'+Math.round(serie.percent)+'%';
					}
				},
				legend: {
					show: true, 
					position: "top",
					backgroundOpacity:1
				}
			})
		  });
		  
		  }
		  
	