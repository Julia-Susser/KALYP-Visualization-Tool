                              

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Securities Data', 'GetSecuritiesData')
      .addItem('# of Active Programs per Register Servicer', 'graph1')
      .addItem('List of Active Programs per Register Servicer', 'graph2')
      .addItem('# of Shares Outstanding per program', 'graph3')
      .addItem('# of Headroom per Program', 'graph4')
      .addItem('% Headroom Factor per program', 'graph5')
      .addItem('# of Headroom Threshold and Amount SEC Approved per program', 'graph6')
      .addToUi();
  
}

// function k(t=7,k){
//   console.log(k)
// }
// function l(){
//   k(k=5,t=3)
// }

