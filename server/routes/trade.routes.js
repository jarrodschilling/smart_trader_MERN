import { Router } from "express"
import TradeController from "../controllers/trade.controller.js"
const router = Router()

// Create new trade
router.route('/trades/add')
    .post(TradeController.createTrade)

// Get all trades
router.route('/trades')
    .get(TradeController.getAllTrades)

router.route('/trades/:id')
    .get(TradeController.getOneTrade)
    .put(TradeController.editTrade)
    .delete(TradeController.deleteOneTrade)

// router.route('/quote/:symbol')
//     .get(TradeController.yfQuote)


export default router