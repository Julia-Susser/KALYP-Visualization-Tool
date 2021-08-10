//# of Active Programs per Register Servicer
function graph1(){
  var sheet = getSheet(name="# of Active Programs per Register Servicer")
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable2(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters, columns=["Register Servicer"])
  var name = "Active Programs per Register Servicer"
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType,numHeaders=2)
  createNewPage(name, chart)
}

//List of Active Programs per Register Servicer
function graph2(){
  name ="List of Active Programs per Register Servicer"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Register Servicer","Ticker"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters)
  var range = sheet.getRange("A1").getDataRegion()
  var dataValues = sheet.getRange(1,1,range.getHeight(),2).getValues()
  createNewPage(name, chart=null, dataValues)
}

//# of Shares Outstanding per program
function graph3(){
  name="# of Shares Outstanding per program (Over Time)"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Amount Outstanding","AVERAGE"]],filter=[],columns=["Ticker"])
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Time","Amount",chartType)
  createNewPage(name, chart)
}


//# of Headroom Threshold per program
//# of Approved Amount per program
function graph4(){
  var name = "Headroom and Amount Outstanding per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  // var spreadsheet = SpreadsheetApp.getActive();
  // dataSheet.getRange('M:M').activate();
  // dataSheet.sort(13, false);

  // var spreadsheet = SpreadsheetApp.getActive();
  // spreadsheet.getRange('Z3').activate()
  // .setFormula('=FILTER(A2:N26, M2:M26 = M2)');
  // date = spreadsheet.getRange('M2')
  // var filters = [["Ratio Effective Date",[date]]]
  var sheetTickers = getSheet("List of Active Programs")
  createPivotTable(dataSheet,sheetTickers,rowNames=["Ticker"],valuesNames=[["ISIN","COUNTUNIQUE"]])
  tickers = sheetTickers.getRange(2,1,sheetTickers.getRange("A1").getDataRegion().getHeight(),1).getValues()
  console.log(tickers)
  values = dataSheet.getDataRange().getValues()
  tickerIndx = getColIndxFromName(dataSheet,"Ticker")
  dateIndx = getColIndxFromName(dataSheet,"Ratio Effective Date")
  headroomIndx = getColIndxFromName(dataSheet,"Headroom")
  secIndx = getColIndxFromName(dataSheet,"Amount SEC approved")
  outstandingIndx = getColIndxFromName(dataSheet,"Amount Outstanding")
  oldest_date = values[1][dateIndx].toISOString().substring(0,10)
  tickers = tickers.map((ticker)=>{
    ticker = ticker[0]
    for (var i=1;i<values.length;i++){
      newDate = values[i][dateIndx].toISOString().substring(0,10)
      if (newDate!=oldest_date){
        return ["",ticker,"","",""]
      }
      
      if (values[i][tickerIndx]==ticker){
        return [newDate,ticker,values[i][outstandingIndx],values[i][headroomIndx],values[i][secIndx]]
      }
      
      
    }
  })
  tickers.unshift(["Date","Ticker","Amount Outstanding","Headroom","Amount SEC Approved"])
  sheet.getRange(1,1,tickers.length,tickers[0].length).activate().setValues(tickers)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=1,ranges=[[2,3]])
  createNewPage(name, chart=null, tickers)
}



// # of Headerooom per program (overtime)
function graph5(){
  name="# of Headroom per program (Over Time)"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  //["Amount Outstanding","AVERAGE"],["Amount SEC approved","AVERAGE"],
  var chartType = Charts.ChartType.LINE 
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Headroom","AVERAGE"]],filter=[],columns=["Ticker"])
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
  createNewPage(name, chart)
}

// # of Headerooom Factor per program (overtime)
function graph6(){
  name="# of Headroom Factor per program (Over Time)"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  //["Amount Outstanding","AVERAGE"],["Amount SEC approved","AVERAGE"],
  var chartType = Charts.ChartType.LINE 
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Headroom Percent","AVERAGE"]],filter=[],columns=["Ticker"])
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
  createNewPage(name, chart)
}

function HeadroomSecurities(){
  name="Securities"
  var dataSheet = getSheet(name)
  height = dataSheet.getDataRange().getHeight()
  var cell = dataSheet.getRange("X2:X"+height);
  dataSheet.getRange("X1").setValue("Headroom")
  cell.setFormula("=MINUS(I2:I"+height+",H2:H"+height+")")

  var cell = dataSheet.getRange("Y2:Y"+height);
  dataSheet.getRange("Y1").setValue("Headroom Percent")
  cell.setFormula("=DIVIDE(X2:X"+height+",I2:I"+height+")")
  dataSheet.getRange('Y:Y').activate();
  dataSheet.getActiveRangeList().setNumberFormat('0.00%');
}

function DOUBLE(input){
  return input* 2
}

function HeadroomGraph4(dataSheet){
  var range = dataSheet.getRange("A1").getDataRegion()
  height = range.getHeight()
  var cell = dataSheet.getRange("D2:D"+height);
  dataSheet.getRange("D1").setValue("Headroom")
  cell.setFormula("=MINUS(C2:C"+height+",B2:B"+height+")")
}