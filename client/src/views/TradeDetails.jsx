import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import YahooService from "../services/YahooService.jsx";
import TradeDetailsHeader from "../components/TradeDetailsHeader.jsx"
import OpenTradeDetailsHeader from "../components/OpenTradeDetailsHeader.jsx"
import {dateChanger, totalCostFmt, formatedPrice, formatedPercent, formatedCost} from "../utils/FormatFunctions.jsx"
import { currentOpenCost, currentValue, currentGainLoss } from "../utils/CurPortCalcs.js";
import {currentShares, openTradeTrue, groupTrades, gainLoss, totalCost, avgOpenPrice, avgClosePrice, totalSold, percentGainLoss, portfolioPercentImpact} from "../utils/CalcFunctions.js"

const TradeDetails = (props) => {
    const {startPortValue} = props
    const portfolio = startPortValue
    const [stocks, setStocks] = useState([])
    const [price, setPrice] = useState({})
    const navigate = useNavigate()
    // Pull down state from App.jsx
    const {detailStocks, setDetailStocks} = props

    const stocksVariable = detailStocks[0]
    
    // needed to handle manual reload of details page
    if (stocksVariable) {
    // Calcs for CLOSED Trades
    let tradeGainLoss = gainLoss(stocksVariable)
    let tradeTotalCost = totalCost(stocksVariable)
    let tradeAvgOpenPrice = avgOpenPrice(stocksVariable)
    let tradeAvgClosePrice = avgClosePrice(stocksVariable)
    let tradeTotalSold = totalSold(stocksVariable)
    let tradePercentGainLoss = percentGainLoss(stocksVariable)
    let tradePortfolioPctImpact = portfolioPercentImpact(portfolio, stocksVariable)

    // Calcs for OPEN Trades
    useEffect(() => {
        // Grab current stock price from Yahoo Finance API
            const symbol = stocksVariable[0].ticker
            YahooService.getQuote(symbol)
            .then((res) => {
                // console.log(res.chart.result[0].meta.regularMarketPrice)
                setPrice(res.chart.result[0].meta.regularMarketPrice)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [stocksVariable])
    
    let headerOpenPx = formatedPrice(avgOpenPrice(stocksVariable))
    let headerOpenShares = currentShares(stocksVariable)
    let headerOpenCost = formatedCost(currentOpenCost(stocksVariable))
    let headerOpenCurrentPx = formatedPrice(price)
    let headerOpenCurrentValue = formatedCost(currentValue(price, stocksVariable))
    let forHeader = currentGainLoss(price, stocksVariable)
    let headerOpenGainLoss = formatedCost(currentGainLoss(price, stocksVariable))
    let headerOpenGainLossPct = formatedPercent(currentGainLoss(price, stocksVariable)/currentOpenCost(stocksVariable)*100)
    let headerOpenPortImp = formatedPercent(currentGainLoss(price, stocksVariable)/(portfolio)*100)

    
    return(
        <div>
            <h1>Trade Details</h1>
            {
                openTradeTrue(stocksVariable)?
                <TradeDetailsHeader tradePortfolioPctImpact={tradePortfolioPctImpact} tradePercentGainLoss={tradePercentGainLoss} tradeTotalSold={tradeTotalSold} tradeAvgClosePrice={tradeAvgClosePrice} tradeGainLoss={tradeGainLoss} tradeTotalCost={tradeTotalCost} tradeAvgOpenPrice={tradeAvgOpenPrice} />:
                <OpenTradeDetailsHeader forHeader={forHeader} headerOpenPortImp={headerOpenPortImp} headerOpenGainLossPct={headerOpenGainLossPct} headerOpenGainLoss={headerOpenGainLoss} headerOpenCurrentValue={headerOpenCurrentValue} headerOpenCurrentPx={headerOpenCurrentPx} headerOpenPx={headerOpenPx} headerOpenShares={headerOpenShares} headerOpenCost={headerOpenCost}/>
                
            }
            <div className="displayContainer" style={{marginBottom: "100px"}}>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ticker</th>
                        <th>Buy/Sell</th>
                        <th>Price</th>
                        <th>Shares</th>
                        <th>Total Value</th>
                        <th>Shaper</th>
                        <th>Tactical</th>
                        <th>OPEN</th>
                        <th>CLOSE</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocksVariable
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((stock, index) => (
                            <tr key={index} 
                            className={`${(stock.buySell === "buy")?'ledgerBuy':'ledgerSell'}`}>
                                <td>{dateChanger(stock.date)}</td>
                                <td>{stock.ticker}</td>
                                <td>{stock.buySell}</td>
                                <td>{formatedPrice(stock.price)}</td>
                                <td>{stock.shares}</td>
                                <td>{totalCostFmt(stock.price, stock.shares)}</td>
                                <td>{stock.shaper}</td>
                                <td>{stock.tactical}</td>
                                <td>{stock.openTrade? "Yes": ""}</td>
                                <td>{stock.closeTrade? "Yes": ""}</td>
                                <td><button className="editDeleteBtn"><Link className="linkNoDec" to={`/update/${stock._id}`}>EDIT</Link></button></td>
                                <td><button className="editDeleteBtn" onClick={()=>deleteHandler(stock._id)}>DELETE</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
    }
    // needed to handle manual reload of details page
    else {
        useEffect(()=> navigate('/stats'))
    }
}

export default TradeDetails