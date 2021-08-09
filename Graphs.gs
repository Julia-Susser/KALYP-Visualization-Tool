function graph1(){
  var sheet = getSheet(name="# of Active Programs per Register Servicer")
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Register Servicer"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters)
  var name = "Active Programs per Register Servicer"
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType)
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
  var chart = createChart(sheet,name,"Register Servicer","Number of Programs",chartType)
  createNewPage(name, chart)
}

function Headroom(){
  var dataSheet = getSheet("Securities")
  var cell = dataSheet.getRange("A:A");
  cell.setFormula("=I:I-H:H"); 
}