function myFunction() {
  
}


function oldGraph1(){
  name="# of pending transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  dates = last30Days(date)
  var filters = [
    {name:"Status",
    visibleValues:["pending"]},
    {name:"Report Date",
    visibleValues:dates}
    ]
  valueNames = [
    {name:"Ticker",summarizeFunction:"COUNTA"}
  ]
  rowNames = [
    {name:"Report Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType,numHeaders=2)
  //createNewPage(name, chart)
}



function values(){
  rows = []
  newRows = []
  date = values[2][0]
  for (var i=2; i<values.length; i++){
    row = values[i]
    if (row[0] != ""){ 
      if (newRows[0] != undefined){
        newRows[0][0] = date
        rows = rows.concat(newRows)
      }
      date = row[0] 
      newRows = []
      }
    if (row[1] < subtractDaysFromDate(date,2)){
      newRows.push(row)
    }
  }
  values = values.slice(0,2).concat(rows)
  newSheet = getSheet("hey")
  newSheet.getRange(1,1,values.length,values[0].length).setValues(values)
}

function graph7() {
  name="# of Pending Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  dataSheet.getRange('L:L').activate();
  dataSheet.sort(12, false);
  date = dataSheet.getRange('L2').getValue()
  dates = last30Days(date)
  var filters = [
    {name:"Status",
    visibleValues:["pending"]}, 
    {name:"Instruction Date",
    visibleValues:dates}
    ]
  valueNames = [
    {name:"Status",summarizeFunction:"COUNTA"}
  ]
  rowNames = [
    {name:"Instruction Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=2)
  //createNewPage(name, chart)
}