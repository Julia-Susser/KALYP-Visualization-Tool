//# of Active Programs per Register Servicer
function graph1(){
  var sheet = getSheet(name="# of Active Programs per Register Servicer")
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters, columns=["Register Servicer"])
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
// function graph4(){
//   var sheet = getSheet(name="Headroom and Amount Outstanding per Program")
//   var dataSheet = getSheet("Securities")
//   sheet.clear()
//   // var filters = [["Status",["Active"]]]
//   createPivotTable(dataSheet,sheet,rowNames=["Ticker"], valueNames=[["Amount Outstanding","LAST"],["Amount SEC approved","MAX"]])
//   var name = "Headroom and Amount Outstanding per Program"
//   var chartType = Charts.ChartType.COLUMN
//   HeadroomGraph4(sheet)
//   var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=1,ranges=[[1,2],[4,4]])
//   createNewPage(name, chart)
// }



//# of Headerooom per program (overtime)
// function graph5(){
//   name="# of Headroom per program (Over Time)"
//   var sheet = getSheet(name)
//   var dataSheet = getSheet("Securities")
//   sheet.clear()
//   //["Amount Outstanding","AVERAGE"],["Amount SEC approved","AVERAGE"],
//   var chartType = Charts.ChartType.LINE 
//   createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Headroom","AVERAGE"]],filter=[],columns=["Ticker"])
//   var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
//   createNewPage(name, chart)
// }

function HeadroomSecurities(){
  name="Securities"
  var dataSheet = getSheet(name)
  height = dataSheet.getDataRange().getHeight()
  var cell = dataSheet.getRange("X2:X"+height);
  dataSheet.getRange("X1").setValue("Headroom")
  cell.setFormula("=MINUS(I2:I"+height+",H2:H"+height+")")
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