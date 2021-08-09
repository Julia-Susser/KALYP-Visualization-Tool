function graph1(){
  var sheet = getSheet(name="# of Active Programs per Register Servicer")
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [["Status",["Active"]]]
  createPivotTable(dataSheet,sheet,rowNames=["Register Servicer"], valueNames=[["Ticker","COUNTUNIQUE"]], filters=filters)
  var name = "Active Programs per Register Servicer"
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,chartType)
  createNewPage(name, chart)
}


