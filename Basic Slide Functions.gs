function createText(text,slideNumber){
  var slide = getPresentation().getSlides()[slideNumber]
  var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
  var textRange = shape.getText();
  textRange.setText(text);
  textRange.getTextStyle().setFontSize(20)
  shape.setLeft(50).setTop(30).setWidth(1000).setHeight(60)
}

function insertSlideAtIndx(indx=1){
  var newSlide = getPresentation().insertSlide(indx,SlidesApp.PredefinedLayout.TITLE_ONLY)
  return newSlide
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
   if (shape!=null){
    var textRange = shape.getText();
    textRange.setText(title);
   }
}

