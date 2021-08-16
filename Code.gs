function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Transactions Data', 'GetTransactionsData')
      .addItem("# of pending transactions per Program","graph1")
      .addItem("# of settled transactions per Program","graph6")
      .addItem("# of failing transactions per Program (2 or more days)","graph2")
      .addItem("# of failing transactions per Program (older than 2)","graph3")
      .addItem("# of failing transactions per Program (older than 5)","graph4")
      .addItem("# of failing transactions per Program (older than 10)","graph5")
      .addItem("# of requested Services by Type and Member","graph7")
      .addItem("# of competed Services (ex Notifications) By Type and By Member","graph8")
      .addItem("# of cancelled Services (ex Notifications) By Type and By Member","graph12")
      .addItem("# of pending Services (ex Notifications) By Type and By Member","graph9")
      .addItem("# of pending Services (ex Notifications) By Type and By Member +3days","graph10")
      .addItem("# of pending Services (ex Notifications) By Type and By Member +10days","graph11")
      .addItem("# Average age of completed Service (ex Notifications) By Type and By Member","graph13")
      .addItem("# Average age of pending Service (ex Notifications) By Type and By Member","graph14")
      .addToUi();
  
}
