function graph4(){}
//https://developers.google.com/apps-script/chart-configuration-options

function createChart(sheet,title,xaxis,yaxis,chartType){
  var range = sheet.getRange("A1").getDataRegion()
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    sheet.removeChart(chart)
  }
  var chart = sheet.newChart()
  .setChartType(chartType)
  .addRange(range)
  .setOption('title', title)
  .setOption('isStacked', 'absolute')
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setPosition(5, 5, 0, 0)
  .setOption('hAxis',{title:xaxis})
  .setOption('vAxis',{title:yaxis})
  .build()
  sheet.insertChart(chart);
  return chart;
}


function createLineChart(sheet,title,xaxis,yaxis,chartType){
  var range = sheet.getRange("A1").getDataRegion()
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    sheet.removeChart(chart)
  }
  var chart = sheet.newChart()
  .setChartType(chartType)
  .addRange(range)
  .setOption('title', title)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setPosition(5, 5, 0, 0)
  .setOption('hAxis',{title:xaxis})
  .setOption('vAxis',{title:yaxis})
  .build()
  sheet.insertChart(chart);
  return chart;
}