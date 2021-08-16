function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Menu')
      .addItem('Get Transactions Data', 'GetTransactionsData')
      .addSeparator()
      .addItem("# of pending transactions per Program","graph1")
      .addItem("# of failing transactions per Program (2 or more)","graph2")
      .addItem("# of failing transactions per Program (5 or more)","graph3")
      .addItem("# of failing transactions per Program (10 or more)","graph4")
      .addSeparator()
      .addItem("# of requested Services by Type and Member","graph5")
      .addItem("# of competed Services By Type and By Member","graph6")
      .addItem("# of cancelled Services By Type and By Member","graph7")
      .addSeparator()
      .addItem("# of pending Services By Type and By Member","graph8")
      .addItem("# of pending Services By Type and By Member (2 or more)","graph9")
      .addItem("# of pending Services By Type and By Member (10 or more)","graph10")
      .addSeparator()
      .addItem("Average age of completed Service By Type and By Member","graph11")
      .addItem("St.Dev. age of completed Service By Type and By Member","graph12")
      .addItem("Oldest Pending Service By Type and Member","graph13")
      .addToUi();
  
}
