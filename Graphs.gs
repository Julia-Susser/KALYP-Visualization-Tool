//# of Active Programs per Register Servicer
function graph1(){
  name="# of Active Programs per Register Servicer"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable2(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters, columns=["Register Servicer"])
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


function graph3(){
  name="# of Shares Outstanding per program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Amount Outstanding","AVERAGE"]],filters=[],columns=["Ticker"])
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Time","Amount",chartType,numHeader=2)
  createNewPage(name, chart)
}

function graph4(){
  name="# of Headroom per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var chartType = Charts.ChartType.LINE 
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Headroom","AVERAGE"]],filter=[],columns=["Ticker"])
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
  createNewPage(name, chart)
}


function graph5(){
  name="% Headroom Factor per program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var chartType = Charts.ChartType.LINE 
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Headroom Percent","AVERAGE"]],filter=[],columns=["Ticker"])
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
  createNewPage(name, chart)
}



//# of Headroom Threshold per program
//# of Approved Amount per program
function graph6(){
  var name = "# of Headroom Threshold and Amount SEC Approved per program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  dataSheet.getRange('AA6').activate();
  dataSheet.getCurrentCell().setFormula('=MAX(M:M)');
  dataSheet.getActiveRangeList().setNumberFormat('M/d/yyyy');
  date = dataSheet.getCurrentCell().getValue()
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = month+'/'+day+'/'+year
  var filters = [["Ratio Effective Date",[date]]]
  createPivotTable(dataSheet,sheet,rowNames=["Ticker"],valuesNames=[["Amount Outstanding","AVERAGE"],["Headroom","AVERAGE"],["Amount SEC approved","AVERAGE"]],filters=filters)
  values = sheet.getDataRange().getValues()
  
 
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=1,ranges=[[2,3]])
  createNewPage(name, chart, values)
  
  
}



  // var spreadsheet = SpreadsheetApp.getActive();
  // spreadsheet.getRange('Z3').activate()
  // .setFormula('=FILTER(A2:N26, M2:M26 = M2)');




