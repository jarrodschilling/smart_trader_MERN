import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000/api'
})

function getAllStocks() {
    return http.get('/trades')
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function getOneStock(id) {
    return http.get(`/trades/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function updateOneStock(id, stockState) {
    return http.put(`/trades/${id}`, stockState)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function addOneStock(stock) {
    return http.post('/trades/add', stock)
        .then(res => res.data)
        .catch(err => {
            throw err; 
        })
}

function deleteOneStock(id) {
    return http.delete(`/trades/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

const StockService = {
    getAllStocks: getAllStocks,
    updateOneStock: updateOneStock,
    addOneStock: addOneStock,
    getOneStock: getOneStock,
    deleteOneStock: deleteOneStock
}

export default StockService