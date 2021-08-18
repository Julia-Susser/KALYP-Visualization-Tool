function selectdatespivottable() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sourceData = spreadsheet.getRange('Transactions!A1:O1001');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotGroup = pivotTable.addRowGroup(7);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['', '1/6/2020', '1/7/2020', '1/8/2020', '1/9/2020', '1/10/2020', '1/11/2020', '1/12/2020', '1/13/2020', '1/14/2020', '1/15/2020', '1/16/2020', '1/17/2020', '1/18/2020', '1/19/2020', '1/20/2020', '1/21/2020', '1/22/2020', '1/23/2020', '1/24/2020', '1/25/2020', '1/26/2020', '1/27/2020', '1/28/2020', '1/29/2020', '1/30/2020', '1/31/2020', '2/1/2020', '2/2/2020', '2/3/2020', '2/4/2020', '2/5/2020', '2/6/2020', '2/7/2020', '2/8/2020', '2/9/2020', '2/10/2020', '2/11/2020', '2/12/2020', '2/13/2020', '2/14/2020', '2/15/2020', '2/16/2020', '2/17/2020', '2/18/2020', '2/19/2020', '2/20/2020', '2/21/2020', '2/22/2020', '2/23/2020', '2/24/2020', '2/25/2020', '2/26/2020', '2/27/2020', '2/28/2020', '2/29/2020', '3/1/2020', '3/2/2020', '3/3/2020', '3/4/2020', '3/5/2020', '3/6/2020', '3/7/2020', '3/8/2020', '3/9/2020', '3/10/2020', '3/11/2020', '3/12/2020', '3/13/2020', '3/14/2020', '3/15/2020', '3/16/2020', '3/17/2020', '3/18/2020', '3/19/2020', '3/20/2020', '3/21/2020', '3/22/2020', '3/23/2020', '3/24/2020', '3/25/2020', '3/26/2020', '3/27/2020', '3/28/2020', '3/29/2020', '3/30/2020', '3/31/2020', '4/1/2020', '4/2/2020', '4/3/2020', '4/4/2020', '4/5/2020', '4/6/2020', '4/7/2020', '4/8/2020', '4/9/2020', '4/10/2020'])
  .build();
  pivotTable.addFilter(10, criteria);
};

function pivottable() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sourceData = spreadsheet.getRange('Transactions!A1:P11250');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addPivotValue(7, SpreadsheetApp.PivotTableSummarizeFunction.COUNTA);
  var pivotGroup = pivotTable.addRowGroup(16);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addRowGroup(12);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(7);
  pivotGroup.showTotals(false);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['pending'])
  .build();
  pivotTable.addFilter(5, criteria);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021', '1/17/2021', '1/18/2021', '1/19/2021', '1/20/2021', '1/21/2021', '1/22/2021', '1/23/2021', '1/24/2021', '1/25/2021', '1/26/2021', '1/27/2021', '1/28/2021', '1/29/2021', '1/30/2021', '1/31/2021', '2/1/2021', '2/2/2021', '2/3/2021', '2/4/2021', '2/5/2021', '2/6/2021', '2/7/2021', '2/8/2021', '2/9/2021', '2/10/2021', '2/11/2021', '2/12/2021', '2/13/2021', '2/14/2021', '2/15/2021', '2/16/2021', '2/17/2021', '2/18/2021', '2/19/2021', '2/20/2021', '2/21/2021', '2/22/2021', '2/23/2021', '2/24/2021', '2/25/2021', '2/26/2021', '2/27/2021', '2/28/2021', '3/1/2021', '3/2/2021', '3/3/2021', '3/4/2021', '3/5/2021', '3/6/2021', '3/7/2021', '3/8/2021', '3/9/2021', '3/10/2021', '3/11/2021', '3/12/2021', '3/13/2021', '3/14/2021', '3/15/2021', '3/16/2021', '3/17/2021', '3/18/2021', '3/19/2021', '3/20/2021', '3/21/2021', '3/22/2021', '3/23/2021', '3/24/2021', '3/25/2021', '3/26/2021', '3/27/2021', '3/28/2021', '3/29/2021', '3/30/2021', '3/31/2021', '4/1/2021', '4/2/2021', '4/3/2021', '4/4/2021', '4/5/2021', '4/6/2021', '4/7/2021', '4/8/2021', '4/9/2021', '4/10/2021'])
  .build();
  pivotTable.addFilter(16, criteria);
  sourceData = spreadsheet.getRange('Transactions!A1:P11250');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(7, SpreadsheetApp.PivotTableSummarizeFunction.COUNTA);
  pivotGroup = pivotTable.addRowGroup(16);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addRowGroup(12);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(7);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['pending'])
  .build();
  pivotTable.addFilter(5, criteria);
  sourceData = spreadsheet.getRange('Transactions!A1:P11250');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(7, SpreadsheetApp.PivotTableSummarizeFunction.COUNTA);
  pivotGroup = pivotTable.addRowGroup(16);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addRowGroup(12);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(7);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['pending'])
  .build();
  pivotTable.addFilter(5, criteria);
};

