import { groupTrades, totalCost, avgOpenPrice, totalSold, avgClosePrice, percentGainLoss, portfolioPercentImpact,getOpenDate, getCloseDate, getOwnedShares, gainLoss } from "../utils/CalcFunctions.js";

const portfolio = 1000000
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
    // {
    //     ticker: "aapl",
    //     buySell: "sell",
    //     shares: 400,
    //     price: 130,
    //     date: "02/11/24",
    //     openTrade: false,
    //     closeTrade: true
    // },
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
        price: 200,
        date: "02/20/24",
        openTrade: false,
        closeTrade: true
    },
]

const allTrades = groupTrades(trades)
// console.log(allTrades)

function clearOpenTrades (tradesList) {
    let updatedTrades = []
    for (const trades of tradesList) {
        for (const trade of trades) {
            if (trade.closeTrade === true) {
                updatedTrades.push(trades)
            }
        }
    }
    return updatedTrades
}
// console.log(clearOpenTrades(allTrades))
// console.log(clearOpenTrades(allTrades)[3][0].ticker)


function battingAvg (trades) {
    let win = 0
    let loss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (gainLoss(trade) >= 0) {
            win += 1
            avgWinList.push(gainLoss(trade))
        }
        else {
            loss += 1
            avgLossList.push(gainLoss(trade))
        }
    }
    let winPct = win/(win+loss)*100
    let lossPct = 100 - winPct

    for (const win of avgWinList) {

    }
    return {winPct, lossPct}
}

// console.log(battingAvg(allTrades).winPct)
// console.log(battingAvg(allTrades).lossPct)

function avgDollarWinLoss (trades) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (gainLoss(trade) >= 0) {
            avgWinList.push(gainLoss(trade))
        }
        else {
            avgLossList.push(gainLoss(trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgDollarWinLoss(allTrades).finalWin)
// console.log(avgDollarWinLoss(allTrades).finalLoss)


function avgPctWinLoss (trades) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        if (percentGainLoss(trade) >= 0) {
            avgWinList.push(percentGainLoss(trade))
        }
        else {
            avgLossList.push(percentGainLoss(trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgPctWinLoss(allTrades).finalWin)
// console.log(avgPctWinLoss(allTrades).finalLoss)

function avgPortWinLoss (trades) {
    let avgWin = 0
    let avgLoss = 0
    let avgWinList = []
    let avgLossList = []
    for (const trade of trades) {
        
        if (portfolioPercentImpact(portfolio, trade) >= 0) {
            avgWinList.push(portfolioPercentImpact(portfolio, trade))
        }
        else {
            avgLossList.push(portfolioPercentImpact(portfolio, trade))
        }
    }
    for (const win of avgWinList) {
        avgWin += win
    }
    for (const loss of avgLossList) {
        avgLoss += loss
    }
    let finalWin = avgWin/avgWinList.length
    let finalLoss = avgLoss/avgLossList.length
    return {finalWin, finalLoss}
}

// console.log(avgPortWinLoss(allTrades).finalWin)
// console.log(avgPortWinLoss(allTrades).finalLoss)

function realizedGainLoss (trades) {
    let realized = 0
    for (const trade of trades) {
        realized += gainLoss(trade)
    }
    return realized
}

// console.log(realizedGainLoss(allTrades))

function totalDollarPL (realized, unrealized) {
    return realized + unrealized
}

function totalPctPL (portfolio, dollarReturn) {
    return dollarReturn/portfolio * 100
}

export {
    battingAvg,
    avgDollarWinLoss,
    avgPctWinLoss,
    avgPortWinLoss,
    realizedGainLoss,
    totalDollarPL,
    totalPctPL,
    clearOpenTrades
}