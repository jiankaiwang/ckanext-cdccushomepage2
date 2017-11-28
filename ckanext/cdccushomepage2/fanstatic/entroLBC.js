/*
desc : global variables
virus : Enterovirus, Coxsackie, Others
*/
var entroLBCData = [];
var entroLBCColorsPalette = ["rgb(255, 153, 102)","rgb(255, 119, 51)","rgb(255, 153, 51)","rgb(204, 102, 0)","rgb(204, 153, 0)","rgb(153, 102, 51)"];
var entroLBCSatterLineColor = "rgb(85, 128, 170)";
var entroLBCLayout = {
	title: "",
	barmode: 'stack',
	margin: { l: 35, r: 20, b: 60, t: 35, pad: 4 },
	showlegend: false,
	xaxis: { showgrid: false, zeroline: false, tickangle: -40, size: 12 },
	yaxis: { showline: false, size: 12 }
};


/*
desc : prepare entrovirus data
*/
function createEntrovirusRate(getWeek, getSpecimen, getName, getColor) {
	var entrovirusRateObject = {
		x: getWeek,
		y: getSpecimen,
		type: 'scatter',
		name: getName,
		line: {
			color: getColor,
			width: 4
		}
	};
	return entrovirusRateObject;
}
function createEntrovirusObject(getWeek, getSpecimen, getName, getColor) {
	var entrovirusObject = {
		x: getWeek,
		y: getSpecimen,
		type: 'bar',
		name: getName,
		marker: {
			color: getColor,
			opacity: 0.8
		}
	};
	return entrovirusObject;
}

function prepareEntrovirusData(data) {
  var xaxis = [];
	var scatterLine = [];
	var cox = [];
	var ev = [];
	var others = [];
	for(var i = 0; i < data.length ; i++) {
		xaxis.push(data[i]["yearweek"]);
		scatterLine.push(data[i]["positive"]);
		cox.push(data[i]["coxsackie"]);
		ev.push(data[i]["enterovirus"]);
		others.push(data[i]["others"]);
	}
	entroLBCData.push(createEntrovirusRate(xaxis,scatterLine,"Positive Rate",entroLBCSatterLineColor));
	entroLBCData.push(createEntrovirusObject(xaxis,cox,"Coxsackie",entroLBCColorsPalette[0]));
	entroLBCData.push(createEntrovirusObject(xaxis,ev,"Enterovirus",entroLBCColorsPalette[3]));
	entroLBCData.push(createEntrovirusObject(xaxis,others,"Others",entroLBCColorsPalette[5]));
}


/*
	desc : influenza line chart main body
*/
function entrovirusLBCBody(getURL) {
	if($("#entroLBCContainer").length) {
		/*
			desc : initial
		*/
	
		/*
			desc : start to plot the influenza line chart
		*/
		Plotly.d3.json(getURL, function(data){
			prepareEntrovirusData(data);
			rendering();
		});
	}
}
