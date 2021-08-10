function getColNames(sheet){
  var range = sheet.getRange("A1:1"); 
  var data = range.getValues()[0];
  return data;
}

function getColIndxFromName(sheet,col){
  var data = getColNames(sheet);
  var colIndx = data.indexOf(col);
  return colIndx;
}


function getSheet(name){
  var ss = SpreadsheetApp.getActive()
  var sss = ss.getSheets()
  names = sss.map(sheet => sheet.getName())
  if (!names.includes(name)){
    var newSheet = ss.insertSheet();
    newSheet.setName(name)
  }else{
    newSheet = ss.getSheetByName(name)
  }
  return newSheet
}


