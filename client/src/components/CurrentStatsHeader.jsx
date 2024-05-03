import { useState } from "react";
import {formatedCost, formatedPercent, formatedPrice} from "../utils/FormatFunctions.jsx"

const CurrentStatsHeader = (props) => {

    const {headerCash, headerTotalCost, headerCurrentValue, headerUnRlzPL, headerUnrealizedPLPct, headerPortfolioPL} = props

    return(
        <div className="tradeHeaderContainer">
                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Total Cost</p>
                        <p className="statsLabels">Current Value</p>
                        
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{headerTotalCost}</p>
                        <p className="statsDisplayBox">{headerCurrentValue}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Unrealized P/L ($)</p>
                        <p className="statsLabels">Unrealized P/L (%)</p>
                        {/* <p className="statsLabels">Portfolio P/L</p> */}
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(headerUnRlzPL > 0)?'detailGain':'detailLoss'}`}>{formatedCost(headerUnRlzPL)}</p>
                        <p className={`${(headerUnRlzPL > 0)?'detailGain':'detailLoss'}`}>{headerUnrealizedPLPct}</p>
                        {/* <p className="statsDisplayBox">{headerPortfolioPL}</p> */}
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Portfolio P/L (%)</p>
                        <p className="statsLabels">Cash Available</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(headerUnRlzPL > 0)?'detailGain':'detailLoss'}`}>{headerPortfolioPL}</p>
                        <p className="statsDisplayBox">{headerCash}</p>
                    </div>
                </div>
        </div>
    )
}

export default CurrentStatsHeader