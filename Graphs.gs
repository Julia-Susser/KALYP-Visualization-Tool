function getSpecificPendingDays(days){
  return Array.apply(0, Array(10000)).map((element,indx) => indx+days)
}

function TransactionsByProgram(type,statuses,specificPendingDays){
  title = `# of ${type} per Program`
  var sheet = getSheet(title)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  week = getLatestWeek()
  weeks = Array.apply(0, Array(4)).map((element,indx) => week-indx)
  var filters = [
    {name:"Status",
    visibleValues:statuses},
    {name:"week number",
    visibleValues:weeks},
    ]
  if (specificPendingDays != null){
    filters.push({name:"# of days pending",
    visibleValues:specificPendingDays})
  }
  valueNames = [
    {name:"Reference",summarizeFunction:"COUNTUNIQUE"}
  ]
  rowNames = [
    {name:"week number"},
    {name:"week"}
  ]
  if (status.length>1){
    rowNames.push({name:"Status"})
  }
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.COLUMN
  
  dates = sheet.getRange("B:B").getValues().map(value => {return value[0]}).filter(value => {return value != ""})
  startDate = dates[1].split("-")[0]
  endDate = dates[dates.length-1].split("-")[1]
  yaxis = `# of transactions from ${startDate} to ${endDate}`

  if (specificPendingDays != null){verticalaxis={min:0,max:500}}else{verticalaxis=null}
  ranges = ["B:"+colIndxToCharacter(sheet.getLastColumn())]
  var chart = createChart(sheet,title,"Program",yaxis,chartType,numHeaders=2,ranges=ranges,stacked=true,verticalaxis=verticalaxis)
  createNewPage(title,chart=chart)
}

function graph1(){
    TransactionsByProgram(type="pending, settled, and cancelled transactions",status=["pending","settled","cancelled"])
}


function graph2(){
    specificPendingDays = getSpecificPendingDays(2)
    TransactionsByProgram(type="pending transactions (2 or more days)",status=["pending"],specificPendingDays)
}

function graph3(){
    specificPendingDays = getSpecificPendingDays(5)
    TransactionsByProgram(type="pending transactions (5 or more days)",status=["pending"],specificPendingDays)
}

function graph4(){
    specificPendingDays = getSpecificPendingDays(10)
    TransactionsByProgram(type="pending transactions (10 or more days)",status=["pending"],specificPendingDays)
}


// function graph5(){
//     TransactionsByProgram(type="settled transactions",status=["settled"])
// }



function TransactionsByMemberType(type, status,specificPendingDays){
  title =  `# of ${type} by Type and Member`
  var sheet = getSheet(title)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  date = getLatestDate()
  dates = last30Days(date)
  if (status==="pending"){ dates = [dates[0]] }
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
  if (status==="pending"){ 
    yaxis = `# of transactions on ${dates[0]}`
  }else{
    yaxis = `# of transactions from ${dates[dates.length-1]} to ${dates[0]}`
  }
  var chart = createChart(sheet,title,"Member",yaxis,chartType,numHeaders=2,ranges=null,stacked=false)
  createNewPage(title,chart=chart)
}

function graph5(){
  TransactionsByMemberType(type="requested Services",status="initiated")
}

function graph6(){
  TransactionsByMemberType(type="completed Services",status="settled")
}

function graph7(){
  TransactionsByMemberType(type="cancelled Services",status="cancelled")
}

function graph8(){
  TransactionsnByMemberType(type="pending Services",status="pending")
}

function graph9(){
  specificPendingDays = getSpecificPendingDays(2)
  TransactionsByMemberType(type="pending services (2 or more days)", status="pending",specificPendingDays)
}

function graph10(){
  specificPendingDays = getSpecificPendingDays(10)
  TransactionsByMemberType(type="pending services (10 or more days)", status="pending",specificPendingDays)
}






function TransactionsByAgeOfService(type, status, summarizeFunction){
  title = `${type} by Type and By Member`
  console.log(title)
  var sheet = getSheet(type)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  date = getLatestDate()
  dates = last30Days(date)
  if (status=="pending"){ dates = [dates[0]] }
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

  if (status=="pending"){
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
  if (status=="pending"){ 
    yaxis = `${summarizeFunction.toLowerCase()} Age (days) on ${dates[0]}`
  }else{
    yaxis = `${summarizeFunction.toLowerCase()} Age (days) from ${dates[dates.length-1]} to ${dates[0]}`
  }
  var chart = createChart(sheet,title,"Member",yaxis,chartType,numHeaders=2,ranges=ranges,stacked=false)
  createNewPage(title,chart=chart)
}


function graph11(){
   TransactionsByAgeOfService(type="Average age of Completed Services",status="settled", "AVERAGE")
}

function graph12(){
   TransactionsByAgeOfService(type="Standard Dev. of age of Completed Services",status="settled", "STDEV")
}

function graph13(){
   TransactionsByAgeOfService(type="Oldest Pending Service",status="pending", "MAX")
}
