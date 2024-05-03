import { Router } from "express"
import yFinanceController from "../controllers/yahoo.controller.js"
const yahooRouter = Router()

// Get quote from yahoo Finance
yahooRouter.route('/quote/:symbol')
    .get(yFinanceController.yfQuote)

yahooRouter.route('/name/:symbol')
    .get(yFinanceController.yfName)

    
export default yahooRouter