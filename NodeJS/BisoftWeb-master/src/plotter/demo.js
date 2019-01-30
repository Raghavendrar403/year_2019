var container, maximum, series, plot, data, yaxisLabel;
var xVal, series1, series2, series3, series4, series5, series6, series7, series8, series9, series10,
	plot, data, options, series11= [];
var res = [];

// $(document).ready(function () {
function ready(){
	xVal = 0;
	for(var i =0; i<10; i++){
		series11.push({ 
				label: "IOT_"+(i+1),
				data: []
				})
	}
	series1 = { 
				label: "series 1",
				data: []
				};
	series2 = {
				label: "series 2",
				data: []
				};
	series3 = {
				label: "series 3",
				data: []
				};
	series4 = {
				label: "series 4",
				data: []
				};
	series5 = {
				label: "series 5",
				data: []
				};
	series6 = {
				label: "series 6",
				data: []
				};
	series7 = {
				label: "series 7",
				data: []
				};
	series8 = {
				label: "series 8",
				data: []
				};
	series9 = {
				label: "series 9",
				data: []
				};
	series10 = {
				label: "series 10",
				data: []
				};


	// data = [ series1, series2, series3, series4, series5, series6, series7, series8, series9, series10 ];
	data = [];
    
    options = {
    	legend: { show: true, position: "nw" },
    	grid:{
			borderWidth: 1,
			minBorderMargin: 20,
			labelMargin: 10,
			backgroundColor: {
				colors: ["#fff", "#e4f4f4"]
			},
			margin: {
				top: 8,
				bottom: 20,
				left: 20
			},
			// markings: function(axes) {
			// 	var markings = [];
			// 	var xaxis = axes.xaxis;
			// 	for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
			// 		markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
			// 	}
			// 	return markings;
			// },
			hoverable: true, 
			clickable: true 
			}		    								
		};
    plot = $.plot($("#chart5"), data, options);

}


function plott(values){
	// This could be an ajax call back.
	// var val_arr = values.split(',');
	// "{\"A1\":[{\"A1\":538},{\"A2\":65535},{\"A3\":0},{\"A4\":0},{\"A5\":0},{\"A6\":0}]}"
	var obj = JSON.parse(values.data);
	var iotData = obj.Data;
	console.log("val_arr : "+JSON.stringify(iotData));
	var index = 0, datum = 0;
	data = [];
	// Object.keys(iotData).forEach(function(datum){
	for(; datum < 10; datum++){
		if(iotData["IOT_"+(datum+1)]){
			data.push(series11[datum]);
			data[index].data.push([xVal, iotData["IOT_"+(datum+1)]]);
			index++;
		}
	}
	xVal++;
	index=0;
	Object.keys(iotData).forEach(function(datum){
		//data.push(series11[index]);
		for (var i=0;data[index].data.length>15;i++){
			data[index].data=data[index].data.splice(1);
		}
		index++;
	});
	//data[index].data=data[index].data.splice(0,3);
	plot.setData(data);
	plot.setupGrid();
	plot.draw();
}