
function GetTransactionsData(){
  var sheet = getSheet("Transactions");
  sheet.clear()
  var dataSpreadsheet = SpreadsheetApp.openById(
    "156wfiWS8L99G9Yw8eI8-NHrUr6kZs1ClpiFx2qhhpAE" 
  );
  var dataSheet = dataSpreadsheet.getSheetByName("Transactions");
  var range = dataSheet.getDataRange();
  var data = range.getValues();
  sheet.getRange(1, 1, range.getHeight(), range.getWidth()) 
    .setValues(data);
  
  sheet.autoResizeColumns(1, range.getWidth());
  PendingColumn()
}




function PendingColumn(){
  name = "Transactions"
  var dataSheet = getSheet(name)
  height = dataSheet.getLastRow()
  reportDateChar = getCharFromName(dataSheet,"Report Date")
  instructDateChar = getCharFromName(dataSheet,"Instruction Date")
  dataSheet.getRange("Q1").setValue("# of days pending")
  var cell = dataSheet.getRange("Q2:Q"+height)
  cell.setFormula("=minus("+reportDateChar+"2:"+reportDateChar+height+","+instructDateChar+"2:"+instructDateChar+height+")")


  reportDateChar = getCharFromName(dataSheet,"Report Date")
  dataSheet.getRange("R1").setValue("start week")
  var cell = dataSheet.getRange("R2:R"+height)
  range = reportDateChar+"2:"+reportDateChar+height
  cell.setFormula(`=minus(${range},WEEKDAY(${range}))`)

  dataSheet.getRange("S1").setValue("end week")
  var cell = dataSheet.getRange("S2:S"+height)
  range = reportDateChar+"2:"+reportDateChar+height
  cell.setFormula(`=add(${range},7-WEEKDAY(${range}))`)

  cells = dataSheet.getRange("R2:S"+height).getValues()
  cells = cells.map(values => {return [DateInStringFormat(values[0])+"-"+DateInStringFormat(values[1])] })
  var cell = dataSheet.getRange("S2:S"+height)
  dataSheet.getRange("T1").setValue("week")
  dataSheet.getRange("T2:T"+height).setValues(cells)
}

