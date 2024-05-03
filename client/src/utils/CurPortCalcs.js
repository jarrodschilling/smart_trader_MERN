import { avgOpenPrice, currentShares } from "./CalcFunctions.js";

function currentOpenCost (stock) {
    let cost = avgOpenPrice(stock)*currentShares(stock)
    return cost
}

function currentValue (price, stock) {
    let value = price*(currentShares(stock))
    return value
}

function currentGainLoss (price, stock) {
    let value = (price*(currentShares(stock)))-(avgOpenPrice(stock)*currentShares(stock))
    return value
}


export {
    currentOpenCost,
    currentValue,
    currentGainLoss
}