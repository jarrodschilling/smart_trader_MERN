import { useState } from "react";
import {formatedCost, formatedPercent, formatedPrice} from "../utils/FormatFunctions.jsx"

const TradeDetailsHeader = (props) => {

    const {tradeGainLoss, tradeTotalCost, tradeAvgOpenPrice, tradeAvgClosePrice, tradeTotalSold, tradePercentGainLoss, tradePortfolioPctImpact} = props

    return(
        <div className="tradeHeaderContainer">
                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Avg Open Px</p>
                        <p className="statsLabels">Avg Close Px</p>
                        <p className="statsLabels">Total Cost</p>
                        <p className="statsLabels">Total Sold</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{formatedPrice(tradeAvgOpenPrice)}</p>
                        <p className="statsDisplayBox">{formatedPrice(tradeAvgClosePrice)}</p>
                        <p className="statsDisplayBox">{formatedCost(tradeTotalCost)}</p>
                        <p className="statsDisplayBox">{formatedCost(tradeTotalSold)}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Gain/Loss ($)</p>
                        <p className="statsLabels">Gain/Loss (%)</p>
                        <p className="statsLabels">Port Impact</p>
                        <p className="statsLabels">HOLD</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(tradeGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedCost(tradeGainLoss)}</p>
                        <p className={`${(tradeGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedPercent(tradePercentGainLoss)}</p>
                        <p className={`${(tradeGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedPercent(tradePortfolioPctImpact)}</p>
                        <p className="statsDisplayBox">{}</p>
                    </div>
                </div>

                {/* <div className="statsCol">
                    <div className="statsInnerCol">
                        <p>Realized</p>
                        <p>Unrealized</p>
                        <p>Total P/L($)</p>
                        <p>Total P/L(%)</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{formatedCost(tradeGainLoss)}</p>
                        <p className="statsDisplayBox">{}</p>
                        <p className="statsDisplayBox">{}</p>
                        <p className="statsDisplayBox">{}</p>
                    </div>
                </div> */}
        </div>
    )
}

export default TradeDetailsHeader