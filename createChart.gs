function graph4(){}
//https://developers.google.com/apps-script/chart-configuration-options
function createChart(sheet,title,xaxis,yaxis,chartType){
  var range = sheet.getRange("A1").getDataRegion()
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    chart = chart.modify()
    .clearRanges()
    .addRange(range)
    .setChartType(chartType)
    .setOption('title', title)
    .setOptions('hAxis',{
  title: xaxis})
  .setOptions('yAxis',{
  title: yaxis})
    .setOption('isStacked', 'absolute')
    .build()
    sheet.updateChart(chart);
  }else{
    var chart = sheet.newChart()
    .setChartType(chartType)
    .addRange(range)
    .setOption('title', title)
    .setOption('isStacked', 'absolute')
    .setNumHeaders(1)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
    .setPosition(5, 5, 0, 0)
    .build()
    sheet.insertChart(chart);
  }
  return chart;
}