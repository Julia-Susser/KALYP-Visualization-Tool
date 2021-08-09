

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Securities Data', 'GetSecuritiesData')
      .addItem('Active Programs per Register Servicer', 'graph1')
      .addToUi();
  
}

// function k(t=7,k){
//   console.log(k)
// }
// function l(){
//   k(k=5,t=3)
// }

//"A1:1" - entire row because the column end is not specified