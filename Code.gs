                              

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Securities Data', 'GetSecuritiesData')
      .addItem('# of Active Programs per Register Servicer', 'graph1')
      .addItem('Headroom and Amount Outstanding per Program', 'graph4')
      .addItem('Amount Outstanding per Program per Day', 'graph3')
      .addItem('# of Headroom per Program per Day', 'graph5')
      .addToUi();
  
}

// function k(t=7,k){
//   console.log(k)
// }
// function l(){
//   k(k=5,t=3)
// }

//"A1:1" - entire row because the column end is not specified