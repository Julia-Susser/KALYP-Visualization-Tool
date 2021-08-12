function slideData(name){
  var data = {
  "# of Active Programs per Register Servicer": {page:1,chart:{left: 200, top: 70, height: 340, width: 400}},
  "List of Active Programs per Register Servicer":{page:1,table:{left: 10, top: 70, height: 300, width: 150}},
  "# of Shares Outstanding per program":{page:2,chart:{left: 10, top: -50, height: 500, width: 300}},
  "# of Headroom per Program":{page:2,chart:{left: 320, top: -150, height: 500, width: 300}},
  "% Headroom Factor per program":{page:2,chart:{left: 320, top: 150, height: 300, width: 300}},
  "# of Headroom Threshold and Amount SEC Approved per program":
  { page:3,
  chart:{left: 350, top: 80, height: 300, width: 350},
  table:{left: 40, top: 80, height: 50, width: 250}},
  "# of Pending Transactions per Program":{page:4,chart:{left: 320, top: 150, height: 300, width: 300}},
  "# of Pending Transactions per Program (2 days or More)":{page:4,chart:{left: 320, top: 150, height: 300, width: 300}},
  "# of Completed Transactions per Program":{page:4,chart:{left: 320, top: 150, height: 300, width: 300}},
};
  return data[name]
}

function getPresentation(){
  return SlidesApp.openById("1gOuctw3DUeDSEkoi9Y7Lo1Ih1Ty21UIDi291oFGTWKo")
}

function removeChartAndTable(name,slides){
  //Go through each slide and remove the chart or table if it has the same name as the one inputted. This is so multiple graphs and tables are not put on the slide. Keep in mind that you can name tables
  for (var i=0; i<slides.length; i++){
    slide = slides[i]
    tables = slide.getTables()
    tables.map((table)=>{
      if (table.getTitle()===name){
        table.remove()
      }
    })

    charts = slide.getSheetsCharts()
    charts.map((chart)=>{
      if (chart.getTitle()===name){
        chart.remove()
      }
    })

    var text = getTitleShape(slide)
    if (text != undefined){
      text = text.getText()
      if (text.find(name).length>0){
        //slide.remove()
      }
    }
    
  }
}
function createNewPage(name,chart=null,table=null){
  var slides = getPresentation().getSlides()
  indx = slideData(name).page
  removeChartAndTable(name,slides)
  console.log(indx)
  var slide = slides[indx]
  if (chart!=null){
    addChartToSlides(chart,slide,name)
  }
  if (table != null){
    table = addTableToSlide(table,slide,name)
  }
  
}

function addChartToSlides(chart,slide,name){
  var data = slideData(name).chart
  slide.insertSheetsChart(
      chart,
      data.left,
      data.top,
      data.width,
      data.height); 
  return chart  
}

function addTableToSlide(values,slide,name){
  var data = slideData(name).table
  var rows = values.length;
  var columns = values[0].length;
  table = slide.insertTable(rows,columns,0,0,data.width,data.height)
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      cell = table.getCell(r, c)
      cell.getText().setText(values[r][c]);
      if (values[r][c]!=""){
        cell.getText().getTextStyle().setFontSize(10)
      }
    }
  }
  table.setTop(data.top)
  table.setLeft(data.left)
  table.setTitle(name)
  return table
}



