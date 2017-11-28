/*
* desc : show dengue determined case count
* path : /
*/
function setShowDengueCntFun() {
  if(window.jQuery) {
    dengueYearCountData('https://od.cdc.gov.tw/opendataplatform/?s=dengue&v=a1');
  }
}

/*
* desc : show ratios of each age groups in influenza determined cases
* path : /
*/
function setShowInfluAge() {
  if(window.jQuery) {
    if($("#influPieblockContainer").length) {
      $('#influPieblockContainer').css({ height: $('#influPieblockContainer').height() });
      $('#showInfluPie').contents().find('.basicChart').css({
        height: "200px",
        width: $('#influPieblockContainer').width()*0.95 });
      $('#showInfluPie').contents().find('body').css({ backgroundColor: 'rgba(255,255,255,1)' });
    }
  }
}

/*
* desc : show ratios of each age groups in diarrhea determined cases
* path : /
*/
function setShowDiarrheaAge() {
  if(window.jQuery) {
    diarrheaPieData('https://od.cdc.gov.tw/opendataplatform/?s=diarrheapiechart&v=a1');
  }
}

/*
* desc : show influenza line chart based on plotly.js
* path : /
*/
function setInfluLCBody() {
  if(window.jQuery) {
    influLCBody("https://od.cdc.gov.tw/opendataplatform/?s=influlinechart&v=a1");
  }
}

/*
* desc : show dengue line chart based on plotly.js
* path : /
*/
function setDengueLCBody() {
  if(window.jQuery) {
    dengueLineChartBody('https://od.cdc.gov.tw/opendataplatform/?s=dengue&v=a2');
  }
}

/*
* desc : show entrovirus specimen
*/
function setEVLBCBody() {
  if(window.jQuery) {
    entrovirusLBCBody('https://od.cdc.gov.tw/opendataplatform/?s=enterovirus&v=a1');
  }
}

/*
* desc : show hiv cases
*/
function setHIVBCFunc() {
  if(window.jQuery) {
    hivBCDraw('https://od.cdc.gov.tw/opendataplatform/?s=hivbc&v=a1');
  }
}

/*
* desc : RWD
*/
function rendering() {
  /*
  * desc : resize dengue year count
  */
  if(window.jQuery && $("#dengueYearCountContainer").length > 0 && $('#dengueYearCount').length > 0) {
    // clear the image
    Plotly.d3.select('#dengueYearCount svg').html('');
    dengueYCLayout["height"] = parseInt(Plotly.d3.select("#dengueYearCountContainer").style("height"), 10);
    dengueYCLayout["width"] = parseInt(Plotly.d3.select("#dengueYearCountContainer").style("width"), 10);
    dengueYCLayout["autosize"] = false;
    Plotly.newPlot('dengueYearCount', dengueYCData, dengueYCLayout);
  }

  /*
  * desc : resize influenza line chart
  */
  if(window.jQuery && $('#influLinechartBody').length > 0 && $('#influLinechartContainer').length > 0) {
    Plotly.d3.select('#influLinechartBody svg').html('');
    layout["height"] = parseInt(Plotly.d3.select("#influLinechartContainer").style("height"), 10);
    layout["width"] = parseInt(Plotly.d3.select("#influLinechartContainer").style("width"), 10);
    layout["autosize"] = false;
    Plotly.newPlot('influLinechartBody', influLCData, layout);
  }
  /*
  * desc : resize influenza pie chart
  */
  setShowInfluAge();

  /*
  * desc : resize diarrhea pie chart
  */
  if(window.jQuery && $("#diarrheaPieContainer").length > 0 && $('#diarrheaPie').length > 0) {
    Plotly.d3.select('#diarrheaPie svg').html('');
    diarrheaPCLayout["height"] = parseInt(Plotly.d3.select("#diarrheaPieContainer").style("height"), 10);
    diarrheaPCLayout["width"] = parseInt(Plotly.d3.select("#diarrheaPieContainer").style("width"), 10);
    diarrheaPCLayout["autosize"] = false;
    Plotly.newPlot('diarrheaPie', diarrheaPCData, diarrheaPCLayout);
  }

  /*
  * desc : resize dengue line chart
  */
  if(window.jQuery && $('#dengueLineChartBody').length > 0 && $('#dengueLineChartContainer').length > 0) {
    Plotly.d3.select('#dengueLineChartBody svg').html('');
    dengueLCLayout["height"] = parseInt(Plotly.d3.select("#dengueLineChartContainer").style("height"), 10);
    dengueLCLayout["width"] = parseInt(Plotly.d3.select("#dengueLineChartContainer").style("width"), 10);
    dengueLCLayout["autosize"] = false;
    Plotly.newPlot('dengueLineChartBody', dengueLCData, dengueLCLayout);
  }

  /*
  * desc : resize entrovirus line and bar charts
  */
  if(window.jQuery && $('#entroLBCContainer').length > 0 && $('#entroLBCBody').length > 0) {
    Plotly.d3.select('#entroLBCBody svg').html('');
    entroLBCLayout["height"] = parseInt(Plotly.d3.select("#entroLBCContainer").style("height"), 10);
    entroLBCLayout["width"] = parseInt(Plotly.d3.select("#entroLBCContainer").style("width"), 10);
    entroLBCLayout["autosize"] = false;
    Plotly.newPlot('entroLBCBody', entroLBCData, entroLBCLayout);
  }

  /*
  * desc : resize hiv stack bar chart
  */
  if(window.jQuery && $('#hivBCContainer').length > 0 && $('#hivBCBody').length > 0) {
    Plotly.d3.select('#hivBCBody svg').html('');
    hivBCLayout["height"] = parseInt(Plotly.d3.select("#hivBCContainer").style("height"), 10);
    hivBCLayout["width"] = parseInt(Plotly.d3.select("#hivBCContainer").style("width"), 10);
    hivBCLayout["autosize"] = false;
    Plotly.newPlot('hivBCBody', hivBCData, hivBCLayout);    
  }

  /*
  * desc : resize TB Tree Map
  */
  if(window.jQuery && $('#tbTMContainer').length > 0 && $('#tbTMBody').length > 0) {
    // clear the image
    Plotly.d3.select('#tbTMBody svg').html('');
    tbTMLayout["height"] = parseInt(Plotly.d3.select("#tbTMContainer").style("height"), 10);
    tbTMLayout["width"] = parseInt(Plotly.d3.select("#tbTMContainer").style("width"), 10);
    tbTMLayout["autosize"] = false;
    Plotly.newPlot('tbTMBody', tbTMData, tbTMLayout);    
  }

}


/*
* desc : initialize homepage
*/
$(function () {

  setShowDengueCntFun();
  setShowInfluAge();
  setShowDiarrheaAge();
  setInfluLCBody();
  setDengueLCBody();
  setEVLBCBody();
  setHIVBCFunc();

  Plotly.d3.select(window).on('resize.main', rendering);

});

