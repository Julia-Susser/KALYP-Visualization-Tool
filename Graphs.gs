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
  name="Amount Outstanding per Program per Day"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[["Amount Outstanding","SUM"]],filter=[],columns=["Ticker"])
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Time","Amount",chartType)
  createNewPage(name, chart)
}
function graph4(){
  var sheet = getSheet(name="Headroom and Amount Outstanding per Program")
  var dataSheet = getSheet("Securities")
  sheet.clear()
  // var filters = [["Status",["Active"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Ticker"], valueNames=[["Amount Outstanding","SUM"],["Amount SEC approved","MAX"]])
  var name = "Headroom and Amount Outstanding per Program"
  var chartType = Charts.ChartType.COLUMN
  Headroom(sheet)
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,ranges=[[1,2],[4,4]])
  createNewPage(name, chart)
}


function graph5(){
  name="# of Headroom per Program per Day"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var headRoom = Headroom()
  console.log(headRoom)
  createPivotTable(dataSheet,sheet,rowNames=["Ratio Effective Date"], valueNames=[[headRoom,"SUM"]],filter=[],columns=["Ticker"])
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Time","Amount",chartType,ranges=[1,3])
  createNewPage(name, chart)
}


function Headroom(dataSheet){
  var range = dataSheet.getRange("A1").getDataRegion()
  height = range.getHeight()
  var cell = dataSheet.getRange("D2:D"+height);
  cell.getRange("D1").setValue("Headroom")
  cell.setFormula("=MINUS(C2:C"+height+",B2:B"+height+")")
}