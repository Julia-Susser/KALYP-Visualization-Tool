

//https://developers.google.com/apps-script/chart-configuration-options
function graph4(){}
function createChart(sheet,chartType,chartParams={}){
  var range = sheet.getRange("A1").getDataRegion()
  height = range.getHeight()
  //if a chart is already there remove it and add another one
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    sheet.removeChart(chart)
  }
  //Create embedded sheet chart 
  var chart = sheet.newChart()
  .setChartType(chartType)
  .setOption('legend.position', 'right')
  .setOption('legend.textStyle.fontSize', 18)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setPosition(5, 5, 0, 0)

  //Add specific ranges if the ranges are not null. otherwise use the entire sheet in the table
  if (chartParams.ranges !=undefined){
    for (var r=0;r<chartParams.ranges.length;r++){
      chart = chart.addRange(sheet.getRange(chartParams.ranges[r]))
    }
  }else{
    chart = chart.addRange(range)
  }
  numHeaders = 1
  if (chartParams.numHeaders !=undefined){
    numHeaders = chartParams.numHeaders
  }
  chart.setNumHeaders(numHeaders)
  
  if (chartParams.verticalaxis!=undefined){
    chart = chart
    .asBarChart()
    chart.setRange(chartParams.verticalaxis.min,chartParams.verticalaxis.max)
  }
  if (chartParams.verticallabels!=undefined){
    chart.setOption('vAxis',{ textPosition: 'none' })
  }
  if (chartParams.horizontallabels!=undefined){
    chart.setOption('hAxis',{ textPosition: 'none' })
  }
  if (chartParams.verticalAxisTitle!=undefined){
    chart.setOption('vAxis',{title:chartParams.verticalAxisTitle})
  }
  if (chartParams.horizontalAxisTitle!=undefined){
    chart.setOption('hAxis',{title:chartParams.horizontalAxisTitle})
  }
  if (chartParams.title!=undefined){
    chart.setOption('title', chartParams.title)
  }
  if (chartParams.stacked!=undefined){
    chart.setOption('isStacked', chartParams.stacked.toString())
  }
  if (chartParams.legendVisible===false){
    chart.setOption('legend.position','none')
  }
  if (chartParams.size!=undefined){
    chart.setOption('height',chartParams.size.height)
    chart.setOption('width',chartParams.size.width)
  }
  if (chartParams.legendFontSize!=undefined){
    chart.setOption('legend.textStyle.fontSize',chartParams.legendFontSize)
  }
  chart = chart.build()
  
  sheet.insertChart(chart);
  return chart;
}


