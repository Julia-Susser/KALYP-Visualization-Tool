

function createPivotTable(dataSheet,pivotTableSheet,rowNames=[], valuesNames=[],filters=[],columnNames=[],customFunctions=[],dataSheetRange=null,sheetRange=null){
  
  var sourceData = dataSheet.getDataRange()
  if (dataSheetRange != null){
    var sourceData = dataSheet.getRange(dataSheetRange) // source data is not the entire page
  }
  if (sheetRange != null){
    pivotTable = pivotTableSheet.getRange(sheetRange).createPivotTable(sourceData); // start the pivot table at different point than A1
  }else{
    pivotTable = pivotTableSheet.getRange('A1').createPivotTable(sourceData);
  }

  for (var i=0;i<valuesNames.length;i++){
    value = getColIndxFromName(dataSheet,valuesNames[i].name)
    sumFunc = valuesNames[i].summarizeFunction
    pivotValue = pivotTable.addPivotValue(value, summarizeFunctions(sumFunc));
  }

  for (var i=0;i<customFunctions.length;i++){
    header = customFunctions[i].name
    customFunction = customFunctions[i].customFunction
    sumFunc = customSummarizeFunctions(customFunctions[i].summarizeFunction)
    pivotValue = pivotTable.addCalculatedPivotValue(header, customFunction);
    pivotValue.summarizeBy(sumFunc);
  }

  for (var i=0;i<rowNames.length;i++){
    row = getColIndxFromName(dataSheet,rowNames[i].name)
    pivotGroup = pivotTable.addRowGroup(row);
    pivotGroup.showTotals(false);
    if (rowNames[i].labels){
      pivotGroup.showRepeatedLabels();
    }
  }

  for (var i=0;i<columnNames.length;i++){
    col = getColIndxFromName(dataSheet,columnNames[i].name)
    pivotGroup = pivotTable.addColumnGroup(col);
    pivotGroup.showTotals(false);
  }

  for (var i=0;i<filters.length;i++){
    criteria = SpreadsheetApp.newFilterCriteria()
    .setVisibleValues(filters[i].visibleValues)
    .build();
    pivotTable.addFilter(getColIndxFromName(dataSheet,filters[i].name), criteria);
  }
  
}


function summarizeFunctions(v){
  data = {
    "SUM":SpreadsheetApp.PivotTableSummarizeFunction.SUM,
    "MAX":SpreadsheetApp.PivotTableSummarizeFunction.MAX,
    "COUNTUNIQUE":SpreadsheetApp.PivotTableSummarizeFunction.COUNTUNIQUE,
    "AVERAGE":SpreadsheetApp.PivotTableSummarizeFunction.AVERAGE,
    "COUNTA":SpreadsheetApp.PivotTableSummarizeFunction.COUNTA,
    "STDEV":SpreadsheetApp.PivotTableSummarizeFunction.STDEV
  }
  return data[v]
}


function customSummarizeFunctions(v){
  data = {
    "SUM":SpreadsheetApp.PivotTableSummarizeFunction.SUM,
    "CUSTOM":SpreadsheetApp.PivotTableSummarizeFunction.CUSTOM
    
  }
  return data[v]
}



