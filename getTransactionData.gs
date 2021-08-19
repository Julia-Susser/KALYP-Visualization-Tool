
function GetTransactionsData(){
  var sheet = GUIFunctions.getSheet("Transactions");
  sheet.clear()
  var dataSpreadsheet = SpreadsheetApp.openById(
    "1v9-D0tAJxmyW0b6bC_1Izy68I2Gd_AwwlDEg4OZcQI4" 
  );
  var dataSheet = dataSpreadsheet.getSheetByName("Transactions");
  var range = dataSheet.getDataRange();
  var data = range.getValues();
  console.log(data)
  sheet.getRange(1, 1, range.getHeight(), range.getWidth()) 
    .setValues(data);
  
  sheet.autoResizeColumns(1, range.getWidth());
}




function PendingColumn(){
  name = "Transactions"
  var dataSheet = GUIFunctions.getSheet(name)
  height = dataSheet.getLastRow()
  reportDateChar = GUIFunctions.getCharFromName(dataSheet,"Report Date")
  instructDateChar = GUIFunctions.getCharFromName(dataSheet,"Instruction Date")
  dataSheet.getRange("Q1").setValue("# of days pending")
  var cell = dataSheet.getRange("Q2:Q"+height)
  cell.setFormula("=minus("+reportDateChar+"2:"+reportDateChar+height+","+instructDateChar+"2:"+instructDateChar+height+")")
}

