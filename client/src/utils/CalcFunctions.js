const portfolio = 1000000
// console.log(`Portfolio Value: ${portfolio}`)

function groupTrades(trades) {
    const tradeGroups = new Map()

    trades.forEach((trade, index) => {
        const tickerKey = `${trade.ticker}`
        
        if (!tradeGroups.has(tickerKey)) {
        tradeGroups.set(tickerKey, [])
        }

        const tickerGroup = tradeGroups.get(tickerKey)

        if (trade.openTrade) {
        // Start a new trade group
        tickerGroup.push([trade])
        } else if (trade.closeTrade) {
        // Find the last open trade group for the ticker and add to it
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
        if (lastOpenGroup) {
            lastOpenGroup.push(trade)
        }
        } else {
        // Add to the last open trade group for the ticker
        const lastOpenGroup = tickerGroup[tickerGroup.length - 1]
        if (lastOpenGroup) {
            lastOpenGroup.push(trade)
        }
        }
    });

    return Array.from(tradeGroups.values()).reduce((acc, groups) => acc.concat(groups), [])
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
        date: "01/09/24",
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
        date: "01/15/24",
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
        date: "02/20/24",
        openTrade: false,
        closeTrade: true
    },
]

const groupedTrades = groupTrades(trades);
// console.log(groupedTrades[0][0].date);


function gainLoss (tradeList) {
    // console.log(`gainloss test ${tradeList}`)
    let totalGainLoss = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalGainLoss += tradeList[i].price * tradeList[i].shares * -1
        }
        else {
            totalGainLoss += tradeList[i].price * tradeList[i].shares
        }
    }
    return totalGainLoss
}

// function loopThrough (tradeList) {
//     for (const trade of tradeList) {
//         console.log(`Gain/Loss for ${trade[0].ticker}: ${gainLoss(trade)}`)
//     }
// }
// loopThrough(groupedTrades)

function totalCost (tradeList) {
    let cost = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares
        }
    }
    return cost
}
// console.log(`Total Cost: ${totalCost(trades)}`)


function avgOpenPrice (tradeList) {
    let totalShares = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalShares += tradeList[i].shares
        }
    }
    let avgPrice = totalCost(tradeList)/totalShares
    return avgPrice
}
// console.log(`Avg Open Price: ${avgOpenPrice(trades)}`)

function totalSold (tradeList) {
    let value = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            value += tradeList[i].price * tradeList[i].shares
        }
    }
    return value
}
// console.log(`Total Sold: ${totalSold(trades)}`)

function avgClosePrice (tradeList) {
    let totalShares = 0
    let totalValue = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            totalShares += tradeList[i].shares
            totalValue += (tradeList[i].shares * tradeList[i].price)
        }
    }
    let avgPrice = totalValue/totalShares
    return avgPrice
}
// console.log(`Avg Close Price: ${avgClosePrice(trades)}`)

function percentGainLoss(tradeList) {
    let prctGainLoss = 100 * gainLoss(tradeList)/totalCost(tradeList)
    return prctGainLoss
}
// console.log(`% Gain/Loss: ${percentGainLoss(trades)}%`)


function portfolioPercentImpact (portValue, tradeList) {
    let portImpact = 100 * gainLoss(tradeList)/portValue
    return portImpact
}
// console.log(`% Portfolio Impact: ${portfolioPercentImpact(portfolio, trades)}%`)


function getOpenDate (trades) {
    for (const trade of trades) {
        if (trade.openTrade === true) {
            return trade.date
        }
    }
}

function getCloseDate (trades) {
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            return trade.date
        }
    }
}


function getOwnedShares (trades) {
    let totalShares = 0
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares
        }
    }
    return totalShares
}

function currentShares (trades) {
    let totalShares = 0
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares
        }
        else if (trade.buySell === "sell") {
            totalShares -= trade.shares
        }
    }
    return totalShares
}

function openTradeTrue (trades) {
    let count = 0
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            count += 1
        }
    }
    if (count == 1){
        return true
    }
    else {
        return false
    }
}

function openCurrentCost (tradeList) {
    let cost = 0
    let sales = 0
    let shares = 0
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares
            shares += tradeList[i].shares
        }
        else if (tradeList[i].buySell === "sell") {
            sales += tradeList[i].price * tradeList[i].shares
            shares -= tradeList[i].shares
        }
    }
    if (shares > 0) {
        let avgPrice = (cost-sales)/shares
        return avgPrice
    }
}
// console.log(`avg open: ${openCurrestCost(trades)}`)

export {
    groupTrades,
    totalCost,
    avgOpenPrice,
    totalSold,
    avgClosePrice,
    percentGainLoss,
    portfolioPercentImpact,
    getOpenDate,
    getCloseDate,
    getOwnedShares,
    gainLoss,
    openTradeTrue,
    currentShares,
    openCurrentCost
}