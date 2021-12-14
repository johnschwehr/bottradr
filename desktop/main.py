import tkinter as tk
import logging

from connectors.binance_futures import BinanceFuturesClient
from connectors.bitmex import BitmexClient

from interface.root_component import Root

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger()
formatter = logging.Formatter('%(asctime)s %(levelname)s :: %(message)s')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
stream_handler.setLevel(logging.INFO)

file_handler = logging.FileHandler('info.log')
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.DEBUG)

logger.addHandler(stream_handler)
logger.addHandler(file_handler)

if __name__ == '__main__':

    binance = BinanceFuturesClient("236e4f6b096227736505ba32a6f8331de82cf92362cb8988c086eceaa311ca4c",
                                  "8254b37afaeefa4b8bc977b3a83bb29253c7e290f521843f2aa74e7c76909053", True)

    bitmex = BitmexClient("C2MQZs_9dFkRnQG1hwrbE5cG",
                            "s7O1ajXt9HmdqSXuYkEQj-iYN-KB5jXujZVRvVOTLVw6ksjo", True)
                            
    #print(binance.get_historical_candles("BTCUSDT", "1h"))
    #print(binance.get_balances())
    #print(binance.place_order("BTCUSDT", "BUY", 0.01, "LIMIT", 20000, "GTC"))
    #print(binance.get_order_status("BTCUSDT", 2877338926))
    #print(binance.cancel_order("BTCUSDT", 2877338926))

    

    root = Root(binance, bitmex)
    root.mainloop()
