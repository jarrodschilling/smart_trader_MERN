import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DashStatsHeader from "./DashStatsHeader.jsx"
import StockService from "../services/StockService.jsx";
import YahooService from "../services/YahooService";
import {dateChanger, formatedPrice, formatedCost, formatedPercent} from "../utils/FormatFunctions.jsx"
import { currentShares, groupTrades, totalCost, avgOpenPrice, getOpenDate, getCloseDate, getOwnedShares, gainLoss, openTradeTrue } from "../utils/CalcFunctions.js";
import { realizedGainLoss, totalDollarPL, totalPctPL, clearOpenTrades } from "../utils/PortStatFunctions.js";
import { currentOpenCost, currentValue, currentGainLoss } from "../utils/CurPortCalcs.js";

const DashPortfolio = (props) => {
    const {startPortValue} = props
    const portfolio = startPortValue
    const [realStocks, setRealStocks] = useState([])
    const [stocks, setStocks] = useState([])
    const [prices, setPrices] = useState({})
    const {stateUpdater, setDetailStocks} = props
    const navigate = useNavigate()
    

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                setRealStocks(groupTrades(res))
                let newTrades = groupTrades(res)
                let openStocks = []
                for (let i =0; i < newTrades.length; i++) {
                    if (openTradeTrue(newTrades[i]) === false) {
                        openStocks.push(newTrades[i])
                    }
                }
                console.log(openStocks)
                setStocks(openStocks);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        // Fetch stock prices when the component mounts
        stocks.forEach((stock) => {
            const symbol = stock[0].ticker;
            YahooService.getQuote(symbol)
            .then((res) => {
                const price = res.chart.result[0].meta.regularMarketPrice;
                setPrices((prevPrices) => ({ ...prevPrices, [symbol]: price }));
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }, [stocks]);

    function unrealizedPL (stocks) {
        let cost = 0
        let curValue = 0
        let unrlzPL = 0
        let unrlzPLPct = 0
        for (let i = 0; i < stocks.length; i++) {
            const symbol = stocks[i][0].ticker
            const price = prices[symbol]
            cost += currentOpenCost(stocks[i])
            curValue += currentValue(price, stocks[i])
            unrlzPL += currentGainLoss(price, stocks[i])
        }
        return { cost, curValue, unrlzPL }
    }
    let headerCurrentValue = formatedCost(unrealizedPL(stocks).curValue)
    let headerUnRlzPL = (unrealizedPL(stocks).unrlzPL)
    let headerUnrealizedPLPct = formatedPercent(unrealizedPL(stocks).unrlzPL/unrealizedPL(stocks).cost*100)
    let headerPortfolioPL = formatedPercent(unrealizedPL(stocks).unrlzPL/portfolio*100)

    let updatedTrades = clearOpenTrades(realStocks)
    let rlzGainLoss = realizedGainLoss(updatedTrades)
    let totalPL = totalDollarPL(rlzGainLoss, headerUnRlzPL)
    let totalValue = formatedCost(portfolio + totalPL)
    let totalPLPct = totalPctPL(portfolio, totalPL)

    return(
        <div>
            <DashStatsHeader totalPLPct={totalPLPct} totalValue={totalValue} totalPL={totalPL} headerCurrentValue={headerCurrentValue} headerUnRlzPL={headerUnRlzPL} rlzGainLoss={rlzGainLoss} />
            <div className="displayContainer">
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Open Date</th>
                        <th>Close Date</th>
                        <th>Avg Open Px</th>
                        <th>Shares</th>
                        <th>Open Cost</th>
                        <th>Current Px</th>
                        <th>Current Value</th>
                        <th>Gain/Loss</th>
                        <th>Gain/Loss %</th>
                        <th>Portfolio P/L</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks
                        .sort((a, b) => new Date(a[0].date) - new Date(b[0].date))
                        .map((stock, index) => {
                            const symbol = stock[0].ticker;
                            const price = prices[symbol];

                            return (
                            <tr key={index} className={`${(currentGainLoss(price, stock)>0)? 'ledgerBuy': 'ledgerSell'}`}>            
                                {/* {console.log(openTradeTrue(stock))} */}
                                <td>{stock[0].ticker}</td>
                                <td>{stock[0].name}</td>
                                <td>{dateChanger(getOpenDate(stock))}</td>
                                <td>{dateChanger(getCloseDate(stock))}</td>
                                <td>{formatedPrice(avgOpenPrice(stock))}</td>
                                <td>{currentShares(stock)}</td>
                                <td>{formatedCost(currentOpenCost(stock))}</td>
                                <td>{formatedPrice(price)}</td>
                                <td>{formatedCost(currentValue(price, stock))}</td>
                                <td>{formatedCost(currentGainLoss(price, stock))}</td>
                                <td>{formatedPercent(currentGainLoss(price, stock)/currentOpenCost(stock)*100)}</td>
                                <td>{formatedPercent(currentGainLoss(price, stock)/(portfolio)*100)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DashPortfolio