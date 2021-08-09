function myFunction() {
  
}
function createLineChartViaRange(range){
  var sheet = getSheetFromName("Book-list");
  var chartDataRange = sheet.getRange("A1:B10")
  var hAxisOptions = {
      slantedText: true,
      slantedTextAngle: 60,
      gridlines: {
        count: 12
      }
    };
  
  var lineChartBuilder = sheet.newChart().asLineChart();
  var chart = lineChartBuilder
    .addRange(chartDataRange)
    .setPosition(5, 8, 0, 0)
    .setTitle('USD Exchange rates')
    .setNumHeaders(1)
    .setLegendPosition(Charts.Position.RIGHT)
    .setOption('hAxis', hAxisOptions)
    .setOption("useFirstColumnAsDomain", true)
    .build();
  sheet.insertChart(chart);

} 

function myFunction() {
  var sheet = getSheet("HELLO")
  filterPivot()
}


function filterPivot() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = getSheet("Securities")
  var sourceData = sheet.getRange('A1:B36');
  
  var pivotTable = SpreadsheetApp.addCalculatedPivotValue("UL country", "COUNTUNIQUE")
  // var criteria = SpreadsheetApp.newFilterCriteria()
  // .setVisibleValues(['Accounting'])
  // .build();
  
};




function exportChartsToSlides() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Fetch a list of all embedded charts in this
  // spreadsheet.
  var charts = [];
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    charts = charts.concat(sheets[i].getCharts());
  }
  
  // If there aren't any charts, display a toast
  // message and return without doing anything
  // else.
  if (charts.length == 0) {
    ss.toast('No charts to export!');
    return;
  }
  
  // Create a Slides presentation, removing the default
  // title slide.
  var presentationTitle =
    ss.getName() + " Presentation";
  var slides = SlidesApp.openById("1gOuctw3DUeDSEkoi9Y7Lo1Ih1Ty21UIDi291oFGTWKo");
  slides.getSlides()[0].remove();  
  
  // Add charts to the presentation, one chart per slide.
  var position = {left: 40, top: 30};
  var size = {height: 340, width: 430};
  for (var i = 0; i < charts.length; i++) {
    var newSlide = slides.appendSlide();
    newSlide.insertSheetsChart(
      charts[i],
      position.left,
      position.top,
      size.width,
      size.height);   
  }
  
  // Create and display a dialog telling the user where to
  // find the new presentation.
  var slidesUrl = slides.getUrl();
  var html = "<p>Find it in your home Drive folder:</p>"
      + "<p><a href=\"" + slidesUrl + "\" target=\"_blank\">"
      + presentationTitle + "</a></p>";
  
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html)
      .setHeight(120)
      .setWidth(350),
      "Created a presentation!"
  );
}

