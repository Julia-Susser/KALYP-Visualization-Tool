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

