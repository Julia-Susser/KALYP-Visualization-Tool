function graph4(){}
//https://developers.google.com/apps-script/chart-configuration-options

function createChart(sheet,title,xaxis,yaxis,chartType,numHeaders=1,ranges=null){
  var range = sheet.getRange("A1").getDataRegion()
  height = range.getHeight()
  
  if (sheet.getCharts().length>0){
    var chart = sheet.getCharts()[0];
    sheet.removeChart(chart)
  }
  var chart = sheet.newChart()
  .setChartType(chartType)
  .setOption('title', title)
  .setOption('isStacked', 'true')
  .setNumHeaders(numHeaders)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setPosition(5, 5, 0, 0)
  .setOption('hAxis',{title:xaxis})
  .setOption('vAxis',{title:yaxis})
  if (ranges !=null){
    
    for (var r=0;r<ranges.length;r++){
      firstcol = ranges[r][0]
      lastcol = ranges[r][1]
      console.log(firstcol)
      chart = chart.addRange(sheet.getRange(1,firstcol,height,lastcol))
    }
  }else{
    chart = chart.addRange(range)
  }
  chart = chart.build()
  sheet.insertChart(chart);
  return chart;
}


