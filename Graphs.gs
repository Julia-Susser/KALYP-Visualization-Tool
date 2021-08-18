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
  chartParams = {
    title:"# of Active Programs Per Servicer",
    numHeaders:2,
  }
  var chart = createChart(sheet,chartType,chartParams=chartParams)
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
  var dataValues = sheet.getDataRange().getValues().splice(1)

  tickers = []
  servicers = [["Servicer","Tickers"]]
  servicer = null
  dataValues.map(value => {
    newServicer = value[0]
    ticker = value[1]
    if (newServicer != ""){
      if (servicer != null){
        servicers.push(["",tickers])
      }
      tickers = []
      servicer = newServicer
    }
    tickers.push(ticker)
  })
  servicers.push(["",tickers])

  createNewPage(name, chart=null, table=servicers)
}


function SecuritiesPerProgram(type,yaxis,legend,customFunctions){
  title = `${type} per Program`
  date = getLatestDate()
  var sheet = getSheet(title)
  var dataSheet = getSheet("Securities")
  sheet.clear()
  valueNames = []
  filters=[]
  rowNames = [
    {name:"Ratio Effective Date"}
  ]
  columnNames = [
    {name:"Ticker"}
  ]
  createPivotTable(dataSheet,sheet,rowNames=rowNames, valueNames=valueNames,filters=filters,columnNames=columnNames,customFunctions=customFunctions)
  var chartType = Charts.ChartType.LINE
  chartParams = {
    verticalAxisTitle:yaxis,
    numHeaders:2,
    legendVisible:legend
  }

  var chart = createChart(sheet,chartType,chartParams)
  createNewPage(title, chart)
}

function graph3(){
  customFunctions = [
    {name:"Amount Outstanding",
    customFunction:"='Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
  ]
  SecuritiesPerProgram(type="# of Shares Outstanding",yaxis="",legend=true,customFunctions)
}

function graph4(){
  customFunctions = [
    {name:"Headroom",
    customFunction:"='Amount SEC approved'-'Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
    ]
  SecuritiesPerProgram(type="# of Headroom",yaxis="# of Headroom",legend=false,customFunctions)
}


function graph5(){
  customFunctions = [
    {name:"Headroom",
    customFunction:"=('Amount SEC approved'-'Amount Outstanding')/'Amount SEC approved'*100",
    summarizeFunction:"CUSTOM"},
    ]
  SecuritiesPerProgram(type=type="% Headroom Factor",yaxis="% Headroom Factor",legend=false,customFunctions)
}



//# of Headroom Threshold per program
//# of Approved Amount per program
function graph6(){
  var name = "# of Headroom Threshold and Amount SEC Approved per program"
  var sheet = getSheet(name)
  var dataSheet = getSheet("Securities")
  sheet.clear()

  //GET Latest Date
  date = DateInStringFormat(getLatestDate())

  //Create a pivot table for each ticker's amount outstanding, headroom, and sec approved but only show the latest date in the data
  var filters = [
    {name:"Ratio Effective Date",
    visibleValues:[date]}
    ]
  customFunctions = [
    {name:"Amount Outstanding",
    customFunction:"='Amount Outstanding'",
    summarizeFunction:"CUSTOM"},
    {name:"Amount SEC Approved",
    customFunction:"='Amount SEC approved'",
    summarizeFunction:"CUSTOM"},
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
  valueNames = []
  rowNames = [
    {name:"Ticker"}
  ]

  createPivotTable(dataSheet,sheet,rowNames=rowNames,valuesNames=valueNames,filters=filters,columns=[],customFunctions=customFunctions)
  
  values = sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()-1).getValues().splice(1)

  var chartType = Charts.ChartType.BAR
  chartParams = {
    verticallabels:false,
    stacked:true,
    ranges:["A:B","F:F","G:G"]
  }
  var chart = createChart(sheet,chartType,chartParams) 
  console.log(chart)
  createNewPage(name,chart=chart,table=values)
  
  
}








