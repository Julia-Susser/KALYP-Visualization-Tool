function getSpecificPendingDays(days){
  return Array.apply(0, Array(10000)).map((element,indx) => indx+days)
}

function TransactionsByProgram(type,statuses,specificPendingDays,legendVisible){
  title = `# of ${type} per Program`
  var sheet = GUIFunctions.getSheet(title)
  var dataSheet = GUIFunctions.getSheet("Transactions")
  sheet.clear()
  date = GUIFunctions.getLatestDate()
  dates = GUIFunctions.last10Days(date)
  var filters = [
    {name:"Status",
    visibleValues:statuses},
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
  if (status.length>1){
    rowNames.push({name:"Status"})
  }
  columnNames = [
    {name:"Ticker"}
  ]
  GUIFunctions.createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.BAR

  newdates = sheet.getRange("A3:A").getValues().map(value => {return value[0]}).filter(value => {return value != ""})
  newdates = newdates.map(date => {return GUIFunctions.DateInStringFormat(date)})
  extradates = dates.filter(date => {return newdates.indexOf(date)===-1 }).map(date => {return [date]})
  if (extradates.length > 0){ sheet.getRange(sheet.getLastRow()+1,1,extradates.length,1).setValues(extradates) }
  cells = sheet.getDataRange().getValues()
  sheet.clear()
  sheet.getRange(1,1,cells.length,cells[0].length).setValues(cells)
  sheet.getRange(3,1,cells.length,cells[0].length).activate().sort({column: 1, ascending: true});
  //yaxis = `# of transactions from ${dates[0]} to ${dates[dates.length-1]}`

  if (specificPendingDays != null){verticalaxis={min:0,max:100}}else{verticalaxis=null}
  chartParams = {
    stacked:true,
    numHeaders:2,
    verticallabels:false,
    verticalaxis:{
      min:0,
      max:100
    },
    size:{
      height:300,
      width:200
    },
    legendVisible:legendVisible
  }
  var chart = GUIFunctions.createChart(sheet,chartType,chartParams)
  table = newdates = sheet.getRange("A3:A").getValues().filter(value => {return value[0] != ''}).map(date => {return [GUIFunctions.DateInStringFormat(date[0])]})
  if (type==="pending transactions (3 to 4 days)"){
    GUIFunctions.createNewPage(title,chart=chart,table=table)
  }else{
    GUIFunctions.createNewPage(title,chart=chart)
  }
  
}

// function graph1(){
//     TransactionsByProgram(type="pending, settled, and cancelled transactions",status=["pending","settled","cancelled"])
// }


function graph1(){
    specificPendingDays = [3,4]
    TransactionsByProgram(type="pending transactions (3 to 4 days)",status=["pending"],specificPendingDays,legendVisible=false)
}

function graph2(){
    specificPendingDays = [5,6,7,8,9]
    TransactionsByProgram(type="pending transactions (5 or more days)",status=["pending"],specificPendingDays,legendVisible=false)
}

function graph3(){
    specificPendingDays = getSpecificPendingDays(10)
    TransactionsByProgram(type="pending transactions (10 or more days)",status=["pending"],specificPendingDays,legendVisible=false)
    graphlegend()
}
function graphlegend(){
    specificPendingDays = [3,4]
    TransactionsByProgram(type="pending transactions (legend)",status=["pending"],specificPendingDays,legendVisible=true)
}





function TransactionsByMemberType(type, status,specificPendingDays){
  title =  `# of ${type} by Type and Member`
  var sheet = GUIFunctions.getSheet(title)
  var dataSheet = GUIFunctions.getSheet("Transactions")
  sheet.clear()
  date = GUIFunctions.getLatestDate()
  dates = GUIFunctions.last30Days(date)
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

  GUIFunctions.createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.BAR
  if (status==="pending"){ 
    yaxis = `# of transactions on ${dates[0]}`
  }else{
    yaxis = `# of transactions from ${dates[dates.length-1]} to ${dates[0]}`
  }
  chartParams = {
    numHeaders:2,
    verticalAxisTitle:yaxis,
    size:{
      height:300,
      width:200
    },
    legendVisible:false,
    legendFontSize:10
  }
  var chart = GUIFunctions.createChart(sheet,chartType,chartParams=chartParams)
  GUIFunctions.createNewPage(title,chart=chart)
}

function graph4(){
  TransactionsByMemberType(type="requested Services",status="initiated")
}

function graph5(){
  TransactionsByMemberType(type="pending Services",status="pending")
}

function graph6(){
  TransactionsByMemberType(type="cancelled Services",status="cancelled")
}


function graph7(){
  TransactionsByMemberType(type="completed Services",status="settled")
}




function graph10(){
  specificPendingDays = getSpecificPendingDays(2)
  TransactionsByMemberType(type="pending services (2 or more days)", status="pending",specificPendingDays)
}

function graph11(){
  specificPendingDays = getSpecificPendingDays(10)
  TransactionsByMemberType(type="pending services (10 or more days)", status="pending",specificPendingDays)
}






function TransactionsByAgeOfService(type, status, summarizeFunction){
  title = `${type} by Type and By Member`
  console.log(title)
  var sheet = GUIFunctions.getSheet(type)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  date = GUIFunctions.getLatestDate()
  dates = GUIFunctions.last30Days(date)
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

  GUIFunctions.createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames,customFunctions=customFunctions)
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
  GUIFunctions.createPivotTable(sheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames,customFunctions=[],dataSheetRange,sheetRange)
  var chartType = Charts.ChartType.BAR
  if (status=="pending"){ 
    yaxis = `${summarizeFunction.toLowerCase()} Age (days) on ${dates[0]}`
  }else{
    yaxis = `${summarizeFunction.toLowerCase()} Age (days) from ${dates[dates.length-1]} to ${dates[0]}`
  }
  chartParams = {
    numHeaders:2,
    verticalAxisTitle:yaxis,
    size:{
      height:300,
      width:200
    },
    legendVisible:false,
    legendFontSize:10,
    ranges: ["G:J"]
  }
  var chart = GUIFunctions.createChart(sheet,chartType,chartParams)
  GUIFunctions.createNewPage(title,chart=chart)
}


function graph8(){
   TransactionsByAgeOfService(type="Average age of Completed Services",status="settled", "AVERAGE")
}

function graph9(){
   TransactionsByAgeOfService(type="Standard Dev. of age of Completed Services",status="settled", "STDEV")
}

function graph12(){
   TransactionsByAgeOfService(type="Oldest Pending Service",status="pending", "MAX")
}
