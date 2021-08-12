function myFunction() {
  
}


function graph7() {
  name="# of Pending Transactions per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Transactions")
  dataSheet.getRange('L:L').activate();
  dataSheet.sort(12, false);
  date = dataSheet.getRange('L2').getValue()
  dates = last30Days(date)
  var filters = [
    {name:"Status",
    visibleValues:["pending"]}, 
    {name:"Instruction Date",
    visibleValues:dates}
    ]
  valueNames = [
    {name:"Status",summarizeFunction:"COUNTA"}
  ]
  rowNames = [
    {name:"Instruction Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
  var chartType = Charts.ChartType.BAR
  var chart = createChart(sheet,name,"# of Transactions","Programs/Day",chartType,numHeaders=2)
  //createNewPage(name, chart)
}