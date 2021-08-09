function slideData(name){
  var data = {
  "# of Active Programs per Register Servicer": 1,
};
  return data[name]
}


function getPresentation(){
  return SlidesApp.openById("1gOuctw3DUeDSEkoi9Y7Lo1Ih1Ty21UIDi291oFGTWKo")
}
function insertSlideAtIndx(indx=2){
  var newSlide = getPresentation().insertSlide(indx,SlidesApp.PredefinedLayout.TITLE_ONLY)
  return newSlide
}
function removeSlide(name="Active Programs per Register Servicer",slides){
  var slides = getPresentation().getSlides()
  for (var i=0; i<slides.length; i++){
    slide = slides[i]
    var text = getTitleShape(slide)
    if (text != undefined){
      text = text.getText()
      if (text.find(name).length>0){
        slide.remove()
      }
    }
  }
}
function createNewPage(name="Active Programs per Register Servicer",chart=null){
  var slides = getPresentation().getSlides()
  indx = slideData(name)
  removeSlide(name,slides)
  var slide = insertSlideAtIndx(indx)
  updateTitle(name,slide)
  if (chart==null){
    var dataSheet = getSheet(name)
    var charts = dataSheet.getCharts()
    if (charts.length>0){
      addChartToSlides(charts[0],slide)
    }
  }
  addChartToSlides(chart,slide)
}

function createText(text,slideNumber){
  var slide = getPresentation().getSlides()[slideNumber]
  var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
  var textRange = shape.getText();
  textRange.setText(text);
  textRange.getTextStyle().setFontSize(20)
  shape.setLeft(50).setTop(30).setWidth(1000).setHeight(60)
}

function getTitleShape(slide){
  var placeholder = slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE);
  if (placeholder!=null){
    var shape = placeholder.asShape()
    return shape
  }
}
function getTitleText(slide){
  var shape = getTitleShape(slide)
  if (shape!=null){
    return shape.getText().asString()
  }
}
function updateTitle(title, slide){
  var shape = getTitleShape(slide)
  var textRange = shape.getText();
  textRange.setText(title);
}

function addChartToSlides(chart,slide){
  var position = {left: 40, top: 50};
  var size = {height: 340, width: 430};
  slide.insertSheetsChart(
      chart,
      position.left,
      position.top,
      size.width,
      size.height);   
}
