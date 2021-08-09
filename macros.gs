function HowtoStack() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('A1:C6'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'absolute')
  .setOption('title', 'Headroom and Amount Outstanding per Program')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#1a1a1a')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setPosition(5, 5, 0, 0)
  .build();
  sheet.insertChart(chart);
};