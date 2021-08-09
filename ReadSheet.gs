function createSheet(name){
  var ss = SpreadsheetApp.getActive();
  var newSheet = ss.insertSheet();
  newSheet.setName(name)
}

function getSheetFromIndx(indx){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[indx];
  return sheet
}

function getSheetFromName(name){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  return sheet
}

function getActiveSheet(){
  return SpreadsheetApp.getActiveSheet();
}

function getValuesByNumber(sheet,row,col,numRow,numCol){
  var range = sheet.getRange(row,col,numRow,numCol);
  var values = range.getValues();
  return values
}
function getValuesByQuery(sheet, range){
  var range = sheet.getRange(range); //"Invoices!A1:D4"
  var values = range.getValues();
  return values
}

//sheet = getActiveSheet();
//console.log(sheet.getName());

function getSheetValues(sheet){
  var range = sheet.getDataRange();
  var values = range.getValues();
  return values
}


function getColNames(sheet){
  var data = getValuesByQuery(sheet,"A1:1")[0];
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


