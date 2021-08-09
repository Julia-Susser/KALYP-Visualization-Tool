function graph2(){
  var sheet = getSheet(name="# of Shares Outstanding per program")
  var dataSheet = getSheet("Securities")
  sheet.clear()

  createPivotTable(dataSheet,sheet,rowName="Ticker", valuesName="Amount Outstanding", "SUM")
  
  var name = "# of Shares Outstanding per program"
  var chartType = Charts.ChartType.COLUMN
  createChart(sheet,name,chartType)
}
