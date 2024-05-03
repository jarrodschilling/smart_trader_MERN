import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChangeHandlerHook from "../hooks/ChangeHandlerHook";
import StockService from "../services/StockService";
import YahooService from "../services/YahooService";
import Shaper from "../components/Shaper";
import Tactical from "../components/Tactical";


const AddTrade = (props) => {
    const {stockState, setStockState, formErrors, notRequired, handleChange} = ChangeHandlerHook()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newValue = stockState.ticker
        let stockName
        try {
                const response = await YahooService.getName(newValue);
                // console.log(response)
                stockName = response.quoteType.result[0].shortName
                // console.log(stockName)
            } catch (error) {
                console.error("Error fetching stock name:", error);
            }
        const updatedStockState = { ...stockState, name: stockName }
        
        StockService.addOneStock(updatedStockState)
            .then(res => {
            console.log(res)
            navigate('/ledger')
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
            <h1>Add a Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                <div className="formCol">
                    <label htmlFor="date">Date*</label>
                    <input type="date" name="date" id="date" value={stockState.date} onChange={handleChange} />
                    {formErrors.date? <p>{formErrors.date}</p>: <p> </p>}
                    {errors.date && <p>{errors.date.message}</p>}

                    <label htmlFor="shares">Shares*</label>
                    <input type="number" name="shares" id="shares" value={stockState.shares} onChange={handleChange} />
                    {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                    {errors.shares && <p>{errors.shares.message}</p>}

                    {/* <label htmlFor="shaper">Shaper Pattern</label>
                    <select name="shaper" id="shaper" value={stockState.shaper} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Cup w/ Handle">Cup w/ Handle</option>
                        <option value="Cup no Handle">Cup no Handle</option>
                        <option value="MM VCP">MM VCP</option>
                        <option value="Coil">Coil</option>
                        <option value="Flat Base">Flat Base</option>
                        <option value="High Tight Flag">High Tight Flag</option>
                        <option value="Double Bottom">Double Bottom</option>
                        <option value="First Touch of the 10WK SMA">First Touch of the 10WK SMA</option>
                        <option value="Add on Buy">Add on Buy</option>
                        <option value="65min Swing">65min Swing</option>
                        <option value="Inverse Head and Shoulders">Inverse Head and Shoulders</option>
                        <option value="De-risk">De-risk</option>
                        <option value="Initial Stop Hit">Initial Stop Hit</option>
                        <option value="Lock in Profit">Lock in Profit</option>
                        <option value="Sell into Strength">Sell into Strength</option>
                        <option value="Earnings Soon">Earnings Soon</option>
                        <option value="Carry Over">Carry Over</option>
                    </select>
                    {notRequired.shaper? <p>{notRequired.shaper}</p>: <p> </p>}
                    {errors.shaper && <p>{errors.shaper.message}</p>} */}

                    <Shaper stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />


                    <button className="confirmTrade" type="submit" disabled={!validateForm()}>Confirm Trade</button>
                </div>

                <div className="formCol">
                    <label htmlFor="buySell">Buy or Sell*</label>
                    <select name="buySell" id="buySell" value={stockState.buySell} onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    {formErrors.buySell? <p>{formErrors.buySell}</p>: <p> </p>}
                    {errors.buySell && <p>{errors.buySell.message}</p>}

                    <label htmlFor="price">Price*</label>
                    <input type="number" name="price" id="price" value={stockState.price} onChange={handleChange} />
                    {formErrors.price? <p>{formErrors.price}</p>: <p> </p>}
                    {errors.price && <p>{errors.price.message}</p>}

                    {/* <label htmlFor="tactical">Tactical Pattern</label>
                    <select name="tactical" id="tactical" value={stockState.tactical} onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="Pattern BO">Pattern BO</option>
                        <option value="Mini Coil">Mini Coil</option>
                        <option value="Kicker">Kicker</option>
                        <option value="Downtrend Line">Downtrend Line</option>
                        <option value="50MA Res Failure">50MA Res Failure</option>
                        <option value="Gap Up PB to 8EMA">Gap Up PB to 8EMA</option>
                        <option value="Breakout PB to 20EMA">Breakout PB to 20EMA</option>
                        <option value="Pull Back to 50SMA">Pull Back to 50SMA</option>
                        <option value="Base Re-Test">Base Re-Test</option>
                        <option value="VWAP BO PB">VWAP BO PB</option>
                        <option value="Stop Hit">Stop Hit</option>
                        <option value="Stop to BE">Stop to BE</option>
                        <option value="Stop for Losing 10WK">Stop for Losing 10WK</option>
                        <option value="De-risking">De-risking</option>
                    </select>
                    {notRequired.tactical? <p>{notRequired.tactical}</p>: <p> </p>}
                    {errors.tactical && <p>{errors.tactical.message}</p>} */}

                    <Tactical stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />

                </div>

                <div className="formCol">
                    <label htmlFor="ticker">Ticker*</label>
                    <input type="text" name="ticker" id="ticker" value={stockState.ticker} onChange={handleChange} />
                    {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}
                    {errors.ticker && <p>{errors.ticker.message}</p>}
                    
                    {
                        stockState.buySell === "sell"?
                    <>
                        <label htmlFor="closeTrade">Close Trade?</label>
                        <select name="closeTrade" id="closeTrade" value={stockState.closeTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                    }

                    {
                        stockState.buySell === "buy"?
                    <>
                        <label htmlFor="openTrade">Open Trade?</label>
                        <select name="openTrade" id="openTrade" value={stockState.openTrade} onChange={handleChange}>
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

export default AddTrade