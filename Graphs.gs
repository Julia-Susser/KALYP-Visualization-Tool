
function graph10(){
  name="# of Pending Transactions per Program Daily Updated"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  dataSheet.sort(getColIndxFromName(dataSheet,"Instruction Date"), false);
  
  date = dataSheet.getRange('L2').getValue()
  currentDate = DateInStringFormat(date)
  firstDate = sheet.getRange("A5").getValue()
  if (typeof firstDate === "object"){
    firstDate = DateInStringFormat(firstDate)
  }
  adding_row = firstDate != currentDate

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
  
  newTickerOrder = sheet.getRange("B2:2").getValues()[0].filter(value => {return value!=""})
  oldTickerOrder = sheet.getRange("B4:4").getValues()[0].filter(value => {return value!=""})
  finalTickerOrder = newTickerOrder.concat(oldTickerOrder).sort();
  var finalTickerOrder=finalTickerOrder.filter((value,pos) => {return finalTickerOrder.indexOf(value) == pos;} );
  newValues = []
  height = sheet.getLastRow()
  for (var i=0;i<finalTickerOrder.length;i++){
    ticker = finalTickerOrder[i]
    newCol = [[ticker]]
    col = newTickerOrder.indexOf(ticker)+2
    if (col > 1){
      newCol.push(sheet.getRange(3,col,1,1).getValues()[0])
    }else{newCol.push([""])}
    ticker = finalTickerOrder[i]
    col = oldTickerOrder.indexOf(ticker)+2
    if (col > 1){
      if (adding_row){ row = 5 }else{ row = 6}
      newRow = newCol.concat(sheet.getRange(row,col,height,1).getValues())
      console.log(newRow)
    }else{
    newArray = Array.apply(0, Array(height)).map((element) => [""])
    newRow = newCol.concat(newArray)
    }
    newValues.push(newRow)
  }
  
  if (adding_row){
    console.log("here")
    sheet.insertRowAfter(4) //Make space for current date's new row of pending transactions
  }

  for (var i=0;i<newValues.length;i++){
    sheet.getRange(4,i+2,newValues[i].length,1).setValues(newValues[i])
  }
  sheet.getRange("A5").setValue(date)

  
  var chartType = Charts.ChartType.BAR
  ranges =["A4:35"]

  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  //createNewPage(name, chart)
}

function colIndxToCharacter(col){
  sheet = SpreadsheetApp.getActiveSheet()
  return sheet.getActiveRange(1,col,2,col+10).getA1Notation()[0]
}

function graph8() {
  name="# of Failed Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()

  var filters = [["Status",["failed"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Instruction Date"], valueNames=[["Status","COUNTA"]], filters=filters, columns=["Ticker"])
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=2)
  //createNewPage(name, chart)
}

function graph12() {
  name="# of Completed Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()

  var filters = [["Status",["settled"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Instruction Date"], valueNames=[["Type","COUNTA"]], filters=filters, columns=["Ticker"])
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=2)
  //createNewPage(name, chart)
}