function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Transactions Data', 'GetTransactionsData')
      .addSeparator()
      .addItem("# of pending transactions (3 to 4 days) per Program","graph1")
      .addItem("# of pending transactions (5 to 9 days) per Program","graph2")
      .addItem("# of pending transactions (10+ days) per Program","graph3")
      .addSeparator()
      .addItem("# of requested Services by Type and Member","graph4")
      .addItem("# of pending Services By Type and By Member","graph5")
      .addItem("# of cancelled Services By Type and By Member","graph6")
      .addItem("# of completed Services By Type and By Member","graph7")
      .addSeparator()
      .addItem("Average age of completed Service By Type and By Member","graph8")
      .addItem("St.Dev. age of completed Service By Type and By Member","graph9")
      .addSeparator()
      .addItem("# of pending Services By Type and By Member (2+ days)","graph10")
      .addItem("# of pending Services By Type and By Member (10+ days)","graph11")
      .addItem("Oldest Pending Service By Type and Member","graph12")
      .addToUi();
  
}
