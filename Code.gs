function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Transactions Data', 'GetTransactionsData')
      .addItem('# of Pending Transactions per Program','graph7')
      .addItem('# of Failed Transactions per Program','graph8')
      .addItem('# of Completed Transactions per Program','graph12')
      .addToUi();
  
}