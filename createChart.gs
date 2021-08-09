function graph4(){}

function createChart(sheet,name,chartType){
  var range = sheet.getRange("A1").getDataRegion()
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    chart = chart.modify()
    .clearRanges()
    .addRange(range)
    .setStacked()
    .setChartType(chartType)
    .setOption('title', name)
    .build()
    sheet.updateChart(chart);
  }else{
    var chart = sheet.newChart()
    .setChartType(chartType)
    .addRange(range)
    .setOption('title', name)
    .setNumHeaders(1)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
    .setPosition(5, 5, 0, 0)
    .build()
    sheet.insertChart(chart);
  }
  return chart;
}