require('log-timestamp');
require('mathjs');

const util = require('util')

const key          = '..'; // API Key
const secret       = '..'; // API Private Key
percentage = 0; //percentage of price difference
quantity = 100; //volume to buy in EURO

const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

(async () => {
    // Display EUR user's balance
    query = await kraken.api('Balance');
    balance_EUR = query.result["ZEUR"];
    console.log("Balance in Euro:" , balance_EUR);

    //Get open orders
    query = await kraken.api('OpenOrders');
    //Close the old orders
    for (var trade in query.result["open"]) {
      if (query.result["open"][trade]["descr"]["pair"] == "ETHEUR") {
        console.log("Trade to close:",trade);
        query_cancel = await kraken.api('CancelOrder', { txid : trade });
        console.log("Trade closed:",query_cancel)
      }
    }

    // Get Ticker Info
    query = await kraken.api('Ticker', { pair : 'XETHZEUR' });
    bid_ETHEUR = query.result["XETHZEUR"]["b"][0]
    console.log("Bid price Pair ETH EUR:",bid_ETHEUR);

    // Put the buy trades 
    for (var i = 1; i < balance_EUR / quantity ; i++) {
      if (i==1) {
        put_bid = bid_ETHEUR*(1-percentage/100);
        console.log(i," - Price to put:",put_bid.toFixed(2));
      }
      else {
        put_bid = bid_ETHEUR*(1-percentage/100)*(10**(i/(balance_EUR / quantity))-1)/9;
        console.log(i," - Price to put:",put_bid.toFixed(2));
      }
      volume = quantity/put_bid
      console.log("Volume:", volume);

      query = await kraken.api('AddOrder', { pair : 'XETHZEUR', type : 'buy', ordertype : 'limit', price : put_bid.toFixed(2), volume : volume });
      console.log("AddOrder",query);
    }

})();
