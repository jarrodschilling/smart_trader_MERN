import {model, Schema} from 'mongoose'
const TradeSchema = new Schema(
    {
        ticker: {
            type: String,
            require: [true, "Ticker symbol is required"],
            minlength: [1, "Ticker symbol must be at least one character"],
            maxlength: [5, "Ticker symbol cannot be more than 5 characters"]
        },
        name: {
            type: String,
            require: [true, "Name is required"]
        },
        date: {
            type: Date,
            require: [true, "Date of buy/sell required"]
        },
        buySell: {
            type: String,
            require: [true, "Buy/Sell required"],
            enum: ["buy", "sell"]
        },
        shares: {
            type: Number,
            require: [true, "Number of shares required"],
            min: [1, "Must be at least 1 share"],
            max: [1000000, "Cannot be more than 1,000,000 shares"]
        },
        price: {
            type: Number,
            require: [true, "Price required"],
            min: [1, "Must be at least a $1 stock"],
            max: [25000, "Is this stock really more than $25,000 a share"]
        },
        shaper: {
            type: String,
            require: [false],
            maxlength: [50, "Cannot be longer than 50 characters"]
        },
        tactical: {
            type: String,
            require: [false],
            maxlength: [50, "Cannot be longer than 50 characters"]
        },
        closeTrade: {
            type: Boolean,
            require: [false]
        },
        openTrade: {
            type: Boolean,
            require: [false]
        }
    },
    { timestamps: true }
)
const Trade = model("Trade", TradeSchema)
export default Trade