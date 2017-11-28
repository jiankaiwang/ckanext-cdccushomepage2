/*
    desc : global variables
 */
var diarrheaPCColorsPalette = [
    "rgba(255, 153, 102, 1)",
    "rgba(204, 102, 51, 1)",
    "rgba(204, 153, 0, 1)",
    "rgba(255, 153, 51, 1)",
    "rgba(255, 119, 51, 1)",
    "rgba(153, 102, 0, 1)"
];
var diarrheaPCData = [{
    values:[],
    labels:[],
    type:'pie',
    hoverinfo: 'label+percent',
    textinfo: 'label',
    textposition: "outside",
    marker: {
    colors: diarrheaPCColorsPalette,
        line: {
            color: '#fff',
            width: 2
        }
    },
    textfont: {
      size: 14
    }
}];

var diarrheaPCRawData = { '0-4':0, '5-14':0, '15-24':0, '25-64':0, '65+':0 };
var diarrheaPCLayout = {
    title: "",
    margin: { l: 40, r: 40, b: 40, t: 30, pad: 4 },
    showlegend: false,
};

/*
    desc : prepare dengue data for line charts
*/
function preparediarrheaPCData(data) {
    // parse data, header column name is not involved
    for(var i = 0 ; i < data.length ; i ++) {
        // sum all determined cases
				diarrheaPCRawData[data[i]["age"]] = data[i]["diaval"];
				
				// prepare data for pie chart
				diarrheaPCData[0]['labels'].push("年齡層<br>" + data[i]["age"]);    
        diarrheaPCData[0]['values'].push(data[i]["diaval"]);
    }
}

/*
    desc : show dengue determined case count in line chart since 2012
*/
function diarrheaPieData(getUrl) {
    /*
        desc : initial variables
    */
    for(var key in diarrheaPCRawData) {
        diarrheaPCRawData[key] = 0;
    }
    diarrheaPCData[0]['values'] = [];
    diarrheaPCData[0]['labels'] = [];
    
    /*
        desc : start to plot the dengue line chart
    */
    Plotly.d3.json(getUrl, function(data){
            preparediarrheaPCData(data);
            rendering();
    });
}
