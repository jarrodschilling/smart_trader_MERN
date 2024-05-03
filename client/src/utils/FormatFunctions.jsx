function dateChanger(dateISO) {
    if ((typeof dateISO) === "string" ) {
        const dateObject = new Date(dateISO);
        // console.log(dateObject)
        const newDate = `${(dateObject.getUTCMonth() + 1).toString().padStart(2, '0')}/${dateObject.getUTCDate().toString().padStart(2, '0')}/${dateObject.getUTCFullYear()}`;

        return newDate;
    }
    return "OPEN"
}

function totalCostFmt(price, shares) {
    const cost = price * shares
    const formattedNumber = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(cost);
    return formattedNumber
}

function formatedCost(cost) {
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

function formatedPercent(num) {
    // Round the decimal to one decimal place
    let formattedNum = num.toFixed(2) + '%';

    return formattedNum;
}

export { dateChanger, totalCostFmt, formatedPrice, formatedCost, formatedPercent}