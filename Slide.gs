function slideData(name){
  var data = {
  "# of pending transactions (3 to 4 days) per Program":{chart:{page:7,left: 1.65, top: 1.51, height: 3.52, width: 2.21,back:1},table:{page:7,left: 0.82, top: 1.64, height: 3, width: 7.54,fontSize:6}},
  "# of pending transactions (5 or more days) per Program":{chart:{page:7,left: 3.95, top: 1.51, height: 3.52, width: 2.21,back:1}},
  "# of pending transactions (10 or more days) per Program":{chart:{page:7,left: 6.25, top: 1.51, height: 3.52, width: 2.21,back:1}},
  "# of pending transactions (legend) per Program":{chart:{page:7,left: 6.73, top: 1.51, height: 3.52, width: 2.21,back:10}},

  "# of requested Services by Type and Member":{chart:[{page:4,left: 0.75, top: 1.6, height: 2.92, width: 2.06},{page:5,left: 0.75, top: 1.6, height: 2.92, width: 2.06}]},
  "# of pending Services by Type and Member":{chart:[{page:4,left: 2.73, top: 1.6, height: 2.92, width: 2.06},{page:6,left: 0.75, top: 1.6, height: 2.92, width: 2.06}]},
  "# of cancelled Services by Type and Member":{chart:{page:4,left: 4.98, top: 1.6, height: 2.92, width: 2.06}},
  "# of completed Services by Type and Member":{chart:[{page:4,left: 7.03, top: 1.6, height: 2.92, width: 2.06},{page:5,left: 2.73, top: 1.6, height: 2.92, width: 2.06}]},

  "Average age of Completed Services by Type and By Member":{chart:{page:5,left: 4.98, top: 1.6, height: 2.92, width: 2.06}},
  "Standard Dev. of age of Completed Services by Type and By Member":{chart:{page:5,left: 7.03, top: 1.6, height: 2.92, width: 2.06}},
  
  "# of pending services (2 or more days) by Type and Member":{chart:{page:6,left: 2.73, top: 1.6, height: 2.92, width: 2.06}},
  "# of pending services (10 or more days) by Type and Member":{chart:{page:6,left: 4.98, top: 1.6, height: 2.92, width: 2.06}},
  "Oldest Pending Service by Type and By Member":{chart:{page:6,left: 6.73, top: 1.6, height: 2.92, width: 2.06}},
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
  removeChartAndTable(name,slides)
  if (chart!=null){
    var data = slideData(name).chart
    if (data.length === undefined){
      data = [data]
    }
    data.forEach(chartData => {
    var slide = slides[chartData.page]
    addChartToSlide(chart,slide,name,chartData)
    })
  }
  if (table != null){
    var data = slideData(name).table
    var slide = slides[data.page]
    if (data.length === undefined){
      data = [data]
    }
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



