import { useState, useEffect } from "react";
import ToDoService from "../services/ToDoService"
import StockService from "../services/StockService.jsx";
import YahooService from "../services/YahooService.jsx";
import {dateChanger, totalCostFmt, formatedPrice,formatedPercent} from "../utils/FormatFunctions.jsx"
import { Link } from "react-router-dom";

const ToDo = (props) => {
    const [toDos, setToDos] = useState([])
    const [prices, setPrices] = useState({})
    const [stockState, setStockState] = useState({
        ticker: "",
        name:"",
        price: 0,
        date: 0,
        shares: 0,
        buySell: "",
        shaper: "",
        tactical: "",
        openTrade: false,
        closeTrade: false
    })

    useEffect(() => {
        ToDoService.getAllToDos()
            .then((res) => {
                console.log(res);
                setToDos(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        // Fetch stock prices when the component mounts
        toDos.forEach((toDo) => {
            const symbol = toDo.ticker;
            YahooService.getQuote(symbol)
            .then((res) => {
                const price = res.chart.result[0].meta.regularMarketPrice;
                setPrices((prevPrices) => ({ ...prevPrices, [symbol]: price }));
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }, [toDos]);

    const deleteHandler = (idForDeletion) => {
        ToDoService.deleteOneToDo(idForDeletion)
            .then((res)=>{
                console.log(res)
                const filteredList = toDos.filter((toDo) => {
                    return toDo._id !== idForDeletion
                })
                setToDos(filteredList)
            })
    }


    const makeUrgentHandler = (idForChange, currentStatus) => {
        try {
            const newStatus = !currentStatus
            ToDoService.patchOneToDo(idForChange, {quickAction: newStatus})
            setToDos((prevToDos) =>
                prevToDos.map((toDo) =>
                    toDo._id === idForChange ? { ...toDo, quickAction: newStatus} : toDo
                )
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    const makeEnteredHandler = (idForChange, currentStatus) => {
        try {
            const newStatus = !currentStatus
            ToDoService.patchOneToDo(idForChange, {entered: newStatus})
            setToDos((prevToDos) =>
                prevToDos.map((toDo) =>
                    toDo._id === idForChange ? { ...toDo, entered: newStatus} : toDo
                )
            )
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1>Trade Sheet</h1>
            <button className="dashLinkBtn" style={{margin: "10px"}}><Link className="mainLink" to="/addtodo">Add To Do</Link></button>
            <div className="displayContainer">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ticker</th>
                        <th>Buy/Sell</th>
                        <th>Price</th>
                        <th>Distance</th>
                        <th>Shares</th>
                        <th>Total Value</th>
                        <th>Shaper</th>
                        <th>Tactical</th>
                        {/* <th>OPEN</th>
                        <th>CLOSE</th> */}
                        <th>URGENT</th>
                        <th>ENTERED</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                        <th>EXECUTED</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        toDos
                        .sort((a, b) => (a.buySell.localeCompare(b.buySell)) || (Math.abs((a.price-prices[a.ticker])/a.price*100) - Math.abs((b.price-prices[b.ticker])/b.price*100)))
                        .map((toDo) => {
                            const price = prices[toDo.ticker];
                        
                            return (
                            <tr key={toDo._id} 
                            className={`${(toDo.buySell === "sell")? 'toDoUpdateStop'
                            :(toDo.quickAction === true)? 'toDoUrgent'
                            :(toDo.entered === true)? 'toDoEntered'
                            :''}`}>
                                <td>{dateChanger(toDo.date)}</td>
                                <td>{toDo.ticker}</td>
                                <td>{toDo.buySell}</td>
                                <td>{formatedPrice(toDo.price)}</td>
                                <td>{formatedPercent((toDo.price-price)/toDo.price*100)}</td>
                                <td>{toDo.shares}</td>
                                <td>{totalCostFmt(toDo.price, toDo.shares)}</td>
                                <td>{toDo.shaper}</td>
                                <td>{toDo.tactical}</td>
                                {/* <td>{toDo.openTrade? "Yes": ""}</td>
                                <td>{toDo.closeTrade? "Yes": ""}</td> */}
                                <td><button className="editDeleteBtn" onClick={()=>makeUrgentHandler(toDo._id, toDo.quickAction)}>URGENT</button></td>
                                <td><button className="editDeleteBtn" onClick={()=>makeEnteredHandler(toDo._id, toDo.entered)}>+</button></td>
                                <td><button className="editDeleteBtn"><Link className="linkNoDec" to={`/updatetodo/${toDo._id}`}>EDIT</Link></button></td>
                                <td><button className="editDeleteBtn" onClick={()=>deleteHandler(toDo._id)}>DELETE</button></td>
                                <td><button className="editDeleteBtn"><Link className="linkNoDec" to={`/addtodotrade/${toDo._id}`}>EXECUTE</Link></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
    )

}

export default ToDo