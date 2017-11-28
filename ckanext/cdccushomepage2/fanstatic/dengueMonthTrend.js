/*
	desc : global variables
 */
var dengueLCData = [];
var dengueLCCurrentYear = 0;
var dengueLCCurrentMonth = 0;
var DengueLCColorsPalette = ["rgb(255, 153, 102)","rgb(255, 119, 51)","rgb(255, 153, 51)","rgb(204, 102, 0)","rgb(204, 153, 0)","rgb(153, 102, 51)"];
var dengueLCCurrentColor = "rgb(85, 128, 170)";
var dengueLCLayout = {
	title: "",
	margin: { l: 40, r: 20, b: 30, t: 20, pad: 4 },
	showlegend: false,
	xaxis: { showgrid: false, zeroline: false, autotick: false },
	yaxis: { showline: false }
};

/*
	desc : prepare dengue data objects
*/
function getDengueLCObjectIsCurrentYear(getCurrentYear) {
	if(getCurrentYear == dengueLCCurrentYear) { return 4; } else { return 2; }
}
function getDengueLCObjectCurrentColor(getCurrentYear,getColor) {
	if(getCurrentYear == dengueLCCurrentYear) { return dengueLCCurrentColor; } else { return getColor; }
}
function createDengueLCDataObject(monthList, DTCases, getColor, getCurrentYear) {
	var dengueLCDataObj = {
		x: monthList,
		y: DTCases,
		mode: 'lines+markers',
		name: getCurrentYear,
		marker: {
			color: getDengueLCObjectCurrentColor(getCurrentYear,getColor),
			size: 6
		},
		line: {
			color: getDengueLCObjectCurrentColor(getCurrentYear,getColor),
			width: getDengueLCObjectIsCurrentYear(getCurrentYear)
		},
		connectgaps: true
	};
	return dengueLCDataObj;
}

/*
	desc : prepare dengue data for line charts
*/
function prepareDengueLCData(data) {
	// prepare data for Line chart
	var monthList = [];	
	var preData = [];
	var parseYear = 0;
	var dengueLCYearList = [];      // 2013, 2014, 2015, 2016, ...
	var dengueLCRawData = {};       // 2013 : { 1 : 30, 2 : 40, 3 : 60, ... }
	
	for(var i = 0 ; i < data.length ; i++) {
	
		if(parseYear != data[i]['year']) {
			if(i != 0) {
				dengueLCData.push(
					createDengueLCDataObject(
						monthList, 
						preData,
						DengueLCColorsPalette[i % (DengueLCColorsPalette.length)],
						parseYear
					)
				);
			}
			
			// initial
			monthList = [];			
			preData = [];
			parseYear = data[i]['year'];
			dengueLCYearList.push(parseYear);
		}
		
		monthList.push(data[i]['month']);
		preData.push(data[i]['dengueval']);
		
		// save the same peroid for the past few years
		if(data[i]['month'] == dengueLCCurrentMonth) {
			dengueLCRawData[parseYear] = data[i]['dengueval'];
		}
		
		// the final entity
		if(i == data.length-1) {
			dengueLCData.push(
				createDengueLCDataObject(
					monthList, 
					preData,
					DengueLCColorsPalette[i % (DengueLCColorsPalette.length)],
					parseYear
				)
			);
		}
	}
	
	
	// set information
	$('#dengueLinechartMonth').text(dengueLCCurrentMonth + ' 月');
	var getSamePeroid = "";
	for(var i = 1 ; i < dengueLCYearList.length ; i++) {
		getSamePeroid += '<li><span class="container-list-item">' + dengueLCYearList[i] + '</span><br><span class="container-list-value">' + dengueLCRawData[dengueLCYearList[i]] + '</span></li>';
	}
	$('#dengueLinechartMonth').parent().parent().append(getSamePeroid);
}

/*
	desc : show dengue determined case count in line chart since 2012
*/
function dengueLineChartBody(getUrl) {
	/*
	desc : initial variables
	*/
	
	/*
		desc : start to plot the dengue line chart
	*/
	Plotly.d3.json(getUrl, function(data){
		dengueLCCurrentYear = data[data.length-1]['year'];
		dengueLCCurrentMonth = data[data.length-1]['month'];
		prepareDengueLCData(data);
		rendering();
	});
}
