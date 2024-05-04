import {formatedCost, formatedPercent, formatedPrice} from "../utils/FormatFunctions.jsx"

const OpenTradeDetailsHeader = (props) => {

    const {headerOpenPx, headerOpenShares, headerOpenCost, headerOpenCurrentPx, headerOpenCurrentValue, headerOpenGainLoss, headerOpenGainLossPct, headerOpenPortImp, forHeader} = props

    return(
        <div className="tradeHeaderContainer">
                <div className="statsCol">
                    <div className="statsInnerCol">
                        <p className="statsLabels">Avg Open Px</p>
                        <p className="statsLabels">Shares Owned</p>
                        <p className="statsLabels">Open Cost</p>
                        <p className="statsLabels">Current Px</p>
                        
                    </div>
                    <div className="statsInnerCol">
                        <p className="statsDisplayBox">{headerOpenPx}</p>
                        <p className="statsDisplayBox">{headerOpenShares}</p>
                        <p className="statsDisplayBox">{headerOpenCost}</p>
                        <p className="statsDisplayBox">{headerOpenCurrentPx}</p>
                    </div>
                </div>

                <div className="statsCol">
                    <div className="statsInnerCol">
                    <p className="statsLabels">Gain/Loss ($)</p>
                        <p className="statsLabels">Gain/Loss (%)</p>
                        <p className="statsLabels">Portfolio Impact</p>
                        <p className="statsLabels">Current Value</p>
                    </div>
                    <div className="statsInnerCol">
                        <p className={`${(forHeader > 0)?'detailGain':'detailLoss'}`}>{headerOpenGainLoss}</p>
                        <p className={`${(forHeader > 0)?'detailGain':'detailLoss'}`}>{headerOpenGainLossPct}</p>
                        <p className={`${(forHeader > 0)?'detailGain':'detailLoss'}`}>{headerOpenPortImp}</p>
                        <p className={`${(forHeader > 0)?'detailGain':'detailLoss'}`}>{headerOpenCurrentValue}</p>
                    </div>
                </div>
        </div>
    )
}

export default OpenTradeDetailsHeader