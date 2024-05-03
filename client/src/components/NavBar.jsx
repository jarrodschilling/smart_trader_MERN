import { useParams, useNavigate, Link} from "react-router-dom"


const NavBar = () => {

    return (
        <div className="navRow">
            <div className="navTitle">
                <span><Link className="dashLink" to="/">Smart</Link></span>
                <span><Link className="dashLink" to="/">Trader</Link></span>
            </div>
            <div className="navLinks">
                <Link className="dashLink" to="/current">Portfolio</Link>
                <Link className="dashLink" to="/add">Add Trade</Link>
                <Link className="dashLink" to="/ledger">Ledger</Link>
                <Link className="dashLink" to="/equitycurve">Equity Curve</Link>
                <Link className="dashLink" to="/stats">Statistics</Link>
                <Link className="dashLink" to="/tradesheet">To Do</Link>
            </div>
        </div>
    )

}

export default NavBar