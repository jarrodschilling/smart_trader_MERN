
async function yfQuote(req, res) {
    try {
        const symbol = req.params.symbol
        const yahooResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
        const data = await yahooResponse.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// https://query1.finance.yahoo.com/v1/finance/quoteType/?symbol=ccj

async function yfName(req, res) {
    try {
        const symbol = req.params.symbol
        const yahooResponse = await fetch(`https://query1.finance.yahoo.com/v1/finance/quoteType/?symbol=${symbol}`);
        const data = await yahooResponse.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const yFinanceController = {yfQuote: yfQuote, yfName: yfName}
export default yFinanceController
