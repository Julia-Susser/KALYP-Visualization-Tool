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
    list.splice(0,3,"")
    headers.push(list) 
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

  // list = []
  // member = ""
  // headers[0].forEach(value => {
  //   if (value != ""){
  //     member = value
  //   }
  //   list.push(member)
  // })
  // headers[0] = list
  types.splice(0,0,"")
  values = [types].concat(rows)

  //row.unshift(dates[dates.length-1]+" - "+dates[0])
  //values = headers.concat([row])

  newSheet = getSheet("# of pending Services (ex Notifications) By Type and By Member +3days")
  newSheet.clear()
  newSheet.getRange(1,1,values.length,values[0].length).setValues(values)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(newSheet,name,"Register Servicer","Number of Programs",chartType,numHeaders=1)

  // createNewPage(name, chart)
}