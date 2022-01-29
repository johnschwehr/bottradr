module.exports = class Trade {
  constructor(trade_info) {
    this.time = trade_info.time;
    this.contract = trade_info.contract;
    this.strategy = trade_info.strategy;
    this.side = trade_info.side;
    this.entry_price = trade_info.entry_price;
    this.status = trade_info.status;
    this.pnl = trade_info.pnl.parseFloat();
    this.quantity = trade_info.quantity;
    this.entry_id = trade_info.entry_id;
  }
};
