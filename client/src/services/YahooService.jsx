import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000/api'
})

function getQuote(symbol) {
    // console.log(symbol)
    return http.get(`/quote/${symbol}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function getName(symbol) {
    // console.log(symbol)
    return http.get(`/name/${symbol}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

const YahooService = {getQuote:getQuote, getName:getName}
export default YahooService