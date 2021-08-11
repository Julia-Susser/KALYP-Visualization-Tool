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

function percenting() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Y:Y').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('0.00%');
};

function PivottableDate() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E9').activate();
  var sourceData = spreadsheet.getRange('Securities!:');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  var pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['1/2/2020', '1/3/2020', '1/4/2020', '1/5/2020', '1/6/2020', '1/7/2020', '1/8/2020', '1/9/2020', '1/10/2020', '1/11/2020', '1/12/2020', '1/13/2020', '1/14/2020', '1/15/2020', '1/16/2020', '1/17/2020', '1/18/2020', '1/19/2020', '1/20/2020', '1/21/2020', '1/22/2020', '1/23/2020', '1/24/2020', '1/25/2020', '1/26/2020', '1/27/2020', '1/28/2020', '1/29/2020', '1/30/2020', '1/31/2020', '2/1/2020', '2/2/2020', '2/3/2020', '2/4/2020', '2/5/2020', '2/6/2020', '2/7/2020', '2/8/2020', '2/9/2020', '2/10/2020', '2/11/2020', '2/12/2020', '2/13/2020', '2/14/2020', '2/15/2020', '2/16/2020', '2/17/2020', '2/18/2020', '2/19/2020', '2/20/2020'])
  .build();
  pivotTable.addFilter(13, criteria);
  sourceData = spreadsheet.getRange('Securities!:');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['1/2/2020'])
  .build();
  pivotTable.addFilter(13, criteria);
  spreadsheet.getRange('A1').activate();
};

function MyMacro() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var sourceData = spreadsheet.getRange('Securities!:');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  var pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['UL 0', 'UL 1', 'UL 2', 'UL 3', 'UL 4'])
  .build();
  pivotTable.addFilter(20, criteria);
  sourceData = spreadsheet.getRange('Securities!:');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  sourceData = spreadsheet.getRange('Securities!:');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['1/2/2020', '1/3/2020', '1/4/2020', '1/5/2020', '1/6/2020', '1/7/2020', '1/8/2020', '1/9/2020', '1/10/2020', '1/11/2020', '1/12/2020', '1/13/2020', '1/14/2020', '1/15/2020', '1/16/2020', '1/17/2020', '1/18/2020', '1/19/2020', '1/20/2020', '1/21/2020', '1/22/2020', '1/23/2020', '1/24/2020', '1/25/2020', '1/26/2020', '1/27/2020', '1/28/2020', '1/29/2020', '1/30/2020', '1/31/2020', '2/1/2020', '2/2/2020', '2/3/2020', '2/4/2020', '2/5/2020', '2/6/2020', '2/7/2020', '2/8/2020', '2/9/2020', '2/10/2020', '2/11/2020', '2/12/2020', '2/13/2020', '2/14/2020', '2/15/2020', '2/16/2020', '2/17/2020', '2/18/2020', '2/19/2020', '2/20/2020'])
  .build();
  pivotTable.addFilter(13, criteria);
  sourceData = spreadsheet.getRange('Securities!:');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addPivotValue(8, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
  pivotGroup = pivotTable.addRowGroup(13);
  pivotGroup.showTotals(false);
  pivotGroup = pivotTable.addColumnGroup(6);
  pivotGroup.showTotals(false);
  criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['1/2/2020'])
  .build();
  pivotTable.addFilter(13, criteria);
};

function Filter() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Z3').activate()
  .setFormula('=FILTER(A2:B26, A2:A26 = A2)');
};

function dividething() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Z2').activate();
  spreadsheet.getCurrentCell().setFormula('=DIVIDE(X:X,I:I)');
  spreadsheet.getActiveRange().autoFill(spreadsheet.getRange('Z2:Z62'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('Z2:Z62').activate();
  spreadsheet.getActiveSheet().setFrozenRows(0);
};

function dividethingy2() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Z2').activate();
  spreadsheet.getCurrentCell().setFormula('=DIVIDE(X:X,I:I)');
  spreadsheet.getActiveRange().autoFill(spreadsheet.getRange('Z2:Z28'), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('Z2:Z28').activate();
};

function calculatedfield() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B2').activate();
  var sourceData = spreadsheet.getRange('Securities!A1:Z1001');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=0');
  var pivotGroup = pivotTable.addRowGroup(6);
  sourceData = spreadsheet.getRange('Securities!A1:Z1001');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=(\'Amount SEC approved\'-\'Amount Outstanding\')');
  pivotGroup = pivotTable.addRowGroup(6);
  sourceData = spreadsheet.getRange('Securities!A1:Z1001');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=(\'Amount SEC approved\'-\'Amount Outstanding\')');
  pivotGroup = pivotTable.addRowGroup(6);
};

function maxdate() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('AA6').activate();
  spreadsheet.getCurrentCell().setFormula('=MAX(M:M)');
  spreadsheet.getActiveRangeList().setNumberFormat('M/d/yyyy');
};

function CustomFunc() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A5').activate();
  var sourceData = spreadsheet.getRange('Securities!A1:AB1523');
  var pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  var pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=0');
  var pivotGroup = pivotTable.addRowGroup(4);
  sourceData = spreadsheet.getRange('Securities!A1:AB1523');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=\'Amount Outstanding\'');
  pivotGroup = pivotTable.addRowGroup(4);
  sourceData = spreadsheet.getRange('Securities!A1:AB1523');
  pivotTable = spreadsheet.getRange('A1').createPivotTable(sourceData);
  pivotValue = pivotTable.addCalculatedPivotValue('Calculated Field 1', '=\'Amount Outstanding\'');
  pivotValue.summarizeBy(SpreadsheetApp.PivotTableSummarizeFunction.CUSTOM);
  pivotGroup = pivotTable.addRowGroup(4);
};