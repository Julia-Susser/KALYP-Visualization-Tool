

function color_code() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];
  series = sheet.getRange("1:1").getValues()[0].slice(1,).filter(v => v)
  color_code = {
    "b": {color: 'green'},
    "c": {color: 'blue'}
  }
  colors = series.map(s => color_code[s])
  console.log(colors)
  chart = chart.modify()
  .setOption('series', colors)
  .build();
  sheet.updateChart(chart);
};



