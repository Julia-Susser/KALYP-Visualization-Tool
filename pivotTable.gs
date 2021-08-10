function myFunction() {
  
}

function graph1(){}
//https://developers.google.com/apps-script/reference/spreadsheet/pivot-table-summarize-function
//=QUERY(Securities!A3:G19,"SELECT C, COUNT(D) GROUP BY C PIVOT F")
function createPivotTable2(dataSheet,pivotTableSheet,rowNames=[], valuesNames=[],filters=[],columnNames=[]) {
  var pivotTableParams = {};
  pivotTableParams.source = {
    sheetId:dataSheet.getSheetId()
  };
  pivotTableParams.rows = rowNames.map(rowName => { return {
    sourceColumnOffset: getColIndxFromName(dataSheet,rowName),
    sortOrder: "ASCENDING"
  } } );
  pivotTableParams.columns = columnNames.map(colName => { return {
    sourceColumnOffset: getColIndxFromName(dataSheet,colName),
    sortOrder: "ASCENDING"
  } } );;
  pivotTableParams.values = valuesNames.map( (value) => { return {
    summarizeFunction: value[1],
    sourceColumnOffset: getColIndxFromName(dataSheet,value[0])
  } } );

  criteria = {};
  for (var i=0;i<filters.length;i++){
    criteria[getColIndxFromName(dataSheet,filters[i][0])] = {visibleValues: filters[i][1]}
  }
  pivotTableParams.criteria = criteria

  var pivotTableSheetId = pivotTableSheet.getSheetId();
  var request = {
    "updateCells": {
      "rows": {
        "values": [{
          "pivotTable": pivotTableParams
        }]
      },
      "start": {
        "sheetId": pivotTableSheetId
      },
      "fields": "pivotTable"
    }
  };
  Sheets.Spreadsheets.batchUpdate({'requests': [request]}, SpreadsheetApp.getActive().getId());
}

function summarizeFunctions(v){
  data = {
    "SUM":SpreadsheetApp.PivotTableSummarizeFunction.SUM,
    "COUNTUNIQUE":SpreadsheetApp.PivotTableSummarizeFunction.COUNTUNIQUE,
    "AVERAGE":SpreadsheetApp.PivotTableSummarizeFunction.AVERAGE
  }
  return data[v]
}
function graph4(){}

function createPivotTable(dataSheet,pivotTableSheet,rowNames=[], valuesNames=[],filters=[],columnNames=[]){
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
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
