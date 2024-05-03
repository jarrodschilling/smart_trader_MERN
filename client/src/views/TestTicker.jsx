import {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import StockService from "../services/StockService.jsx";

const TestTicker = (props) => {

    const {ticker} = useParams()
    const searchTicker = {ticker: ticker}

    const [stocks, setStocks] = useState([])

    useEffect(() => {
        StockService.getStocks(searchTicker)
            .then((res) => {
                console.log(res);
                setStocks(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function dateChanger(dateISO) {
        const dateObject = new Date(dateISO)
        const newDate = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`

        return newDate
    }

    function totalCost(price, shares) {
        const cost = price * shares
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(cost);
        return formattedNumber
    }

    function formatedPrice(price) {
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
        return formattedNumber
    }

    const deleteHandler = (idForDeletion) => {
        StockService.deleteOneStock(idForDeletion)
            .then((res)=>{
                console.log(res)
                const filteredList = stocks.filter((stock) => {
                    return stock._id !== idForDeletion
                })
                setStocks(filteredList)
            })
    }

    return(
        <div>
            <h1>Trade Ledger</h1>
            <div className="displayContainer">
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
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((stock) => (
                            <tr key={stock._id} className={`${(stock.buySell === "buy")? 'ledgerBuy': 'ledgerSell'}`}>
                                <td>{dateChanger(stock.date)}</td>
                                <td>{stock.ticker}</td>
                                <td>{stock.buySell}</td>
                                <td>{formatedPrice(stock.price)}</td>
                                <td>{stock.shares}</td>
                                <td>{totalCost(stock.price, stock.shares)}</td>
                                <td>{stock.shaper}</td>
                                <td>{stock.tactical}</td>
                                <td><button><Link to={`/update/${stock._id}`}>EDIT</Link></button></td>
                                <td><button onClick={()=>deleteHandler(stock._id)}>DELETE</button></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default TestTicker