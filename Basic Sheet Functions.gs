function getColNames(sheet){
  var range = sheet.getRange("A1:1"); 
  var data = range.getValues()[0];
  return data;
}

function getColIndxFromName(sheet,col){
  var data = getColNames(sheet);
  var colIndx = data.indexOf(col);
  return colIndx+1;
}

function colIndxToCharacter(col){
  sheet = SpreadsheetApp.getActiveSheet()
  return sheet.getRange(1,col,2,1).getA1Notation()[0]
}


function getCharFromName(sheet,name){
  indx = getColIndxFromName(sheet,name)
  return sheet.getRange(1,indx,1,1).getA1Notation()[0]
}


//if sheet is not defined, create a new one
function getSheet(name){
  var ss = SpreadsheetApp.getActive()
  newSheet = ss.getSheetByName(name)
  if (newSheet == undefined){
    var newSheet = ss.insertSheet();
    newSheet.setName(name)
  }
  return newSheet
}



function getLatestDate(dataSheet){
  reportDateChar = getCharFromName(dataSheet,"Report Date")
  dataSheet.sort(getColIndxFromName(dataSheet,"Report Date"), false);
  date = dataSheet.getRange(reportDateChar+'2').getValue()
  return date
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

//last 10 days but only weekdays
function last10Days(date){
  listofDates = []
  indx = -1
  for (var i = 0; i < 10; indx++){
    var newDate = new Date(date.getTime());
    newDate.setDate(date.getDate()-indx)
    dayOfWeek = newDate.getDay();
    var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
    if (!isWeekend){
      stringDate = DateInStringFormat(newDate)
      listofDates.push(stringDate)
      i = i+1
    }
  }
  return listofDates
}

function subtractDaysFromDate(date,days){
  let newDate = new Date(date.getTime());
  newDate.setDate(date.getDate()-days)
  return newDate
}


//American Format
function DateInStringFormat(date){
  var newdate = new Date(date.getTime())
  var month = parseInt(newdate.toISOString().substring(5,7))
  var day = parseInt(newdate.toISOString().substring(8,10))
  var year = newdate.toISOString().substring(0,4)
  return month+'/'+day+'/'+year
}








