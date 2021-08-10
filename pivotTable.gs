function createPivotTable(dataSheet,pivotTableSheet,rowNames=[], valuesNames=[],filters=[],columnNames=[]){
  var sourceData = dataSheet.getDataRange()
  pivotTable = pivotTableSheet.getRange('A1').createPivotTable(sourceData);
  for (var i=0;i<valuesNames.length;i++){
    value = getColIndxFromName(dataSheet,valuesNames[i][0])+1
    sumFunc = valuesNames[i][1]
    pivotValue = pivotTable.addPivotValue(value, summarizeFunctions(sumFunc));
  }

  for (var i=0;i<rowNames.length;i++){
    row = getColIndxFromName(dataSheet,rowNames[i])+1
    pivotGroup = pivotTable.addRowGroup(row);
    pivotGroup.showTotals(false);
  }

  for (var i=0;i<columnNames.length;i++){
    col = getColIndxFromName(dataSheet,columnNames[i])+1
    pivotGroup = pivotTable.addColumnGroup(col);
    pivotGroup.showTotals(false);
  }

  for (var i=0;i<filters.length;i++){
    criteria = SpreadsheetApp.newFilterCriteria()
    .setVisibleValues([filters[i][1]])
    .build();
    pivotTable.addFilter(getColIndxFromName(dataSheet,filters[i][0])+1, criteria);
  }
  
}
