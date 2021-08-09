function createChart(sheet,name,chartType){
  var range = sheet.getRange("A1").getDataRegion()
  var range = sheet.getRange(2,1,range.getHeight(),range.getWidth())
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    chart = chart.modify()
    .clearRanges()
    .addRange(range)
    .setChartType(chartType)
    .setOption('title', name)
    .build()
    sheet.updateChart(chart);
  }else{
    var chart = sheet.newChart()
    .setChartType(chartType)
    .addRange(range)
    .setOption('title', name)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
    .setPosition(5, 5, 0, 0)
    .build()
    sheet.insertChart(chart);
  }
  return chart;
}