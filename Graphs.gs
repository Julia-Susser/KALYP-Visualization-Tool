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
  createPivotTable(dataSheet,sheet,rowNames=["Register Servicer","Ticker"],valueNames=[],filters=filters)
  
  //This reorganizes the data values from the pivot table so that each servicer is side by side with all of the tickers for the table
  var dataValues = sheet.getDataRange().getValues()
  tickers = []
  servicers = []
  servicer = null
  dataValues.map(value => {
    newServicer = value[0]
    ticker = value[1]
    if (newServicer != ""){
      if (servicer != null){
        servicers.push([servicer,tickers])
      }
      tickers = []
      servicer = newServicer
    }
    tickers.push(ticker)
  })
  servicers.push([servicer,tickers])

  createNewPage(name, chart=null, table=servicers)
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
  sheet.clear()

  //GET Latest Date
  dataSheet.getRange('M:M').activate();
  dataSheet.sort(13, false);
  date = dataSheet.getRange('M2').getValue()
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = month+'/'+day+'/'+year

  //Create a pivot table for each ticker's amount outstanding, headroom, and sec approved but only show the latest date in the data
  var filters = [["Ratio Effective Date",[date]]]
  createPivotTable(dataSheet,sheet,rowNames=["Ticker"],valuesNames=[["Amount Outstanding","AVERAGE"],["Headroom","AVERAGE"],["Amount SEC approved","AVERAGE"]],filters=filters)
  values = sheet.getDataRange().getValues()
  
 //Create a column chart but only use columns 1,3 in the chart (ie. forget the amount sec approved column)
  var chartType = Charts.ChartType.COLUMN
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=1,ranges=[[1,3]])
  createNewPage(name, chart, values)
  
  
}



  // var spreadsheet = SpreadsheetApp.getActive();
  // spreadsheet.getRange('Z3').activate()
  // .setFormula('=FILTER(A2:N26, M2:M26 = M2)');




