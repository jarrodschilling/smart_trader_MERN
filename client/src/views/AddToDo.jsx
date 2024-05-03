import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToDoHandlerHook from "../hooks/ToDoHandlerHook";
import ToDoService from "../services/ToDoService"
import YahooService from "../services/YahooService";
import Shaper from "../components/Shaper";
import Tactical from "../components/Tactical";


const AddToDo = (props) => {
    const {toDoState, formErrors, notRequired, handleChange} = ToDoHandlerHook()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     ToDoService.addOneToDo(toDoState)
    //         .then(res => {
    //         console.log(res)
    //         navigate('/tradesheet')
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setErrors(err.response.data.errors)
    //         })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newValue = toDoState.ticker
        let toDoName
        try {
                const response = await YahooService.getName(newValue);
                // console.log(response)
                stockName = response.quoteType.result[0].shortName
                // console.log(stockName)
            } catch (error) {
                console.error("Error fetching stock name:", error);
            }
        const updatedToDoState = { ...toDoState, name: toDoName }
        
        ToDoService.addOneToDo(updatedToDoState)
            .then(res => {
            console.log(res)
            navigate('/tradesheet')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }

    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }


    return(
        <div className="tradeFormContainer">
            <h1>Add a To Do</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                <div className="formCol">
                    <label htmlFor="date">Date*</label>
                    <input type="date" name="date" id="date" value={toDoState.date} onChange={handleChange} />
                    {formErrors.date? <p>{formErrors.date}</p>: <p> </p>}
                    {errors.date && <p>{errors.date.message}</p>}

                    <label htmlFor="shares">Shares*</label>
                    <input type="number" name="shares" id="shares" value={toDoState.shares} onChange={handleChange} />
                    {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                    {errors.shares && <p>{errors.shares.message}</p>}

                    <Shaper stockState={toDoState} handleChange={handleChange} notRequired={notRequired} errors={errors} />
                    {/* <label htmlFor="shaper">Shaper Pattern</label>
                    <select name="shaper" id="shaper" value={toDoState.shaper} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Cup w/ Handle">Cup w/ Handle</option>
                        <option value="Cup no Handle">Cup no Handle</option>
                        <option value="Coil">Coil</option>
                        <option value="Flat Base">Flat Base</option>
                        <option value="High Tight Flag">High Tight Flag</option>
                        <option value="Double Bottom">Double Bottom</option>
                        <option value="Inverse Head and Shoulders">Inverse Head and Shoulders</option>
                        <option value="De-risk">De-risk</option>
                        <option value="Earnings Soon">Earnings Soon</option>
                    </select>
                    {notRequired.shaper? <p>{notRequired.shaper}</p>: <p> </p>}
                    {errors.shaper && <p>{errors.shaper.message}</p>} */}

                    <button className="confirmTrade" type="submit" disabled={!validateForm()}>Add To Do</button>
                </div>

                <div className="formCol">
                    <label htmlFor="buySell">Buy or Sell*</label>
                    <select name="buySell" id="buySell" value={toDoState.buySell} onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    {formErrors.buySell? <p>{formErrors.buySell}</p>: <p> </p>}
                    {errors.buySell && <p>{errors.buySell.message}</p>}

                    <label htmlFor="price">Price*</label>
                    <input type="number" name="price" id="price" value={toDoState.price} onChange={handleChange} />
                    {formErrors.price? <p>{formErrors.price}</p>: <p> </p>}
                    {errors.price && <p>{errors.price.message}</p>}
                    
                    <Tactical stockState={toDoState} handleChange={handleChange} notRequired={notRequired} errors={errors} />
                    {/* <label htmlFor="tactical">Tactical Pattern</label>
                    <select name="tactical" id="tactical" value={toDoState.tactical} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Mini Coil">Mini Coil</option>
                        <option value="Kicker">Kicker</option>
                        <option value="Downtrend Line">Downtrend Line</option>
                        <option value="Breakout PB to 20EMA">Breakout PB to 20EMA</option>
                        <option value="Gap Up PB to 8EMA">Gap Up PB to 8EMA</option>
                        <option value="Pull Back to 50SMA">Pull Back to 50SMA</option>
                        <option value="First Touch of the 10WK SMA">First Touch of the 10WK SMA</option>
                        <option value="Stop Hit">Stop Hit</option>
                        <option value="De-risking">De-risking</option>
                    </select>
                    {notRequired.tactical? <p>{notRequired.tactical}</p>: <p> </p>}
                    {errors.tactical && <p>{errors.tactical.message}</p>} */}

                </div>

                <div className="formCol">
                    <label htmlFor="ticker">Ticker*</label>
                    <input type="text" name="ticker" id="ticker" value={toDoState.ticker} onChange={handleChange} />
                    {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}
                    {errors.ticker && <p>{errors.ticker.message}</p>}
                    
                    <label htmlFor="ticker">Stop Loss Update</label>
                    <select name="updateStop" id="updateStop" value={toDoState.updateStop} onChange={handleChange}>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                    {errors.updateStop && <p>{errors.updateStop.message}</p>}
                    <p> </p>

                    {
                        toDoState.buySell === "sell"?
                    <>
                        <label htmlFor="closeTrade">Close Trade?</label>
                        <select name="closeTrade" id="closeTrade" value={toDoState.closeTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                    }

                    {
                        toDoState.buySell === "buy"?
                    <>
                        <label htmlFor="openTrade">Open Trade?</label>
                        <select name="openTrade" id="openTrade" value={toDoState.openTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddToDo