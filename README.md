## Node script for Dollar-Cost Averaging on Kraken

**Dollar-Cost Averaging (DCA)** is an investment strategy that consists in purchasing an asset periodically on a long term period. Because of the high volatility of cryptocurrency DCA is a great plan to increase your crypto assets.
This script uses the Exchange [Kraken](https://www.kraken.com). It is configured to put a buy trade at the pair bid price minus a percentage in order to enjoy the lowest fee possible (maker fee).
In addition the script will put a certain number of buy trades (according to the quantity and remaining fiat reserve) at lower price to capture any fat finger trades. The trade's distribution follow a function (10^x-1)/9 (https://www.desmos.com/calculator/tqckgq4ymf) which distribute trades to enable best possibility of gains.

Based on [Kraken API](https://github.com/nothingisdead/npm-kraken-api)

### Instructions
* Install node.js
* Install kraken-api:
> npm install kraken-api
* Configure the user settings
  * Kraken Key and Secret
  * Percentage
  * quantity

* To setup DCA use crontab. Example of launching script everyday at midnight:
> 0 0 * * * /usr/bin/node $DIRECTORY/dca_kraken.js >> $DIRECTORY/dca_kraken.log 2>&1
