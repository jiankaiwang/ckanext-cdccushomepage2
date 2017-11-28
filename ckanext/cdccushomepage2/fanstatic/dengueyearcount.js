/*
  desc : global variables
 */
var dengueYCData = [{ x:[], y:[], type:'bar', marker: {color: 'rgb(255, 153, 102)'} }];
var DengueYCColorsPalette = ["rgb(255, 153, 102)","rgb(255, 119, 51)","rgb(255, 153, 51)","rgb(204, 102, 0)","rgb(204, 153, 0)","rgb(153, 102, 51)"];
var dengueYCLayout = {
  title: "",
  margin: { l: 40, r: 20, b: 30, t: 5, pad: 4 },
  showlegend: false,
  xaxis: { showgrid: false, zeroline: false, autotick: false },
  yaxis: { showline: false }
};


/*
  desc : prepare dengue data for line charts
*/
function prepareDengueYCData(data) {
  // prepare data for column(bar) chart
  for(var i = 0 ; i < data.length ; i++) {
    dengueYCData[0]['x'].push(data[i]['year']);
    dengueYCData[0]['y'].push(data[i]['dengueval']);
  }
  
  // set information
  var lastYear = data[data.length-2]['dengueval'];
  var crtYear = data[data.length-1]['dengueval'];
  var ratio = ((crtYear-lastYear) / lastYear) * 100;
  var showStr = (data[data.length-2]['year']).toString() + " - " + (data[data.length-1]['year']).toString();
  if(ratio < 0) {
    showStr += " ↓ ";
  } else {
    showStr += " ↑ ";
  }
  $('#dengueYearCountPreText').text(showStr);
  $('#dengueYearCountText').text(Math.abs(ratio).toFixed(2) + ' %');
}

/*
  desc : show dengue determined case count in line chart since 2012
*/
function dengueYearCountData(getUrl) {
  /*
    desc : initial variables
  */
  
  /*
    desc : start to plot the dengue line chart
  */
  Plotly.d3.json(getUrl, function(data){
			prepareDengueYCData(data);
      rendering();
  });
}
