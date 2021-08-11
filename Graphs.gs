//# of Active Programs per Register Servicer
function graph1(){
  name="# of Active Programs per Register Servicer"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  var filters = [
    {name:"Status",
    visibleValues:["Active"]}
    ]
  valueNames = [
    {name:"Ticker",summarizeFunction:"COUNTUNIQUE"}
  ]
  rowNames = [
    {name:"Ratio Effective Date"}
  ]
  columnNames = [
    {name:"Register Servicer"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames, filters=filters, columnNames=columnNames)
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

  var filters = [
    {name:"Status",
    visibleValues:["Active"]}
    ]
  rowNames = [
    {name:"Register Servicer"},
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames,valueNames=[],filters=filters)
  
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
  valueNames = [
    {name:"Amount Outstanding",summarizeFunction:"AVERAGE"}
  ]
  rowNames = [
    {name:"Ratio Effective Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames,filters=[],columnNames=columnNames)
  var chartType = Charts.ChartType.LINE
  var chart = createChart(sheet,name,"Time","Amount",chartType,numHeader=2)
  createNewPage(name, chart)
}

function graph4(){
  name="# of Headroom per Program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  
  customFunctions = [
    {name:"Headroom",
    customFunction:"='Amount SEC approved'-'Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
    ]
  rowNames = [
    {name:"Ratio Effective Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=[],filters=[],columnNames=columnNames,customFunctions=customFunctions)
  var chartType = Charts.ChartType.LINE
  chartName="# of Headroom per Program"
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=2)
  createNewPage(name, chart)
}


function graph5(){
  name="% Headroom Factor per program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()

  customFunctions = [
    {name:"Headroom",
    customFunction:"=('Amount SEC approved'-'Amount Outstanding')/'Amount SEC approved'*100",
    summarizeFunction:"CUSTOM"},
    ]
  rowNames = [
    {name:"Ratio Effective Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=[],filters=[],columnNames=columnNames,customFunctions=customFunctions)
  var chartType = Charts.ChartType.LINE
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
  dataSheet.sort(13, false);
  date = dataSheet.getRange('M2').getValue()
  date = DateInStringFormat(date)

  //Create a pivot table for each ticker's amount outstanding, headroom, and sec approved but only show the latest date in the data
  var filters = [
    {name:"Ratio Effective Date",
    visibleValues:[date]}
    ]
  customFunctions = [
    {name:"Headroom",
    customFunction:"='Amount SEC approved'-'Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
    {name:"Threshold",
    customFunction:"='Amount SEC approved'*.7",
    summarizeFunction:"CUSTOM"},
    {name:"Threshold Headroom",
    customFunction:"='Amount SEC approved'*.7-'Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
    {name:"Headroom above Threshold",
    customFunction:"='Amount SEC approved'-'Amount SEC approved'*.7",
    summarizeFunction:"CUSTOM"}
    ]
  valueNames = [
    {name:"Amount Outstanding",summarizeFunction:"AVERAGE"},
    {name:"Amount SEC approved",summarizeFunction:"AVERAGE"}
  ]
  rowNames = [
    {name:"Ticker"}
  ]

  createPivotTable(dataSheet,sheet,rowNames=rowNames,valuesNames=valueNames,filters=filters,columns=[],customFunctions=customFunctions)
  
  values = sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()-1).getValues()

  var chartType = Charts.ChartType.COLUMN
  var ranges = ["A:B","F:F","G:G"]
  var chart = createChart(sheet,name,"Ticker","Amount",chartType,numHeaders=1,ranges=ranges) // columns 1,2,3,7
  createNewPage(name,chart=chart,table=values)
  
  
}


function DateInStringFormat(date){
  month = parseInt(date.toISOString().substring(5,7))
  day = parseInt(date.toISOString().substring(8,10))
  year = date.toISOString().substring(0,4)
  date = month+'/'+day+'/'+year
  return date
}
  // var spreadsheet = SpreadsheetApp.getActive();
  // spreadsheet.getRange('Z3').activate()
  // .setFormula('=FILTER(A2:N26, M2:M26 = M2)');
  //values = sheet.getDataRange().getValues()




