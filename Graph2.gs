function unique(a){
  return a.filter((item, i, ar) => ar.indexOf(item) === i);
}

function PendingTransactionsOlderThan2(days){
  days = 2
  name = "# of pending Services (ex Notifications) By Type and By Member +3days"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
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
    {name:"Reference",summarizeFunction:"AVERAGE"}
  ]
  rowNames = [
    {name:"Report Date"},
    {name:"Instruction Date"},
    {name:"Reference"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  numHeaders = 2
  values = sheet.getDataRange().getValues()
  rows = []
  for (var i=numHeaders; i<values.length; i++){
    row = values[i]
    if (row[0] != ""){ 
      report_date = row[0] 
      }
    if (row[1] != ""){
      instruct_date = row[1]
    }
    if (instruct_date <= subtractDaysFromDate(report_date,days)){
      rows.push(row.splice(3))
    }
  }
  values = values.slice(0,numHeaders)
  headers = []
  values.forEach(list => { 
    headers.push(list.splice(3)) 
  })
  row = rows[0].map((vals,indx) => {
    column = rows.map((vals) =>{
        return vals[indx]
    })
    return unique(column).length
  })
  console.log(headers)
  console.log(row)
  values = headers.concat([row])
  console.log(values)
  sheet.clear()
  sheet.getRange(1,1,values.length,values[0].length).setValues(values)
  //var chartType = Charts.ChartType.COLUMN
  //var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType,numHeaders=2)

  // createNewPage(name, chart)
}