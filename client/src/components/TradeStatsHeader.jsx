import { useState } from "react";
import {formatedCost, formatedPercent} from "../utils/FormatFunctions.jsx"

const TradeStatsHeader = (props) => {

    const {unrealizedGainLoss, winPct, lossPct, avgWinUSD, avgLossUSD, avgWinPct, avgLossPct, avgPortWin, avgPortLoss, rlzGainLoss, totalPL, totalPLPct} = props



    return(
        <div className="tradeHeaderContainer">
                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Win %</p>
                        <p className="statsLabels">Loss %</p>
                        <p className="statsLabels">Avg Win(%)</p>
                        <p className="statsLabels">Avg Loss(%)</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{winPct}</p>
                        <p className="statsDisplayBox">{lossPct}</p>
                        <p className="statsDisplayBox">{avgWinPct}</p>
                        <p className="statsDisplayBox">{avgLossPct}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Avg Win($)</p>
                        <p className="statsLabels">Avg Loss($)</p>
                        <p className="statsLabels">Avg Port Win(%)</p>
                        <p className="statsLabels">Avg Port Loss(%)</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{avgWinUSD}</p>
                        <p className="statsDisplayBox">{avgLossUSD}</p>
                        <p className="statsDisplayBox">{avgPortWin}</p>
                        <p className="statsDisplayBox">{avgPortLoss}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Realized</p>
                        <p className="statsLabels">Unrealized</p>
                        <p className="statsLabels">Total P/L($)</p>
                        <p className="statsLabels">Total P/L(%)</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(rlzGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedCost(rlzGainLoss)}</p>
                        <p className={`${(unrealizedGainLoss > 0)?'detailGain':'detailLoss'}`}>{formatedCost(unrealizedGainLoss)}</p>
                        <p className={`${(totalPL > 0)?'detailGain':'detailLoss'}`}>{formatedCost(totalPL)}</p>
                        <p className={`${(totalPLPct > 0)?'detailGain':'detailLoss'}`}>{formatedPercent(totalPLPct)}</p>
                    </div>
                </div>
        </div>
    )
}

export default TradeStatsHeader