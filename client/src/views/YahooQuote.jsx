import { useState, useEffect } from "react";
import YahooService from "../services/YahooService";
import { useParams } from "react-router-dom";

const YahooQuote = (props) => {
    const [price, setPrice] = useState(0)
    const symbol = ["NVDA", "MSFT"]
    // const {symbol} = useParams()
    useEffect(() => {
        // console.log(symbol)
        YahooService.getQuote(symbol)
            .then((res) => {
                console.log((res));
                // console.log((res.chart.result[0].meta.regularMarketPrice));
                // setPrice((res.chart.result[0].meta.regularMarketPrice));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [symbol])

    return (
        <div>
            <h1>Equity Curve</h1>
        </div>
    )

}

export default YahooQuote