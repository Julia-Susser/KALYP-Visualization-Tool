function getSpecificPendingDays(days){
  return Array.apply(0, Array(10000)).map((element,indx) => indx+days)
}

function TransactionsByProgram(tpe,status,specificPendingDays){
  title = `# of ${type} per Program`
  var sheet = getSheet(title)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  dates = last30Days(date)
  
  var filters = [
    {name:"Status",
    visibleValues:[status]},
    {name:"Report Date",
    visibleValues:dates},
    ]
  if (specificPendingDays != null){
    filters.push({name:"# of days pending",
    visibleValues:specificPendingDays})
  }
  valueNames = [
    {name:"Reference",summarizeFunction:"COUNTUNIQUE"}
  ]
  rowNames = [
    {name:"Report Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.COLUMN
  yaxis = `# of ${status} transactions from ${dates[dates.length-1]} to ${dates[0]}`
  var chart = createChart(sheet,title,"Program",yaxis,chartType,numHeaders=2)
  //createNewPage(title,chart=chart)
}

function graph1(){
    TransactionsByProgram(type="pending transactions",status="pending")
}


function graph2(){
    specificPendingDays = getSpecificPendingDays(2)
    TransactionsByProgram(type="pending transactions (2 or more days)",status="pending",specificPendingDays)
}

function graph3(){
    specificPendingDays = getSpecificPendingDays(5)
    TransactionsByProgram(type="pending transactions (5 or more days)",status="pending",specificPendingDays)
}

function graph4(){
    specificPendingDays = getSpecificPendingDays(10)
    TransactionsByProgram(type="pending transactions (10 or more days)",status="pending",specificPendingDays)
}


function graph5(){
    TransactionsByProgram(type="settled transactions",status="settled")
}







function TransactionsnByMemberType(type, status,specificPendingDays){
  title =  `# of ${type} by Type and Member`
  console.log(title)
  var sheet = getSheet(title)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  dates = last30Days(date)
  var filters = [
    {name:"Report Date",
    visibleValues:dates},
    {name:"Status",
    visibleValues:[status]}
    ]
  if (specificPendingDays != null){
    filters.push({name:"# of days pending",
    visibleValues:specificPendingDays})
  }
  valueNames = [
    {name:"Reference",summarizeFunction:"COUNTUNIQUE"}
  ]
  rowNames = [
    {name:"Instructing Party"}
  ]
  columnNames = [
    {name:"Type"}
  ]

  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.COLUMN
  yaxis = `# of ${status} transactions from ${dates[dates.length-1]} to ${dates[0]}`
  var chart = createChart(sheet,title,"Member",yaxis,chartType,numHeaders=2)
  //createNewPage(title,chart=chart)
}

function graph7(){
  TransactionsnByMemberType(type="requested Services",status="initiated")
}

function graph8(){
  TransactionsnByMemberType(type="completed Services",status="completed")
}

function graph9(){
  TransactionsnByMemberType(type="pending Services",status="pending")
}

function graph10(){
  specificPendingDays = getSpecificPendingDays(2)
  TransactionsByMemberType(type="pending services (2 or more days)", status="pending",specificPendingDays)
}

function graph11(){
  specificPendingDays = getSpecificPendingDays(10)
  TransactionsByMemberType(type="pending services (10 or more days)", status="pending",specificPendingDays)
}



function graph12(){
  TransactionsnByMemberType(type="cancelled Services",status="cancelled")
}



function TransactionsByAgeOfService(type, status, summarizeFunction, oldestPending=false){
  title = `${type} By Type and By Member`
  var sheet = getSheet(type)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  dates = last30Days(date)
  if (oldestPending){ dates = [dates[0]] }
  var filters = [
    {name:"Report Date",
    visibleValues:dates},
    {name:"Status",
    visibleValues:[status]}
  ]
  valueNames = []
  rowNames = [
    {name:"Instructing Party",labels:true},
    {name:"Reference"}
  ]
  columnNames = [
  ]
  customFunctions = [
    {name:"Type",
    customFunction:"='Type'",
    summarizeFunction:"CUSTOM"},
    {name:"age",
    customFunction:"='Settlement Date'-'Instruction Date'",
    summarizeFunction:"CUSTOM"}
  ]
  
  if (oldestPending){
    customFunctions.pop()
    customFunctions.push(
      {name:"age",
      customFunction:"='Report Date'-'Instruction Date'",
      summarizeFunction:"CUSTOM"}
      )
  }

  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames,customFunctions=customFunctions)
  var filters = []
  rowNames = [
    {name:"Instructing Party"}
  ]
  columnNames = [
    {name:"Type"}
  ]
  valueNames = [
    {name:"age",summarizeFunction:summarizeFunction}
  ]
  dataSheetRange = "A1:D"+sheet.getLastRow()
  sheetRange = "G1"
  createPivotTable(sheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames,customFunctions=[],dataSheetRange,sheetRange)
  var chartType = Charts.ChartType.COLUMN
  ranges = ["G:J"]
  yaxis = `${summarizeFunction} Age (days) from ${dates[dates.length-1]} to ${dates[0]}`
  var chart = createChart(sheet,title,"Member",yaxis,chartType,numHeaders=2,ranges=ranges,stacked=false)
  //createNewPage(title,chart=chart)
}


function graph14(){
   TransactionsByAgeOfService(type="Average age of Completed Services",status="settled", "AVERAGE")
}

function graph15(){
   TransactionsByAgeOfService(type="Standard Dev. of age of Completed Services",status="settled", "STDEV")
}

function graph16(){
   TransactionsByAgeOfService(type="Oldest Pending Service",status="pending", "MAX", oldestPending=true)
}
