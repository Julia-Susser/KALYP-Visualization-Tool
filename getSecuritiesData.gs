
function GetSecuritiesData(){
  var sheet = GUIFunctions.getSheet("Securities");
  sheet.clear()
  var dataSpreadsheet = SpreadsheetApp.openById(
    "1v9-D0tAJxmyW0b6bC_1Izy68I2Gd_AwwlDEg4OZcQI4" 
  );
  var dataSheet = dataSpreadsheet.getSheetByName("Securities");
  var range = dataSheet.getDataRange();
  var data = range.getValues();
  sheet.getRange(1, 1, range.getHeight(), range.getWidth()) 
    .setValues(data);
  
  //sheet.autoResizeColumns(1, range.getWidth());

}

