function getPresentation(){
  return SlidesApp.openById("1ODjC72a1tJv1oN0XaVZD4ABW3iatVRrR-hqyVRHKd50")
}

function removeChartAndTable(name,slides){
  //Go through each slide and remove the chart or table if it has the same name as the one inputted. This is so multiple graphs and tables are not put on the slide. Keep in mind that you can name page elements invisibly
  for (var i=0; i<slides.length; i++){
    slide = slides[i]
    elements = slide.getPageElements()
    elements.map((element)=>{
      if (element.getTitle()===name){
        element.remove()
      }
    })
    
  }
}
function createNewPage(name,chart=null,table=null){
  var slides = getPresentation().getSlides()
  removeChartAndTable(name,slides) // each chart and table has an invisible title, delete the items (through all slides) with that title
  if (chart!=null){
    var data = getTypeDataForName(name,"chart")//get the parameters from the data format page
    data.forEach(chartData => { // if there are multiple charts with that name, create all of them according the the parameters
      var slide = slides[chartData.page]
      addChartToSlide(chart,slide,name,chartData)
    })
  }
  if (table != null){
    var data = getTypeDataForName(name,"table") //get the parameters from the data format page
    data.forEach(tableData => {
      var slide = slides[tableData.page]
      addTableToSlide(table,slide,name,tableData)
    })
  }
  
}

function addChartToSlide(chart,slide,name,data){
  chart = slide.insertSheetsChart(
      chart)
  chart = chart
    .setLeft(data.left*72)
    .setTop(data.top*72)
    .setHeight(data.height*72)
    .setWidth(data.width*72);
  for (var i=0;i<data.back;i++){
    chart.sendBackward()
  }
  chart.setTitle(name)
  return chart  
}

function addTableToSlide(values,slide,name,data){
  var rows = values.length;
  var columns = values[0].length;
  table = slide.insertTable(rows,columns,0,0,data.width*72,data.height*72)
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      cell = table.getCell(r, c)
      cell.getText().setText(values[r][c]);
      if (values[r][c]!=""){
        cell.getText().getTextStyle().setFontSize(data.fontSize)
      }
    }
  }
  table.setTop(data.top)
  table.bringToFront()
  table.setLeft(data.left*72)
  table.setTop(data.top*72)
  table.setTitle(name)
  return table
}

function getTypeDataForName(name="# of Active Programs per Register Servicer",type="chart"){
  values = format()
  data = values.filter(row => {return row["name"] === name & row["type"]===type})
  return data
}

function format(){
  var dataSpreadsheet = SpreadsheetApp.openById(
    "1v9-D0tAJxmyW0b6bC_1Izy68I2Gd_AwwlDEg4OZcQI4" 
  );
   var dataSheet = dataSpreadsheet.getSheetByName("format");
  columns = dataSheet.getDataRange().getValues()
  data = columns.splice(1)
  columns = columns[0]
  values = data.map(row => {
    values = {}
    columns.forEach((col,indx) => {
      if (row[indx] != "" | row[indx]===false | row[indx]===0){
        values[col]=row[indx]
      }
      })
    return values
  })
  return values
}


