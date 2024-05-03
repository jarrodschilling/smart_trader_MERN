import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../services/StockService.jsx";
import YahooService from "../services/YahooService";
import TradeStatsHeader from "../components/TradeStatsHeader.jsx";
import {dateChanger, formatedPrice, formatedCost, formatedPercent} from "../utils/FormatFunctions.jsx"
import { groupTrades, totalCost, avgOpenPrice, totalSold, avgClosePrice, percentGainLoss, portfolioPercentImpact,getOpenDate, getCloseDate, getOwnedShares, gainLoss, openTradeTrue } from "../utils/CalcFunctions.js";
import { battingAvg, avgDollarWinLoss, avgPctWinLoss, avgPortWinLoss, realizedGainLoss, totalDollarPL, totalPctPL, clearOpenTrades } from "../utils/PortStatFunctions.js";
import { currentGainLoss } from "../utils/CurPortCalcs.js";

const TradeStats = (props) => {
    // Set Portfolio Value
    const {startPortValue} = props
    const portfolio = startPortValue

    const [unRealStocks, setUnrealStocks] = useState([])
    const [stocks, setStocks] = useState([])

    // Lifting state in order to pass an entire Trade (group of transactions)
    const {stateUpdater, setDetailStocks} = props
    const [prices, setPrices] = useState({})
    const navigate = useNavigate()
    

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                // Get all transactions and group them into Trades
                setStocks(groupTrades(res))
                // Seperate Open/Unrealized Trades
                let newTrades = groupTrades(res)
                let openStocks = []
                for (let i =0; i < newTrades.length; i++) {
                    if (openTradeTrue(newTrades[i]) === false) {
                        openStocks.push(newTrades[i])
                    }
                }
                setUnrealStocks(openStocks)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        // Grab stock prices from Yahoo Finance API to calculate current unrealized Gain/Loss
        stocks.forEach((stock) => {
            const symbol = stock[0].ticker
            YahooService.getQuote(symbol)
            .then((res) => {
                const price = res.chart.result[0].meta.regularMarketPrice
                setPrices((prevPrices) => ({ ...prevPrices, [symbol]: price }))
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }, [unRealStocks])

    // Calculate Urealized Gain/Loss
    function unrealizedPL (stocks) {
        let unrlzPL = 0
        for (let i = 0; i < stocks.length; i++) {
            const symbol = stocks[i][0].ticker
            const price = prices[symbol]
            unrlzPL += currentGainLoss(price, stocks[i])
        }
        return unrlzPL
    }

    let unRlzGainLoss = unrealizedPL(unRealStocks)

    // Calculations for Header Component
    let updatedTrades = clearOpenTrades(stocks)
    let winPct = formatedPercent(battingAvg(updatedTrades).winPct)
    let lossPct = formatedPercent(battingAvg(updatedTrades).lossPct)
    let avgWinUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalWin)
    let avgLossUSD = formatedCost(avgDollarWinLoss(updatedTrades).finalLoss)
    let avgWinPct = formatedPercent(avgPctWinLoss(updatedTrades).finalWin)
    let avgLossPct = formatedPercent(avgPctWinLoss(updatedTrades).finalLoss)
    let avgPortWin = formatedPercent(avgPortWinLoss(updatedTrades).finalWin)
    let avgPortLoss = formatedPercent(avgPortWinLoss(updatedTrades).finalLoss)
    let rlzGainLoss = realizedGainLoss(updatedTrades)
    let totalPL = totalDollarPL(rlzGainLoss, unRlzGainLoss)
    let totalPLPct = totalPctPL(portfolio, totalPL)

    // Lift state of a Trade to display on Trade Details Component
    const detailsHandler = (tradeGroup) => {
        let newValue = tradeGroup
        stateUpdater(newValue)
        // console.log(`new value: ${newValue[0]}`)
        navigate('/trades/details')
    }


    return(
        <div>
            <h1>Trading Statistics</h1>
            <TradeStatsHeader unrealizedGainLoss={unRlzGainLoss} totalPLPct={totalPLPct} totalPL={totalPL} rlzGainLoss={rlzGainLoss} avgPortLoss={avgPortLoss} avgPortWin={avgPortWin} avgLossPct={avgLossPct} avgWinPct={avgWinPct} winPct={winPct} lossPct={lossPct} avgWinUSD={avgWinUSD} avgLossUSD={avgLossUSD}/>
            <div className="displayContainer" style={{marginBottom: "100px"}}>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Open Date</th>
                        <th>Close Date</th>
                        <th>Avg Open Price</th>
                        <th>Shares</th>
                        <th>Open Cost</th>
                        <th>Close Price</th>
                        <th>Close Value</th>
                        <th>Gain/Loss</th>
                        <th>Gain/Loss %</th>
                        <th>Portfolio P/L</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks
                        .sort((a, b) => new Date(a[0].date) - new Date(b[0].date))
                        .map((stock, index) => (
                            <tr key={index} className={`${(openTradeTrue(stock) === false)? '':(gainLoss(stock)>0)? 'ledgerBuy': 'ledgerSell'}`}>
                                <td>{stock[0].ticker}</td>
                                <td>{stock[0].name}</td>
                                <td>{dateChanger(getOpenDate(stock))}</td>
                                <td>{dateChanger(getCloseDate(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPrice(avgOpenPrice(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{getOwnedShares(stock)}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(totalCost(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPrice(avgClosePrice(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(totalSold(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedCost(gainLoss(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPercent(percentGainLoss(stock))}</td>
                                <td className={`${(openTradeTrue(stock) === false)? 'hidden': ''}`}>{formatedPercent(gainLoss(stock)/(portfolio)*100)}</td>
                                
                                <td><button className="editDeleteBtn" onClick={()=>detailsHandler(stock)}>Details</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default TradeStats