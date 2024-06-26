import { useState, useEffect } from "react";
import YahooService from "../services/YahooService";

const ChangeHandlerHook = (e) => {
    const [stockState, setStockState] = useState({
        ticker: "",
        name:"",
        price: "",
        date: 0,
        shares: "",
        buySell: "",
        shaper: "",
        tactical: "",
        openTrade: false,
        closeTrade: false
    })

    const [formErrors, setFormErrors] = useState({
        ticker: "Ticker symbol required",
        price: "Price required",
        date: "Proper date required",
        shares: "Number of shares required",
        buySell: "Trade type required"
    })

    const [notRequired, setNotRequired] = useState({
        shaper: "Do you want a Shaper Pattern?",
        tactical: "Do you want a Tactical Pattern?"
    })

    const handleChange = async (e) => {
        if (e.target.name === "ticker") {
            let newValue = e.target.value.toUpperCase()
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))

            // GET STOCK NAME WITH YFINANCE
            // try {
            //     const response = await YahooService.getName(newValue);
            //     setStockState(prevState => ({
            //         ...prevState,
            //         name: response.quoteType.result[0].shortName
            //     }));
            // } catch (error) {
            //     console.error("Error fetching stock name:", error);
            // }

            let errorMsg = ''
            if (newValue) {
                if (newValue.length < 1) {
                    errorMsg = "Ticker must have at least one character"
                } else if (newValue.length > 5) {
                    errorMsg = "Ticker cannot be more than five characters long"
                }
            } else {
                errorMsg = "Ticker symbol required"
            }
            setFormErrors({...formErrors, ticker: errorMsg})
        }
        else if (e.target.name === "price") {
            let newValue = Number(e.target.value)
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ""
            if (newValue) {
                if (newValue < 1) {
                    errorMsg = "Don't buy stocks under $1"
                } else if (newValue>5000) {
                    errorMsg = "What stock trades above $5,000??"
                }
            } else {
                errorMsg = "Price required"
            }
            setFormErrors({...formErrors, price: errorMsg})
        }
        else if (e.target.name === "shares") {
            let newValue = Number(e.target.value)
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ""
            if (newValue) {
                if (newValue < 1) {
                    errorMsg = "Must be at least one share"
                } else if (newValue>100000) {
                    errorMsg = "Are you really buying more than 100,000 shares??"
                }
            } else {
                errorMsg = "Number of shares required"
            }
            setFormErrors({...formErrors, shares: errorMsg})
        }
        else if (e.target.name === "buySell") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let errorMsg = ''
            if (newValue) {
                if (newValue.length < 3) {
                    errorMsg = "BUY or SELL only"
                } else if (newValue.length > 4) {
                    errorMsg = "BUY or SELL only"
                }
            } else {
                errorMsg = "Trade type required"
            }
            setFormErrors({...formErrors, buySell: errorMsg})
        }
        else if (e.target.name === "shaper") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let reminderMsg = ''
            if (newValue) {
                if (newValue === "none") {
                    reminderMsg = "Do you want a shaper pattern?"
                }
            } else {
                reminderMsg = "Do you want a shaper pattern?"
            }
            setNotRequired({...notRequired, shaper: reminderMsg})
        }
        else if (e.target.name === "tactical") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            let reminderMsg = ''
            if (newValue) {
                if (newValue === "none") {
                    reminderMsg = "Do you want a tactical pattern?"
                }
            } else {
                reminderMsg = "Do you want a tactical pattern?"
            }
            setNotRequired({...notRequired, tactical: reminderMsg})
        }
        else if (e.target.name === "date") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
            const currentDate = new Date();
            console.log(currentDate)
            console.log(stockState.date)
            let errorMsg = ""
            if (!stockState.date) {
                setFormErrors({...formErrors, date: errorMsg})
            }
        }
        else if (e.target.name === "closeTrade") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
        }
        else if (e.target.name === "openTrade") {
            let newValue = e.target.value
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }))
        }
    }

    return {
        handleChange,
        stockState,
        formErrors,
        notRequired
    }
}

export default ChangeHandlerHook