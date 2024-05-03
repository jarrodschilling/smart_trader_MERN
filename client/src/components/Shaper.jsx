

export default function Shaper(props) {
    const {stockState, handleChange, notRequired, errors} = props
    return (
        <>
            <label htmlFor="shaper">Shaper Pattern</label>
            <select name="shaper" id="shaper" value={stockState.shaper} onChange={handleChange}>
                <option value="none">Pick One</option>
                <option value="Cup w/ Handle">Cup w/ Handle</option>
                <option value="Cup no Handle">Cup no Handle</option>
                <option value="MM VCP">MM VCP</option>
                <option value="Coil">Coil</option>
                <option value="Flat Base">Flat Base</option>
                <option value="High Tight Flag">High Tight Flag</option>
                <option value="Double Bottom">Double Bottom</option>
                <option value="First Touch of the 10WK SMA">First Touch of the 10WK SMA</option>
                <option value="Add on Buy">Add on Buy</option>
                <option value="65min Swing">65min Swing</option>
                <option value="Inverse Head and Shoulders">Inverse Head and Shoulders</option>
                <option value="De-risk">De-risk</option>
                <option value="Initial Stop Hit">Initial Stop Hit</option>
                <option value="Lock in Profit">Lock in Profit</option>
                <option value="Sell into Strength">Sell into Strength</option>
                <option value="Earnings Soon">Earnings Soon</option>
                <option value="Carry Over">Carry Over</option>
            </select>
            {notRequired.shaper? <p>{notRequired.shaper}</p>: <p> </p>}
            {errors.shaper && <p>{errors.shaper.message}</p>}
        </>
    )
}
