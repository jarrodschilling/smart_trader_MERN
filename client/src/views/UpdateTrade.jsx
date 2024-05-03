import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateHandlerHook from "../hooks/UpdateHandlerHook";
import StockService from "../services/StockService";
import YahooService from "../services/YahooService";
import Shaper from "../components/Shaper";
import Tactical from "../components/Tactical";

const UpdateTrade = (props) => {
    const {id} = useParams()
    const {handleChange, stockState, setStockState, formErrors, notRequired} = UpdateHandlerHook()

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        StockService.getOneStock(id)
            .then(res=> {
                console.log(res)
                setStockState(res)
            })
            .catch(err=> {
                console.log(err)
            })
    }, [id])

    function dateFormat(dateISO) {
        const updatedDate = new Date(dateISO).toISOString().split('T')[0];
        return updatedDate
    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     StockService.updateOneStock(id, stockState)
    //         .then(res => {
    //         console.log(res)
    //         navigate('/ledger')
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setErrors(err.response.data.errors)
    //         })
    //     }

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
        
        StockService.updateOneStock(id, updatedStockState)
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


    return (
        <div className="tradeFormContainer">
            <h1>Update a Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                <div className="formCol">
                    <label htmlFor="date">Date*</label>
                    <input type="date" name="date" id="date" value={dateFormat(stockState.date)} onChange={handleChange} />
                    {formErrors.date? <p>{formErrors.date}</p>: <p> </p>}
                    {errors.date && <p>{errors.date.message}</p>}

                    <label htmlFor="shares">Shares*</label>
                    <input type="number" name="shares" id="shares" value={stockState.shares} onChange={handleChange} />
                    {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                    {errors.shares && <p>{errors.shares.message}</p>}

                    <Shaper stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />

                    <button className="confirmTrade" type="submit" disabled={!validateForm()}>Update Trade</button>
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

                    <Tactical stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />

                </div>

                <div className="formCol">
                    <label htmlFor="ticker">Ticker*</label>
                    <input type="text" name="ticker" id="ticker" value={stockState.ticker.toUpperCase()} onChange={handleChange} />
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

export default UpdateTrade