
function graph10() {
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

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+">date '"+newDate+"' or "+statusChar+"='pending') and "+instructionDateChar+"<=date '"+newDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1)
  createNewPage(name, chart)
}



function graph11() {
  name="# of failing transactions per Program (2 or more days)"
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

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    twoPrevDaysDate = subtractDaysFromDate(date,days+2)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+">date '"+newDate+"' or "+statusChar+"='pending') and "+instructionDateChar+"<=date '"+twoPrevDaysDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}




function graph12() {
  name="# of failing transactions per Program (older than 2 days)"
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

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    twoPrevDaysDate = subtractDaysFromDate(date,days+2)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+">date '"+newDate+"' or "+statusChar+"='pending') and "+instructionDateChar+"<date '"+twoPrevDaysDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}





function graph13() {
  name="# of failing transactions per Program (5 or more days)"
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

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    prevDaysDate = subtractDaysFromDate(date,days+5)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+">date '"+newDate+"' or "+statusChar+"='pending') and "+instructionDateChar+"<=date '"+prevDaysDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}



function graph14() {
  name="# of failing transactions per Program (10 or more days)"
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

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    prevDaysDate = subtractDaysFromDate(date,days+10)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+">date '"+newDate+"' or "+statusChar+"='pending') and "+instructionDateChar+"<=date '"+prevDaysDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1,ranges=ranges)
  createNewPage(name, chart)
}


function graph15() {
  name="# of settled transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  tickerChar = getCharFromName(dataSheet,"Ticker")
  settlementDateChar = getCharFromName(dataSheet,"Settlement Date")
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")

  sheet.getRange("B1").setFormula("=TRANSPOSE(UNIQUE(Transactions!"+tickerChar+"2:"+tickerChar+"))")
  tickers = sheet.getRange("B1:1").getValues()[0].filter(value => {return value!=""})
  date = dataSheet.getRange(instructionDateChar+'2').getValue()

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    for (var i=0;i<tickers.length;i++){
      ticker = tickers[i]
      sheet.getRange(days+2,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE ("+settlementDateChar+"<=date '"+newDate+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+3,2,1,tickers.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+2,2,1,tickers.length).clear()
    sheet.getRange("A"+(days+3).toString()).setValue(newDate)
  }
  sheet.deleteRow(2)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1)
  createNewPage(name, chart)
}


function graph16() {
  name="# of requested Services by Type and Member"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  sheet.clear()
  tickerChar = getCharFromName(dataSheet,"Ticker")
  memberChar = getCharFromName(dataSheet,"Instructing Party")
  instructionDateChar = getCharFromName(dataSheet,"Instruction Date")

  sheet.getRange("B1").setFormula("=TRANSPOSE(UNIQUE(QUERY(Transactions!A2:"+dataSheet.getLastRow()+",\"SELECT M,G Order By M,G\")))")
  
  console.log(sheet.getRange("B1:2").getValues())
  rows = sheet.getRange("B1:2").getValues()
  values = Array.apply(0, Array(rows[0].length)).map((element,indx) => { return [rows[0][indx],rows[1][indx]] } )
  instances = values.filter(value => {return value[0]!=""})
  
  date = dataSheet.getRange(instructionDateChar+'2').getValue()

  for (var days=29;days>=0;days--){
    newDate = subtractDaysFromDate(date,days)
    for (var i=0;i<instances.length;i++){
      member = instances[i][0]
      ticker = instances[i][1]
      sheet.getRange(days+3,i+2,1,1).activate()
      sheet.getActiveRange().setFormula("=QUERY(Transactions!A1:"+dataSheet.getLastRow()+",\"SELECT COUNT(A) WHERE "+instructionDateChar+"<=date '"+newDate+"' and "+memberChar+"='"+member+"' and "+tickerChar+"='"+ticker+"'\")")
    }
    sheet.getRange(days+4,2,1,instances.length).activate()
    sheet.getActiveRange().setValues(sheet.getActiveRange().getValues())
    sheet.getRange(days+3,2,1,instances.length).clear()
    sheet.getRange("A"+(days+4).toString()).setValue(newDate)
  }
  sheet.deleteRow(3)
  // var chartType = Charts.ChartType.BAR
  // var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=1)
  // createNewPage(name, chart)
}

