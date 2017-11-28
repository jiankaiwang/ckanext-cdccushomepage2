/*
	desc : define constant
*/
var hivBCData = [];
var hivBCYear = [];     // y-axis
var hivBCAge = ["0-19","20-29","30-39","40-49","50-59","60-69","70+"];  // x-axis
var hivBCColorsPalette = ["rgb(255, 153, 51)","rgb(51, 102, 153)","rgb(255, 119, 51)","rgb(204, 102, 0)","rgb(51, 153, 51)","rgb(153, 102, 51)","rgb(51, 51, 0)"];
var hivBCLayout = {
	title: "",
	barmode: 'stack',
	margin: { l: 50, r: 10, b: 30, t: 20, pad: 4 },
	showlegend: false,
	xaxis: { showgrid: false, zeroline: false },
	yaxis: { showline: false, autotick: false }
};

/*
* desc : define each hiv object
* Object : "0-19", "20-34", ... (age-peroid object)
*/
function createHIVBCObject(getDTCount, getYearList, getName, getColor) {
	var hivObject = {
		x: getDTCount,
		y: getYearList,
		type: 'bar',
		name: getName,
		orientation: 'h',
		marker: {
						color: getColor,
						opacity: 0.8
		}
	};
	return hivObject;
}
/*
	desc : prepare hivObject for drawing
*/

function prepareHIVBCData(data) {
	// prepare hivObject
	var DTCnt = [];
	for(var i = 0 ; i < hivBCAge.length ; i++) {
		DTCnt = [];
		for(var j = 0 ; j < data.length ; j++) {
			if(data[j]["age"] == hivBCAge[i]) {
				DTCnt.push(parseInt(data[j]['hivval']));
			}
		}
		//console.log(DTCnt);
		hivBCData.push(
			createHIVBCObject(DTCnt,hivBCYear,hivBCAge[i],hivBCColorsPalette[i % hivBCColorsPalette.length])
		);
	}
}

/*
	desc : influenza line chart main body
*/
function hivBCDraw(getURL) {
	if($("#hivBCContainer").length) {
		/*
		desc : start to plot the influenza line chart
		*/
		var hivBCCrtYear = "";
		var mostHIVAge = "";
		var mostHIVVal = 0;
		Plotly.d3.json(getURL, function(data){
				// initialization
				hivBCCrtYear = data[data.length - 1]['year'];
				for(var i = 0 ; i < data.length ; i ++) {
					// search all
					if (hivBCYear.indexOf(parseInt(data[i]['year'])) < 0) {
						hivBCYear.push(parseInt(data[i]['year']));
					}
					
					// find the current year
					if(data[i]['year'] == hivBCCrtYear) {
						if(parseInt(data[i]['hivval']) > mostHIVVal) {
							mostHIVAge = data[i]['age'];
							mostHIVVal = parseInt(data[i]['hivval']);
						}
					}
				}
				Plotly.d3.select("#hivBCYear").text(hivBCCrtYear);
				Plotly.d3.select("#hivBCWeek").text(mostHIVAge);
		
				prepareHIVBCData(data);
				rendering();
		});
	}
}