function pivottable2() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sourceData = spreadsheet.getRange('Transactions!A1:P11250');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addPivotValue(7, SpreadsheetApp.PivotTableSummarizeFunction.COUNTA);
  var pivotGroup = pivotTable.addRowGroup(16);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addRowGroup(12);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(7);
  pivotGroup.showTotals(false);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['pending'])
  .build();
  pivotTable.addFilter(5, criteria);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['', '1/13/2021', '1/14/2021', '1/15/2021', '1/16/2021', '1/17/2021', '1/18/2021', '1/19/2021', '1/20/2021', '1/21/2021', '1/22/2021', '1/23/2021', '1/24/2021', '1/25/2021', '1/26/2021', '1/27/2021', '1/28/2021', '1/29/2021', '1/30/2021', '1/31/2021', '2/1/2021', '2/2/2021', '2/3/2021', '2/4/2021', '2/5/2021', '2/6/2021', '2/7/2021', '2/8/2021', '2/9/2021', '2/10/2021', '2/11/2021', '2/12/2021', '2/13/2021', '2/14/2021', '2/15/2021', '2/16/2021', '2/17/2021', '2/18/2021', '2/19/2021', '2/20/2021', '2/21/2021', '2/22/2021', '2/23/2021', '2/24/2021', '2/25/2021', '2/26/2021', '2/27/2021', '2/28/2021', '3/1/2021', '3/2/2021', '3/3/2021', '3/4/2021', '3/5/2021', '3/6/2021', '3/7/2021', '3/8/2021', '3/9/2021', '3/10/2021', '3/11/2021', '3/12/2021', '3/13/2021', '3/14/2021', '3/15/2021', '3/16/2021', '3/17/2021', '3/18/2021', '3/19/2021', '3/20/2021', '3/21/2021', '3/22/2021', '3/23/2021', '3/24/2021', '3/25/2021', '3/26/2021', '3/27/2021', '3/28/2021', '3/29/2021', '3/30/2021', '3/31/2021', '4/1/2021', '4/2/2021', '4/3/2021', '4/4/2021', '4/5/2021', '4/6/2021', '4/7/2021', '4/8/2021', '4/9/2021', '4/10/2021'])
  .build();
  pivotTable.addFilter(16, criteria);
  sourceData = spreadsheet.getRange('Transactions!A1:P11250');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(7, SpreadsheetApp.PivotTableSummarizeFunction.COUNTA);
  pivotGroup = pivotTable.addRowGroup(16);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addRowGroup(12);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(7);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['pending'])
  .build();
  pivotTable.addFilter(5, criteria);
};

function repeatlabels() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('C5').activate();
  var sourceData = spreadsheet.getRange('Transactions!A1:Q14795');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addCalculatedPivotValue('Type', '=Type');
  pivotValue.summarizeBy(SpreadsheetApp.PivotTableSummarizeFunction.CUSTOM);
  pivotValue = pivotTable.addCalculatedPivotValue('age settled', '=\'Settlement Date\'-\'Instruction Date\'');
  pivotValue.summarizeBy(SpreadsheetApp.PivotTableSummarizeFunction.CUSTOM);
  var pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false)
  .showRepeatedLabels();
  pivotGroup = pivotTable.addRowGroup(3);
  pivotGroup.showTotals(false);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['3/26/2021', '3/25/2021', '3/24/2021', '3/23/2021', '3/22/2021', '3/21/2021', '3/20/2021', '3/19/2021', '3/18/2021', '3/17/2021', '3/16/2021', '3/15/2021', '3/14/2021', '3/13/2021', '3/12/2021', '3/11/2021', '3/10/2021', '3/9/2021', '3/8/2021', '3/7/2021', '3/6/2021', '3/5/2021', '3/4/2021', '3/3/2021', '3/2/2021', '3/1/2021', '2/28/2021', '2/27/2021', '2/26/2021', '2/25/2021', '2/24/2021'])
  .build();
  pivotTable.addFilter(16, criteria);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['settled'])
  .build();
  pivotTable.addFilter(5, criteria);
};

function minmax() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];

  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('A1:I33'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(2)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'absolute')
  .setOption('title', '# of pending transactions (older than 10) per Program')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#1a1a1a')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setXAxisTitle('Program')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('# of pending transactions from 2/24/2021 to 3/26/2021')
  .setRange(0, NaN)
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setPosition(5, 5, 0, 0)
  .build();
  sheet.insertChart(chart);
  charts = sheet.getCharts();
  chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asColumnChart()
  .addRange(spreadsheet.getRange('A1:I33'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(2)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_COLUMNS)
  .setOption('bubble.stroke', '#000000')
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'absolute')
  .setOption('title', '# of pending transactions (older than 10) per Program')
  .setOption('annotations.domain.textStyle.color', '#808080')
  .setOption('textStyle.color', '#000000')
  .setOption('legend.textStyle.color', '#1a1a1a')
  .setOption('titleTextStyle.color', '#757575')
  .setOption('annotations.total.textStyle.color', '#808080')
  .setXAxisTitle('Program')
  .setOption('hAxis.textStyle.color', '#000000')
  .setOption('hAxis.titleTextStyle.color', '#000000')
  .setYAxisTitle('# of pending transactions from 2/24/2021 to 3/26/2021')
  .setRange(0, 100)
  .setOption('vAxes.0.textStyle.color', '#000000')
  .setOption('vAxes.0.titleTextStyle.color', '#000000')
  .setPosition(5, 5, 0, 0)
  .build();
  sheet.insertChart(chart);
};

function sorrrt() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A3:I14').activate()
  .sort({column: 1, ascending: true});
};