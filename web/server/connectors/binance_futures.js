const Binance = require("node-binance-api");
const Balance = require("../models/balance");
const Candle = require("../models/candle");
const Contract = require("../models/contract");
const OrderStatus = require("../models/orderstatus");

const binance = new Binance().options({
  APIKEY: process.env.APIKEY_BINANCEF,
  APISECRET: process.env.APISECRET_BINANCEF,
});

async function get_contracts() {
  try {
    const raw_exchange_info = await binance.futuresExchangeInfo();

    var contracts = {};

    for (let contract of raw_exchange_info.symbols) {
      contracts[contract.symbol] = new Contract(contract, "binance");
    }

    return contracts;
  } catch (err) {
    console.log(err);
  }
}

async function get_historical_candles(contract, interval) {
  try {
    const raw_candles = await binance.futuresCandles(contract.symbol, interval);

    candles = [];

    for (let c of raw_candles) {
      candles.push(new Candle(c, interval, "binance"));
    }

    return candles;
  } catch (err) {
    console.log(err);
  }
}

async function get_balances() {
  try {
    balances = {};

    account_data = await binance.futuresAccount();

    for (let a of account_data.assets) {
      balances[a["asset"]] = new Balance(a, "binance");
    }

    return balances;
  } catch (err) {
    console.log(err);
  }
}

async function place_order(contract, order_type, quantity, side, price, tif) {
  try {
    if (side.toUpperCase() == "BUY") {
      if (order_type == "LIMIT") {
        order_status = await binance.futuresBuy(
          contract.symbol,
          quantity,
          price,
          { timeInForce: tif }
        );
      } else if (order_type == "MARKET_BUY") {
        order_status = await binance.futuresMarketBuy(
          contract.symbol,
          quantity,
          { timeInForce: tif }
        );
      }
    } else if (side.toUpperCase() == "SELL") {
      if (order_type == "LIMIT") {
        order_status = await binance.futresSell(
          contract.symbol,
          quantity,
          price,
          { timeInForce: tif }
        );
      } else if (order_type == "MARKET_BUY") {
        order_status = await binance.futuresMarketSell(
          contract.symbol,
          quantity,
          { timeInForce: tif }
        );
      }
    }

    order_status = new OrderStatus(order_status, "binance");

    return order_status;
  } catch (err) {
    console.log(err);
  }
}

async function cancel_order(contract, order_id) {
  try {
    order_status = await binance.futuresCancel(contract.symbol, order_id);

    order_status = new OrderStatus(order_status, "binance");
  } catch (err) {
    console.log(err);
  }
}

async function get_order_status(contract, order_id) {
  try {
    order_status = await binance.futuresOrderStatus(contract.symbol, {
      orderId: order_id,
    });

    order_status = new OrderStatus(order_status, "binance");
  } catch (err) {
    console.log(err);
  }
}

async function get_trade_size(contract, price, balance_pct) {
  try {
    balance = await this.get_balances();
    if ("USDT" in balance) {
      balance = balance["USDT"].wallet_balance;
    } else {
      return undefined;
    }

    trade_size = (balance * balance_pct / 100 ) / price;
    trade_size = Math.round(
      Math.round(trade_size / contract.lot_size) * contract.lot_size,
      8
    );

    return trade_size;
  } catch (err) {
    console.log(err);
  }
}

//test
(async () => {
  try {
    contracts = await get_contracts(); //test get_contracts
    //console.log(contracts);

    //candles = await get_historical_candles(contracts["BTCUSDT"], "1d"); //test get_historical_candles
    //console.log(candles.slice(-1));

    //balances = await get_balances(); //test get_balances
    //console.log(balances)
  } catch (err) {
    console.log(err);
  }
})();
