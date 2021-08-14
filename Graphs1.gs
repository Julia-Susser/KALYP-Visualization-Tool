//-1 is instruction date before or on report date - basically any pending
//1 is instruction date two or more days before report day (pending 2 or more)
//2 is instruction more than two days before report date (pending +2)
//5 is instruction date more five days before report day (pending 5 or more)

function PendingTransactionsOlderThan(name,days){
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
    {name:"Report Date"},
    {name:"Instruction Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  values = sheet.getDataRange().getValues()
  rows = []
  newRow = []
  for (var i=2; i<values.length; i++){
    row = values[i]
    if (row[0] != ""){ 
      if (newRow[0] != undefined){
        newRow[0] = report_date
        rows.push(newRow)
      }
      report_date = row[0] 
      newRow = Array.apply(0, Array(row.length-1)).map((element) => 0)
      }
    if (row[1] <= subtractDaysFromDate(report_date,days)){
      newRow = newRow.map((element,indx)=>{
        if (row[indx+1] != ""){
          return element + parseInt(row[indx+1])
        }
        return element
      })
    }
  }
  values = values.slice(0,2)
  headers = []
  values.forEach(list => { 
    list.splice(1,1)
    headers.push(list) 
  })

  values = headers.concat(rows)
  sheet.clear()
  sheet.getRange(1,1,values.length,values[0].length).setValues(values)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType,numHeaders=2)

  // createNewPage(name, chart)
}


function graph1(){
    name = "# of pending transactions per Program"
    PendingTransactionsOlderThan(name,0)
}


function graph2(){
    name = "# of failing transactions per Program (2 or more days)"
    PendingTransactionsOlderThan(name,1)
}


function graph3(){
    name = "# of failing transactions per Program (older than 2)"
    PendingTransactionsOlderThan(name,2)
}

function graph4(){
    name = "# of failing transactions per Program (older than 5)"
    PendingTransactionsOlderThan(name,5)
}

function graph5(){
    name = "# of failing transactions per Program (older than 10)"
    PendingTransactionsOlderThan(name,10)
}


