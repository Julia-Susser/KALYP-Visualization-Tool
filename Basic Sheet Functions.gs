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

function colIndxToCharacter(col){
  sheet = SpreadsheetApp.getActiveSheet()
  return sheet.getActiveRange(1,col,2,col+10).getA1Notation()[0]
}


function getCharFromName(sheet,name){
  indx = getColIndxFromName(sheet,name)
  return sheet.getRange(1,indx+1,1,1).getA1Notation()[0]
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


function last30Days(date){
  listofDates = []
  for (var i = 0; i < 31; i++){
    var newDate = new Date(date.getTime());
    newDate.setDate(date.getDate()-i)
    stringDate = DateInStringFormat(newDate)
    listofDates.push(stringDate)
  }
  return listofDates
}

function subtractDaysFromDate(date,days){
  let newDate = new Date(date.getTime());
  newDate.setDate(date.getDate()-days)
  stringDate = DateInStringFormatForQuery(newDate)
  return stringDate
}

function last30Days(date){
  listofDates = []
  for (var i = 0; i < 31; i++){
    newDate = new Date(date.getTime());
    newDate.setDate(date.getDate()-i)
    stringDate = DateInStringFormat(newDate)
    listofDates.push(stringDate)
  }
  return listofDates
}

function DateInStringFormat(date){
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = month+'/'+day+'/'+year
  return date
}

function DateInStringFormatForQuery(date){
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = year+'-'+month+'-'+day
  return date
}



