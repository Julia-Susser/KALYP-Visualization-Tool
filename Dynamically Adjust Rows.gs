
function graph100(){
  name="# of Pending Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  dataSheet.sort(getColIndxFromName(dataSheet,"Instruction Date"), false);
  
  date = dataSheet.getRange('L2').getValue()
  currentDate = DateInStringFormat(date)
  firstDate = sheet.getRange("A5").getValue()
  if (typeof firstDate === "object"){
    firstDate = DateInStringFormat(firstDate)
  }
  addingNewRow = firstDate != currentDate

  var filters = [
    {name:"Status",
    visibleValues:["pending"]}, 
    ]

  valueNames = [
    {name:"Field",summarizeFunction:"COUNTA"}
  ]
  rowNames = []
  columnNames = [
    {name:"Ticker"}
  ]

  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  
  dynamicallyAdjustRows(sheet,addingNewRow)
  sheet.getRange("A5").setValue(date)

  var chartType = Charts.ChartType.BAR
  ranges =["A4:35"]
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}



function graph110(){
  name="# of Pending Transactions per Program (2 days or More)"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  dataSheet.sort(getColIndxFromName(dataSheet,"Instruction Date"), false);
  
  date = dataSheet.getRange('L2').getValue()
  oldest_date = dataSheet.getRange('L'+dataSheet.getLastRow()).getValue()
  numDays = (date.getTime()-oldest_date.getTime())/ (1000 * 3600 * 24)-2
  console.log(numDays)
  dates = []
  for (var days=2;days<=numDays;days++){
    dates.push(subtractDaysFromDate(date,days))
  }
  console.log(dates)
  currentDate = DateInStringFormat(date)
  firstDate = sheet.getRange("A5").getValue()
  if (typeof firstDate === "object"){
    firstDate = DateInStringFormat(firstDate)
  }
  addingNewRow = firstDate != currentDate

  var filters = [
    {name:"Status",
    visibleValues:["pending"]}, 
    {name:"Instruction Date",
    visibleValues:dates}
    ]

  valueNames = [
    {name:"Field",summarizeFunction:"COUNTA"}
  ]
  rowNames = []
  columnNames = [
    {name:"Ticker"}
  ]

  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  
  dynamicallyAdjustRows(sheet,addingNewRow)
  sheet.getRange("A5").setValue(date)

  var chartType = Charts.ChartType.BAR
  ranges =["A4:35"]
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}



function dynamicallyAdjustRows(sheet,adding_row) {
  //get the new list of Tickers. 
  newTickerOrder = sheet.getRange("B2:2").getValues()[0].filter(value => {return value!=""})
  //get the old list of Tickers. This could be different then the new ones if a program is dropped or added.
  oldTickerOrder = sheet.getRange("B4:4").getValues()[0].filter(value => {return value!=""})
  //create a new final list of tickers which is a union of both ticker lists. You don't want to lose tickers from old or new data.
  finalTickerOrder = newTickerOrder.concat(oldTickerOrder).sort();
  var finalTickerOrder=finalTickerOrder.filter((value,pos) => {return finalTickerOrder.indexOf(value) == pos;} );
  
  //create columns of the # of pending transaction over all of the days (new day and old days) and store columns in list newValues
  newValues = []
  height = sheet.getLastRow()
  for (var i=0;i<finalTickerOrder.length;i++){
    ticker = finalTickerOrder[i]
    newCol = [[ticker]]
    //get the new value to add to that particular ticker column
    col = newTickerOrder.indexOf(ticker)+2
    //check that column exists in new data. it could have been a discontinued ticker. if it is in the data, grab the column data. otherwise create blank data
    if (col > 1){
      newCol.push(sheet.getRange(3,col,1,1).getValues()[0])
    }else{newCol.push([""])}
    
    //Get the old values from below to add to that particular ticker column
    ticker = finalTickerOrder[i]
    col = oldTickerOrder.indexOf(ticker)+2
    //check that column exists in old data. it could have been a just added ticker. if it is in the data, grab the column data. otherwise create blank data
    if (col > 1){
      //if you are adding new day/row, then consider index 5 as part of the old data to add. Otherwise, you will erase the first row (5) and do not want to get its values.
      if (adding_row){ row = 5 }else{ row = 6}
      newRow = newCol.concat(sheet.getRange(row,col,height,1).getValues())
    }else{
    newArray = Array.apply(0, Array(height)).map((element) => [""])
    newCol = newCol.concat(newArray)
    }
    newValues.push(newCol)
  }
  
  //if you are adding new day/row, then make space for it by adding a new row at index 5. Index 5 is where the old data starts
  if (adding_row){
    sheet.insertRowAfter(4) 
  }

  //write each of the columns (ticker+data) into the sheet
  for (var i=0;i<newValues.length;i++){
    sheet.getRange(4,i+2,newValues[i].length,1).setValues(newValues[i])
  }
}
