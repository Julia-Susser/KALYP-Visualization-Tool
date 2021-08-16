
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
  dataSheet.getRange(1,dataSheet.getLastColumn(),1,1).setValue("# of days pending")
  var cell = dataSheet.getRange(2,dataSheet.getLastColumn(),height,1)
  cell.setFormula("=minus("+reportDateChar+"2:"+reportDateChar+height+","+instructDateChar+"2:"+instructDateChar+height+")")
}

