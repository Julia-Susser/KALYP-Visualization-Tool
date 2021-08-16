

function DateInStringFormatForQuery(date){
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = year+'-'+month+'-'+day
  return date
}

function pendingGraphParameters(instructionDate,settlementDate,ticker){
        parameters = [
        settlementDateChar+">date '"+settlementDate+"'",
        "or",
        statusChar+"='pending'",
        "and",
        instructionDateChar+"<=date '"+instructionDate+"'",
        "and",
        tickerChar+"='"+ticker+"'"
      ]
      parameters = parameters.reduce((accumulator, currentValue) => accumulator + " "+ currentValue)
      return parameters
}

function graph100() {
  name="# of Pending Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  tickerChar = getCharFromName(dataSheet,"Ticker")
  settlementDateChar = getCharFromName(dataSheet,"Settlement Date")
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")
  statusChar = getCharFromName(dataSheet,"Status")
  
  sheet.getRange("B1").setFormula("=TRANSPOSE(UNIQUE(Transactions!"+tickerChar+"2:"+tickerChar+"))")
  tickers = sheet.getRange("B1:1").getValues()[0].filter(value => {return value!=""})
  date = dataSheet.getRange(instructionDateChar+'2').getValue()
  numHeaders = 1
  for (var days=30;days>0;days--){
    newDate = subtractDaysFromDate(date,days-1)

    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      pendingGraphParameters(newDate,newDate,ticker)
      sheet.getRange(days+numHeaders,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE "+parameters+"\")")
    }
    sheet.getRange(days+numHeaders+1,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+numHeaders,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+numHeaders+1).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1)
  createNewPage(name, chart)
}








function graph160() {
  name="# of Requests per Member and Type in the Last Thirty Days over the last Thirty Days"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  typeChar = getCharFromName(dataSheet,"Type")
  memberChar = getCharFromName(dataSheet,"Instructing Party")
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")

  sheet.getRange("B1").setFormula("=TRANSPOSE(UNIQUE(QUERY(Transactions!A2:"+dataSheet.getLastRow()+",\"SELECT "+memberChar+","+typeChar+" Order By "+memberChar+","+typeChar+"\")))")
  
  rows = sheet.getRange("B1:2").getValues()
  values = Array.apply(0, Array(rows[0].length)).map((element,indx) => { return rows[0][indx]+" "+rows[1][indx] } )
  console.log(values)
  sheet.getRange(1,2,1,values.length).setValues([values])
  sheet.getRange("B2:2").clear()
  values = Array.apply(0, Array(rows[0].length)).map((element,indx) => { return [rows[0][indx],rows[1][indx]] } )
  instances = values.filter(value => {return value[0]!=""})
  
  date = dataSheet.getRange(instructionDateChar+'2').getValue()

  for (var days=2;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    thirtyPrevDaysDate = subtractDaysFromDate(date,days+30)
    for (var i=0;i<instances.length;i++){
      member = instances[i][0]
      type = instances[i][1]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE "+instructionDateChar+">=date '"+thirtyPrevDaysDate+"' and "+instructionDateChar+"<=date '"+newDate+"' and "+memberChar+"='"+member+"' and "+typeChar+"='"+type+"'\")")
    }
    sheet.getRange(days+3,2,1,instances.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,instances.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"# of Requests per Member and Type in the Last Thirty Days","Day",chartType,numHeaders=1)
  createNewPage(name, chart)
}




