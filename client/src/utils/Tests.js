function groupTrades(trades) {
    const tradeGroups = new Map();

    trades.forEach((trade, index) => {
        const tickerKey = `${trade.ticker}`;
        
        if (!tradeGroups.has(tickerKey)) {
        tradeGroups.set(tickerKey, []);
        }

        const tickerGroup = tradeGroups.get(tickerKey);

        if (trade.openTrade) {
        // Start a new trade group
        tickerGroup.push([trade]);
        } else if (trade.closeTrade) {
        // Find the last open trade group for the ticker and add to it
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
        if (lastOpenGroup) {
            lastOpenGroup.push(trade);
        }
        } else {
        // Add to the last open trade group for the ticker
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
        if (lastOpenGroup) {
            lastOpenGroup.push(trade);
        }
        }
    });

    // Sort the trade groups by the date of openTrade
    const sortedGroups = Array.from(tradeGroups.values()).map(group => group.sort((a, b) => parseDate(a[0].date) - parseDate(b[0].date)));

    return sortedGroups.reduce((acc, groups) => acc.concat(groups), []);
    }

    // Function to parse the date in MM/DD/YY format
    function parseDate(dateString) {
    const [month, day, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
    }

const trades = [
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 100,
        price: 100,
        date: "01/02/24",
        openTrade: true,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 100,
        price: 125,
        date: "01/05/24",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 50,
        price: 145,
        date: "01/06/24",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "nvda",
        buySell: "buy",
        shares: 50,
        price: 500,
        date: "01/09/23",
        openTrade: true,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "sell",
        shares: 100,
        price: 200,
        date: "01/11/24",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "aapl",
        buySell: "buy",
        shares: 400,
        price: 100,
        date: "01/14/24",
        openTrade: true,
        closeTrade: false
    },
    {
        ticker: "nvda",
        buySell: "buy",
        shares: 50,
        price: 550,
        date: "01/15/23",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 100,
        price: 165,
        date: "01/19/24",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "sell",
        shares: 250,
        price: 180,
        date: "01/24/24",
        openTrade: false,
        closeTrade: true
    },    
    {
        ticker: "aapl",
        buySell: "sell",
        shares: 400,
        price: 130,
        date: "02/11/24",
        openTrade: false,
        closeTrade: true
    },
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 25,
        price: 100,
        date: "02/12/24",
        openTrade: true,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "buy",
        shares: 25,
        price: 125,
        date: "02/14/24",
        openTrade: false,
        closeTrade: false
    },
    {
        ticker: "amzn",
        buySell: "sell",
        shares: 50,
        price: 145,
        date: "02/15/24",
        openTrade: false,
        closeTrade: true
    },
    {
        ticker: "nvda",
        buySell: "sell",
        shares: 100,
        price: 700,
        date: "02/20/23",
        openTrade: false,
        closeTrade: true
    },
]

const groupedTrades = groupTrades(trades);
console.log(groupedTrades);
console.log(groupedTrades[0][0].ticker);
console.log(groupedTrades[1][0].ticker);
console.log(groupedTrades[2][0].ticker);
console.log(groupedTrades[3][0].ticker);

export {groupTrades}