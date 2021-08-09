
function GetSecuritiesData(){
  var sheet = getSheet("Securities");
  sheet.clear()
  var dataSpreadsheet = SpreadsheetApp.openById(
    "156wfiWS8L99G9Yw8eI8-NHrUr6kZs1ClpiFx2qhhpAE" 
  );
  var dataSheet = dataSpreadsheet.getSheetByName("Securities");
  var range = dataSheet.getDataRange();
  var data = range.getValues();
  sheet.getRange(1, 1, range.getHeight(), range.getWidth()) 
    .setValues(data);
  
  sheet.autoResizeColumns(1, range.getWidth());
}


