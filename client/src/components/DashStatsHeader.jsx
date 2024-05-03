import { useState } from "react";
import {formatedCost, formatedPercent} from "../utils/FormatFunctions.jsx"

const DashStatsHeader = (props) => {

    const {headerCurrentValue, headerUnRlzPL, rlzGainLoss, totalPL, totalValue, totalPLPct} = props



    return(
        <div className="tradeHeaderContainer">
                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Total Value</p>
                        <p className="statsLabels">Current Inv</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{totalValue}</p>
                        <p className="statsDisplayBox">{headerCurrentValue}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Realized P/L</p>
                        <p className="statsLabels">Unrealized P/L</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(rlzGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedCost(rlzGainLoss)}</p>
                        <p className={`${(headerUnRlzPL > 0)?'detailGain':'detailLoss'}`}>{formatedCost(headerUnRlzPL)}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Total P/L($)</p>
                        <p className="statsLabels">Total P/L(%)</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(totalPL > 0)?'detailGain':'detailLoss'}`}>{formatedCost(totalPL)}</p>
                        <p className={`${(totalPLPct > 0)?'detailGain':'detailLoss'}`}>{formatedPercent(totalPLPct)}</p>
                    </div>
                </div>
        </div>
    )
}

export default DashStatsHeader