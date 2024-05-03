import React from 'react'

export default function Tactical(props) {
    const {stockState, handleChange, notRequired, errors} = props
    return (
    <>
        <label htmlFor="tactical">Tactical Pattern</label>
        <select name="tactical" id="tactical" value={stockState.tactical} onChange={handleChange}>
            <option value="none">Pick One</option>
            <option value="Pattern BO">Pattern BO</option>
            <option value="Mini Coil">Mini Coil</option>
            <option value="Kicker">Kicker</option>
            <option value="Downtrend Line">Downtrend Line</option>
            <option value="50MA Res Failure">50MA Res Failure</option>
            <option value="Gap Up PB to 8EMA">Gap Up PB to 8EMA</option>
            <option value="Breakout PB to 20EMA">Breakout PB to 20EMA</option>
            <option value="Pull Back to 50SMA">Pull Back to 50SMA</option>
            <option value="Base Re-Test">Base Re-Test</option>
            <option value="VWAP BO PB">VWAP BO PB</option>
            <option value="Stop Hit">Stop Hit</option>
            <option value="Stop to BE">Stop to BE</option>
            <option value="Stop for Losing 10WK">Stop for Losing 10WK</option>
            <option value="De-risking">De-risking</option>
        </select>
        {notRequired.tactical? <p>{notRequired.tactical}</p>: <p> </p>}
        {errors.tactical && <p>{errors.tactical.message}</p>}
    </>
    )
}
