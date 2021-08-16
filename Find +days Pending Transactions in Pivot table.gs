//get instruction date as a row and compare from there to report to see to only keep rows where it is an old pending transaction

//-1 is instruction date before or on report date - basically any pending
//1 is instruction date two or more days before report day (pending 2 or more)
//2 is instruction more than two days before report date (pending +2)
//5 is instruction date more five days before report day (pending 5 or more)

function oldPendingTransactionsOlderThan(name,days){
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


function graph1old(){
    name = "# of pending transactions per Program"
    PendingTransactionsOlderThan(name,0)
}


function graph2old(){
    name = "# of failing transactions per Program (2 or more days)"
    PendingTransactionsOlderThan(name,1)
}


function graph3old(){
    name = "# of failing transactions per Program (older than 2)"
    PendingTransactionsOlderThan(name,2)
}

function graph4old(){
    name = "# of failing transactions per Program (older than 5)"
    PendingTransactionsOlderThan(name,5)
}

function graph5old(){
    name = "# of failing transactions per Program (older than 10)"
    PendingTransactionsOlderThan(name,10)
}




function unique(a){
  return a.filter((item, i, ar) => ar.indexOf(item) === i);
}

function PendingTransactionsOlderThan2(days){
  days = 2
  name = "# of pending Services By Type and By Member (Reference)"
  var sheet = getSheet(name)
  // sheet.clear()
  var dataSheet = getSheet("Transactions")
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  dates = last30Days(date)
  // var filters = [
  //   {name:"Status",
  //   visibleValues:["pending"]},
  //   {name:"Report Date",
  //   visibleValues:dates}
  //   ]
  // valueNames = [
  //   {name:"Reference",summarizeFunction:"AVERAGE"}
  // ]
  // rowNames = [
  //   {name:"Report Date"},
  //   {name:"Instruction Date"},
  //   {name:"Reference"}
  // ]
  // columnNames = [
  //   {name:"Instructing Party"},
  //   {name: "Type"}
  // ]
  // createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  numHeaders = 3
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
  row = rows[0].map((vals,indx) => {
    column = rows.map((vals) =>{
        return vals[indx]
    })
    return unique(column).length
  })

  values = values.slice(1,numHeaders)
  headers = []
  values.forEach(list => { 
    headers.push(list.splice(3)) 
  })

  member = ""
  newRows = {}
  newRow = {}
  members = headers[0]
  types = headers[1]
  members.forEach((value,indx) => {
    if (value != ""){
      if (member != ""){
        newRows[member] = newRow
      }
      member = value
      newRow = {}
    }
    type = types[indx]
    newRow[type] = row[indx]
  })

  types = unique(types).filter(value => {return value != ""})
  rows = Object.keys(newRows).map(function(member) {
    newRow = newRows[member]
    newRow = types.map(type => {return newRow[type] || ""})
    newRow.unshift(member)
    return newRow
  }); 

  types.splice(0,0,"")
  values = [types].concat(rows)

  newSheet = getSheet("# of pending Services (ex Notifications) By Type and By Member +3days")
  newSheet.clear()
  newSheet.getRange(1,1,values.length,values[0].length).setValues(values)
  var chartType = Charts.ChartType.COLUMN
  yaxis = "# of transactions with +3 settlement from "+dates[dates.length-1]+" to "+dates[0]
  var chart = createChart(newSheet,name,"Instructing Member",yaxis,chartType,numHeaders=1)

  // createNewPage(name, chart)
}

function k(){
  dataSheet = getSheet("Transactions")
  dataSheet.getRange("Z:Z").setFormula("MULTIPLY(C1:C1000,2)")
}