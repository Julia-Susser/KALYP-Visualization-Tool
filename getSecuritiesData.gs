
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
  HeadroomSecurities()
}

function HeadroomSecurities(){
  name="Securities"
  var dataSheet = getSheet(name)
  height = dataSheet.getLastRow()
  var cell = dataSheet.getRange("X2:X"+height);
  dataSheet.getRange("X1").setValue("Headroom")
  cell.setFormula("=MINUS(I2:I"+height+",H2:H"+height+")")

  var cell = dataSheet.getRange("Y2:Y"+height);
  dataSheet.getRange("Y1").setValue("Headroom Percent")
  cell.setFormula("=DIVIDE(X2:X"+height+",I2:I"+height+")")
  dataSheet.getRange('Y:Y').activate();
  dataSheet.getActiveRangeList().setNumberFormat('0.00%');
}
