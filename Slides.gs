function graph1(){}
function graph2(){}
function graph3(){}
function graph4(){}
function graph5(){}
function graph6(){}

function slideData(name){
  var data = {
  "# of Active Programs per Register Servicer": {page:1,chart:{left: 0.73, top: 1.28, height: 3.85, width: 6.23}},
  "List of Active Programs per Register Servicer":{page:1,table:{left: 6.96, top: 1.56, height: 1.61, width: 2.39,fontSize:12}},
  "# of Shares Outstanding per Program":{page:2,chart:{left: 0.72, top: 1.37, height: 3.48, width: 4.59}},
  "# of Headroom per Program":{page:2,chart:{left: 5.8, top: 3.17, height: 1.77, width: 2.98}},
  "% Headroom Factor per Program":{page:2,chart:{left: 5.8, top: 1.37, height: 1.77, width: 2.98}},
  "# of Headroom Threshold and Amount SEC Approved per program":
  { page:3,
  chart:{left: 3.81, top: 1.25, height: 3.78, width: 6.11},
  table:{left: 0.86, top: 1.53, height: 3.01, width: 3.15,fontSize:5}}
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
    elements = slide.getPageElements()
    elements.map((element)=>{
      if (element.getTitle()===name){
        element.remove()
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
  console.log(data.top)
  chart = slide.insertSheetsChart(
      chart)
    
  chart = chart
    .setLeft(data.left*72)
    .setTop(data.top*72)
    .setHeight(data.height*72)
    .setWidth(data.width*72);
  chart.sendToBack()
  chart.setTitle(name)
  return chart  
}

function addTableToSlide(values,slide,name){
  var data = slideData(name).table
  var rows = values.length;
  var columns = values[0].length;
  table = slide.insertTable(rows,columns,0,0,data.width*72,data.height*72)
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      cell = table.getCell(r, c)
      cell.getText().setText(values[r][c]);
      //cell.getFill().setSolidFill(100,100,100,.5)
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



