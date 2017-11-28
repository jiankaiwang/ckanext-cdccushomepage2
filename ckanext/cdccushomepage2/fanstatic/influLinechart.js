	/*
	desc : define constant
	rawinfluLCData : { 2016 : { 1:30, 2:50, ... } }, for each week
	rawinfluLCDataAll : { 2016 : { 1:30, 2:50, ... } }, sum each week
	*/
	var showInfluWeeks = [];
	var getInfluCrtFullYear = 0;
	var getInfluCrtWeek = 0;
	var colorsPalette = ["rgb(255, 153, 102)","rgb(255, 119, 51)","rgb(255, 153, 51)","rgb(204, 102, 0)","rgb(204, 153, 0)","rgb(153, 102, 51)"];
	var influLCCurrentColor = "rgb(85, 128, 170)";
	var influLCData = [];
	var layout = {
		title: "",
		margin: { l: 40, r: 40, b: 40, t: 5, pad: 4 },
		showlegend: false,
		xaxis: { showgrid: false, zeroline: false },
		yaxis: { showline: false }
	};

	/*
	* desc : define each influLCData object
	*/
	function getIsCurrentYear(getCurrentYear) {
		if(getCurrentYear == getInfluCrtFullYear) { return 4; } else { return 2; }
	}

	function getInfluLCObjectCurrentColor(getCurrentYear,getColor) {
		if(getCurrentYear == getInfluCrtFullYear) { return influLCCurrentColor; } else { return getColor; }
	}

	function createinfluLCDataObject(DTCases,getColor,getCurrentYear) {
		var influLCDataObj = {
			x: showInfluWeeks,
			y: DTCases,
			mode: 'lines',
			name: getCurrentYear,
			marker: {
				color: getInfluLCObjectCurrentColor(getCurrentYear,getColor),
				size: 12
			},
			line: {
				color: getInfluLCObjectCurrentColor(getCurrentYear,getColor),
				width: getIsCurrentYear(getCurrentYear)
			},
			connectgaps: true
		};
		return influLCDataObj;
	}
	
	/*
	desc : prepare influLCData for drawing
	*/
	function prepareinfluLCData(getinfluLCData) {
		// get current year and week		
		var parseYear = 0;
		var preinfluLCData = [];
		for(var item = 0 ; item < getinfluLCData.length ; item++) {
			if(parseYear != parseInt(getinfluLCData[item]['year'])) {
				if(parseYear != 0) {
					influLCData.push(
						createinfluLCDataObject(preinfluLCData,colorsPalette[item%(colorsPalette.length)],parseYear)
					);
				}
				
				// initialization
				parseYear = parseInt(getinfluLCData[item]['year']);
				preinfluLCData = [];
			}
			preinfluLCData.push(parseFloat(getinfluLCData[item]['influop']));
		}
		
		// the latest year
		influLCData.push(
			createinfluLCDataObject(preinfluLCData,colorsPalette[item%(colorsPalette.length)],parseYear)
		);
	}
	
	/*
	desc : influenza line chart main body
	*/
	function influLCBody(getURL) {
		if($("#influLinechartContainer").length) {
			/*
			desc : initial
			*/
			for(var i = 1 ; i <= 53 ; i++) { showInfluWeeks.push(i); }

			/*
			desc : start to plot the influenza line chart
			*/
			Plotly.d3.json(getURL, function(data){
				// initialization
				for(var i = data.length-1 ; i >= 0 ; i--) {
					if(data[i]['influop'] != "null") {
						getInfluCrtFullYear = parseInt(data[i]['year']);
						getInfluCrtWeek = parseInt(data[i]['week']);
						// show current year and week
						Plotly.d3.select("#influLinechartYear").text(getInfluCrtFullYear);
						Plotly.d3.select("#influLinechartWeek").text(getInfluCrtWeek);
						Plotly.d3.select("#influLinechartRatio").text(data[i]['influop'] + ' %');
						break;
					}
				}
				
				// operation
				prepareinfluLCData(data);
				rendering();
			});
		}
	}
